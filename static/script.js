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
      var tableRows = contentContainer.getElementsByClassName("table-row");

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
  const clickedDiv = document.getElementById(clickedDivSKU);
  const skuBox = clickedDiv.querySelector('.SKU_box');
  const skuText = removeNonNumber(skuBox.textContent);
  console.log(skuText);
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
      const box_to_replace = document.getElementById(skuText);
      box_to_replace.innerHTML=html;
    })
}

function savePart(element){
  console.log("hi");
  loadInventory();
}
