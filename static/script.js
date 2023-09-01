// Your JSON data
const partsData = [
  {
    "name": "Resistor",
    "footprint": "0805",
    "value": "10kΩ",
    "rating": "1/4W"
  },
  {
    "name": "Capacitor",
    "footprint": "1206",
    "value": "1µF",
    "rating": "16V"
  },
  {
    "name": "Transistor",
    "footprint": "SOT-23",
    "value": "2N3904",
    "rating": "200mA, 40V"
  },
  {
    "name": "Diode",
    "footprint": "DO-214AC",
    "value": "1N4148",
    "rating": "100V, 200mA"
  },
  {
    "name": "IC",
    "footprint": "SOIC-8",
    "value": "555 Timer",
    "rating": "50mA, 15V"
  },
  {
    "name": "LED",
    "footprint": "SMD-0805",
    "value": "Red",
    "rating": "2V, 20mA"
  },
  {
    "name": "Inductor",
    "footprint": "0805",
    "value": "10µH",
    "rating": "500mA"
  },
  {
    "name": "Resistor",
    "footprint": "1206",
    "value": "220Ω",
    "rating": "1/4W"
  },
  {
    "name": "Capacitor",
    "footprint": "0805",
    "value": "10nF",
    "rating": "50V"
  },
  {
    "name": "IC",
    "footprint": "DIP-16",
    "value": "LM324",
    "rating": "Low Power Quad Op-Amp"
  }
];

window.onload = function loadPage() {
  showHomePage();

}

function showHomePage() {
  const subPage = document.getElementById('subPage');
  fetch('homePage.html')
    .then(response => response.text())
    .then(html => {
      subPage.innerHTML = html;
    });
}

function showBrowse() {
  // Get the parts list element
  const subPage = document.getElementById('subPage');
  fetch('browsePage.html')
    .then(response => response.text())
    .then(html => {
      subPage.innerHTML = html;
      const partsList = document.getElementById('parts-list');
      // Loop through the parts data and create list items
      partsData.forEach(part => {
        const listItem = createPartListItem(part);
        console.log('hi');
        partsList.appendChild(listItem);
      });
    });



}

function loadPage() {
  fetch('another-page.html')
    .then(response => response.text())
    .then(html => {
      document.open();
      document.write(html);
      document.close();
    });
}

function logData(type) {
  color = document.getElementById("dataRow").style.backgroundColor;
  document.getElementById("dataRow").style.backgroundColor = "#454040";
  const response = fetch('/info/log', {

    method: 'POST',

    body: JSON.stringify({

      'status': type

    }),

    headers: {
      'Content-Type': 'application/json',
    }

  })
    .then(response => response.json())

    .then(jsonResponse => {
      if (type == 0) {
        document.getElementById("latency").innerHTML = "Latency: " + jsonResponse.latency + " ms";
        document.getElementById("UL").innerHTML = "Upload: " + jsonResponse.UL + " Mbps";
        document.getElementById("DL").innerHTML = "Download: " + jsonResponse.DL + " Mbps";
      }

      document.getElementById("dataRow").style.backgroundColor = color;
    })
}

// Function to create a list item for a part
function createPartListItem(part) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
        <strong>Name:</strong> ${part.name}
        <strong>Footprint:</strong> ${part.footprint}
        <strong>Value:</strong> ${part.value}
        <strong>Rating:</strong> ${part.rating}
    `;
  return listItem;
}


