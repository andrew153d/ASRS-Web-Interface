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
  var contentContainer = document.getElementById("mainContentContainer");

  fetch('/partsList')
    .then(response => response.text())
    .then(html => {

      // Get all child elements with the class "table-row"
      var tableRows = contentContainer.getElementsByClassName("table-details-row");

      // Convert the HTMLCollection to an array
      var tableRowsArray = Array.from(tableRows);
      console.log(tableRowsArray);
      // Loop through the array and remove each element
      tableRowsArray.forEach(function (element) {

        element.remove();
      });

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
    "SKU": "-1",
    "Name": "",
    "Value": "",
    "Footprint": "",
    "Quantity": "",
    "Rating": "",
    "Group": "",
    "Location": "",
    "Tags": "",
    "Price": "",
    "Warning_Stock": "",
    "Source": "",
    "Datasheet": ""
  };

  for (const key in part) {
    var new_value_element = document.getElementById(clickedDivSKU + "_" + key);
    console.log(key);
    part[key] = new_value_element.value;
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

      console.log(html);
      const element1 = document.getElementById("column-titles");
      addHtmlAfterElement(html, "column-titles");
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
      var contentContainer = document.getElementById("mainContentContainer");
      var tableRows = contentContainer.getElementsByClassName("table-details-row");

      // Convert the HTMLCollection to an array
      var tableRowsArray = Array.from(tableRows);
      // Loop through the array and remove each element
      tableRowsArray.forEach(function (element) {
        element.remove();
      });

      contentContainer.innerHTML += html;
      document.getElementById("search_bar").value=search_bar.value;
    })
}
