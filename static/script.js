// const xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
// const yValues = [7, 8, 8, 9, 9, 9, 20, 11, 14, 14, 10];

// new Chart("myChart", {
//   type: "line",
//   data: {
//     labels: xValues,
//     datasets: [{
//       fill: false,
//       lineTension: 0.3,
//       backgroundColor: "rgba(0,0,0,1.0)",
//       borderColor: "rgba(193,176,82,0.7)",
//       data: yValues
//     }]
//   },
//   options: {
//     legend: { display: false },
//     scales: {

//       x: {
//         ticks: {
//           color: '#000', // Color of the x-axis labels
//         },
//         grid: {
//           color: '#000', // Color of the x-axis grid lines
//         },
//         border: {
//           width: 2,
//           color: '#000', // <-------------- Color of the x-axis
//         },
//       },
//       y: {
//         ticks: {
//           color: '#000', // Color of the x-axis labels
//         },
//         grid: {
//           color: '#000', // Color of the x-axis grid lines
//         },
//         border: {
//           width: 2,
//           color: '#000', // <-------------- Color of the x-axis
//         },
//       }
//     }
//   }
// });




document.addEventListener("DOMContentLoaded", function () {

  loadInventory();

});

function removeNonNumber(inputString) {
  // Use a regular expression to match non-numeric characters and replace them with an empty string
  return inputString.replace(/[^0-9]/g, '');
}

function loadInventory() {
  var contentContainer = document.getElementById("mainContentContainer");
  fetch('inventory.html')
    .then(response => response.text())
    .then(html => {
      contentContainer.innerHTML = html;
      getPartRows();
    });
}

function getPartRows() {
  var contentContainer = document.getElementById("row-container");

  fetch('/partsList')
    .then(response => response.text())
    .then(html => {

      // // Get all child elements with the class "table-row"
      // var tableRows = contentContainer.getElementsByClassName("table-details-row");

      // // Convert the HTMLCollection to an array
      // var tableRowsArray = Array.from(tableRows);
      // console.log(tableRowsArray);
      // // Loop through the array and remove each element
      // tableRowsArray.forEach(function (element) {

      //   element.remove();
      // });

      contentContainer.innerHTML += html;

    });
}

function partRowClicked(clickedDivSKU) {
  // Find the element with class "SKU_box" inside the clicked div
  console.log(clickedDivSKU);
  const clickedDiv = document.getElementById(clickedDivSKU);
  clickedDiv.classList.add("table-details-row-selected");
  return;
  fetch('/getModifyPartBox', {

    method: 'POST',

    body: JSON.stringify({

      'partID': String(skuText)

    }),

    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.text())

    .then(html => {
      //console.log(html);
      //const box_to_replace = document.getElementById(skuText);
      //box_to_replace.innerHTML=html;
    })
}

function savePart(clickedDivSKU) {
  //console.log(clickedDivSKU);
  const clickedDiv = document.getElementById(clickedDivSKU);
  clickedDiv.classList.remove("table-details-row-selected");

  const part = {
    "SKU": -1,
    "Name": "",
    "Value": "",
    "Footprint": "",
    "Quantity": 0,
    "Rating": "",
    "Group": "",
    "Location": "",
    "Tags": "",
    "Price": 0,
    "Warning_Stock": 0,
    "Source": "",
    "Datasheet": ""
  };

  for (const key in part) {
    var new_value_element = document.getElementById(clickedDivSKU + "_" + key);
    console.log(key);
    var convertedValue = parseInt(new_value_element.value);

    if (!isNaN(convertedValue)) {
        // If the conversion is successful, assign the integer value
        part[key] = convertedValue;
    } else {
        // If the conversion fails, keep the original value
        part[key] = new_value_element.value;
    }
    var elementToUpdate = document.getElementById(clickedDivSKU + "_" + key + "_span");
    if (elementToUpdate) {
      elementToUpdate.innerHTML = part[key];
    }
  }



  console.log(part);

  fetch('/savePart', {

    method: 'POST',

    body: JSON.stringify(part),

    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.text())

    .then(html => {

    })
}


function addHtmlAfterElement(htmlString, elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.insertAdjacentHTML('afterend', htmlString);
  }
}

function addPart() {
  fetch('/newPart')
    .then(response => response.text())
    .then(html => {
      //console.log(html);
      const container = document.getElementById("row-container");

      // Create a DOMParser to parse the HTML string into a DOM element
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Get the first element from the parsed document
      const elementToInsert = doc.body.firstChild;

      // Insert the element as the first child of the container
      if (elementToInsert) {
        container.insertBefore(elementToInsert, container.firstChild);
      }
    });
}



function deletePart(sku) {
  var element = document.getElementById(sku);
  element.remove();
  fetch('/deletePart', {

    method: 'POST',

    body: JSON.stringify({ "SKU": sku + "" }),

    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.text())

    .then(html => {

    })
}

function search() {
  var search_bar = document.getElementById("search_bar");

  fetch('/search', {

    method: 'POST',

    body: JSON.stringify({ "terms": [search_bar.value] }),

    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.text())

    .then(html => {
      var contentContainer = document.getElementById("row-container");

      contentContainer.innerHTML = html;
    })
}

function sort(direction, field){
  console.log(direction);
  console.log(field);
  var search_bar = document.getElementById("search_bar");

  fetch('/filter', {

    method: 'POST',

    body: JSON.stringify([{ "field": field,"direction": direction}]),

    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.text())

    .then(html => {
      var contentContainer = document.getElementById("row-container");

      contentContainer.innerHTML = html;
    })
}
