window.onload = function loadPage() {
  //showHomePage();

  showBrowse();
}

function showHomePage() {
  const subPage = document.getElementById('subPage');
  fetch('homePage.html')
    .then(response => response.text())
    .then(html => {
      subPage.innerHTML = html;
    });
}

function showBrowse(part) {
  // Get the parts list element
  const subPage = document.getElementById('subPage');
  fetch('browsePage.html')
    .then(response => response.text())
    .then(html => {
      //const partsArray = JSON.parse(getPartList());
      subPage.innerHTML = html;
      // const partsList = document.getElementById('parts-list');
      // // Loop through the parts data and create list items
      // const listItem = createPartListHeader();
      // partsList.appendChild(listItem);
      // partsArray.forEach(part => {
      //   const listItem = createPartListItem(part);
      //   partsList.appendChild(listItem);
      // });
      // const jsonArray = JSON.parse(partsData);
      // loadPartModifiers(jsonArray[0]);

    });

}

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

function deleteProperty(obj, propertyName) {
  if (obj.hasOwnProperty(propertyName)) {
    delete obj[propertyName];
    return true; // Property was deleted successfully
  } else {
    return false; // Property does not exist in the object
  }
}

function createPartDetailsForm(part, field){
  return `<div class="row">
  <div class="col-12">
    <form class = "part_details_form">
      <label for="${field}_input">${field}</label>
      <input type="text" id="${field}_input" name="${field}" value = "${part[field]}"> 
    </form>
  </div>
</div>`
}

function loadPartModifiers(id) {

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
      var part = jsonResponse;
      console.log(typeof(part));
      var modifiers = document.getElementById('part_forms');
      modifiers.innerHTML = '';
      modifiers.innerHTML += createPartDetailsForm(part, "ID");
      deleteProperty(part, "ID");
      for (const field in part) {
        modifiers.innerHTML += createPartDetailsForm(part, field);
      }
    })
}

function savePart(){
  var formContainer = document.getElementById("part_forms");
  const forms = formContainer.getElementsByTagName('form');
  const result = [];
  for (const form of forms) {
    const inputs = form.getElementsByTagName('input');
    
    for (const input of inputs) {
      console.log(`Name: ${input.name}, Value: ${input.value}`);
      result.push({ name: input.name, value: input.value });
    }
  }
  console.log(result);

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
    })

}



