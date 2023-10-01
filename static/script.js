window.onload = function loadPage() {
  //showBrowse();
}

/* takes in a dictionary and replaces the keys with the values*/
function replaceInString(content, replacementDict) {
  for (let [key, value] of Object.entries(replacementDict)) {
    content = content.split(key).join(value);
  }
  return content;
}

function selectParts(part) {
  var button = document.getElementById("part_" + part);
  button.style.transition = "background-color 0.2s ease";
  button.style.backgroundColor = "var(--selected)";
}

function deSelectAllParts() {
  var parentElement = document.getElementById("parts-list");
  var buttons = parentElement.querySelectorAll("button");
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    // Perform your action on 'button' here
    console.log(button.textContent);
  }
}

/* reqests the main dashboard fron the server */
function showHomePage() {
  const subPage = document.getElementById('subPage');
  fetch('homePage.html')
    .then(response => response.text())
    .then(html => {
      subPage.innerHTML = html;
    });
}

/* reqests part data from the server, inserts it into the html and displays it */
function loadPartsList(html) {
  const response = fetch('/getPartData', {
    method: 'GET',
  })
    .then(response => response.json())
    .then(jsonResponse => {

      let content = `
    <button type="button" onclick="test(ID)" class="row list_button listHeader" onclick="test()">
        <span class="col-2"><strong>ID</strong></span>
        <span class="col-3"><strong>Name</strong></span>
        <span class="col-2"><strong>Value</strong></span>
        <span class="col-2"><strong>Footprint</strong></span>
        <span class="col-3"><strong>Rating</strong></span>
    </button>
`;
// for (let element of jsonResponse["config"]) {
//   console.log(element);
// }
      console.log(jsonResponse["config"]["Columns"]);

      let template = `
    <button type="button" onclick="loadPartModifiers(ID)" id="part_ID" class="row list_button">
        <span class="col-2">ID</span>
        <span class="col-3">Name</span>
        <span class="col-2">Value</span>
        <span class="col-2">Footprint</span>
        <span class="col-3">Rating</span>
    </button>
`;

      // Insert the list of parts
      for (let p of jsonResponse["parts"]) {
        content += replaceInString(template, p);
      }

      const subPage = document.getElementById('subPage');
      subPage.innerHTML = html;
      let container = document.getElementById("parts-list");
      container.innerHTML = content; 

    })
}

/* requests the browse page and calls loadParts list on response */
function showBrowse() {
  // Get the parts list element
  const subPage = document.getElementById('subPage');
  fetch('browsePage.html')
    .then(response => response.text())
    .then(html => {
      //subPage.innerHTML = html;
      loadPartsList(html);
      
    });
}

/* requests a single part from the server */
function getPartFromServer(id) {
  const response = fetch('/getPart', {

    method: 'POST',

    body: JSON.stringify({

      'partID': String(id)

    }),

    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.json())

    .then(jsonResponse => {
      //console.log(jsonResponse);
      return jsonResponse;
    })
}

/* deletes the property from the object and returns it */
function deleteProperty(obj, propertyName) {
  if (obj.hasOwnProperty(propertyName)) {
    delete obj[propertyName];
    return true; // Property was deleted successfully
  } else {
    return false; // Property does not exist in the object
  }
}

/* creates a single part details form and returns it */
function createPartDetailsForm(part, field) {
  return `<div class="row">
  <div class="col-12">
    <form class = "part_details_form">
      <label for="${field}_input">${field}</label>
      <input type="text" id="${field}_input" name="${field}" value = "${part[field]}"> 
    </form>
  </div>
</div>`
}

/* gets a single part from the server and assembles thw modifiers form*/
function loadPartModifiers(id) {

  var button = document.getElementById("part_" + String(id));
  deSelectAllParts();
  const response = fetch('/getPart', {
    method: 'POST',
    body: JSON.stringify({
      'partID': String(id)
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.json())

    .then(jsonResponse => {

      var col1 = document.getElementById("part_entry_column");
      col1.style.width = '33.3333333%';
      var col2 = document.getElementById("part_list_column");
      col2.style.width = '66.6666666%';

      var part = jsonResponse["part"];
      console.log(typeof (part));
      var modifiers = document.getElementById('part_forms');
      modifiers.innerHTML = '';
      modifiers.innerHTML += createPartDetailsForm(part, "ID");
      deleteProperty(part, "ID");
      for (const field in part) {
        modifiers.innerHTML += createPartDetailsForm(part, field);
      }
    })
}

/* reads data from modifiers and sends the data to the server to be saved */
function savePart() {
  var col1 = document.getElementById("part_entry_column");
  col1.style.width = '16.6666666%';
  var col2 = document.getElementById("part_list_column");
  col2.style.width = '83.3333333%';
  var formContainer = document.getElementById("part_forms");
  const forms = formContainer.getElementsByTagName('form');
  const result = { "ID": "-1" };
  for (const form of forms) {
    const inputs = form.getElementsByTagName('input');
    for (const input of inputs) {
      result[input.name] = input.value;
    }
  }
  console.log(result);
  if (result["ID"] == "-1") {
    return
  }

  const response = fetch('/savePart', {

    method: 'POST',

    body: JSON.stringify(result),

    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.json())
    .then(jsonResponse => {
      console.log(jsonResponse);
      showBrowse();
      
    })
}

/* sends a search term to the server and receives a filtered list */
function search() {
  var form = document.getElementById("part_search");
  console.log(form.value);

  const response = fetch('/search', {

    method: 'POST',

    body: JSON.stringify({ "term": form.value }),

    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.text())
    .then(html => {
      const partsBox = document.getElementById("parts-list");
      console.log(html);
      partsBox.innerHTML = html;

    });
}

/* send a partid to the server to be deleted */
function deletePart() {
  var col1 = document.getElementById("part_entry_column");
  col1.style.width = '16.6666666%';
  var col2 = document.getElementById("part_list_column");
  col2.style.width = '83.3333333%';
  var formContainer = document.getElementById("part_forms");
  const forms = formContainer.getElementsByTagName('form');
  const result = { "ID": "-1" };
  for (const form of forms) {
    const inputs = form.getElementsByTagName('input');
    for (const input of inputs) {
      result[input.name] = input.value;
    }
  }
  console.log(result);
  if (result["ID"] == "-1") {
    return;
  }
  const response = fetch('/deletePart', {

    method: 'POST',

    body: JSON.stringify(result),

    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.json())
    .then(jsonResponse => {
      console.log(jsonResponse);
      showBrowse();
    })
}

/* reqests the server make a new part */
function newPart() {
  var formContainer = document.getElementById("part_forms");
  const forms = formContainer.getElementsByTagName('form');
  const result = { "ID": "0" };
  for (const form of forms) {
    const inputs = form.getElementsByTagName('input');
    for (const input of inputs) {
      result[input.name] = input.value;
    }
  }

  const response = fetch('/newPart', {

    method: 'POST'
  })
    .then(response => response.json())
    .then(jsonResponse => {
      console.log(jsonResponse);
      showBrowse();
    })
}

/* enters Resistor in the search term and calls the search function */
function filterResistor() {
  var form = document.getElementById("part_search");
  if (form.value == "Resistor") {
    form.value = "";
  } else {
    form.value = "Resistor";
  }
  search();
}

/* enters Capacitor in the search term and calls the search function */
function filterCapacitor() {
  var form = document.getElementById("part_search");
  if (form.value == "Capacitor") {
    form.value = "";

  } else {
    form.value = "Capacitor";

  }
  search()
}


