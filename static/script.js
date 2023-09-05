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
  },
  {
    "name": "IC",
    "footprint": "DIP-16",
    "value": "LM324",
    "rating": "Low Power Quad Op-Amp"
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
  },
  {
    "name": "IC",
    "footprint": "DIP-16",
    "value": "LM324",
    "rating": "Low Power Quad Op-Amp"
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
  },
  {
    "name": "IC",
    "footprint": "DIP-16",
    "value": "LM324",
    "rating": "Low Power Quad Op-Amp"
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
  },
  {
    "name": "IC",
    "footprint": "DIP-16",
    "value": "LM324",
    "rating": "Low Power Quad Op-Amp"
  }
];

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

function showBrowse() {
  // Get the parts list element
  const subPage = document.getElementById('subPage');
  fetch('browsePage.html')
    .then(response => response.text())
    .then(html => {
      subPage.innerHTML = html;
      const partsList = document.getElementById('parts-list');
      // Loop through the parts data and create list items
      const listItem = createPartListHeader();
      partsList.appendChild(listItem);
      partsData.forEach(part => {
        const listItem = createPartListItem(part);
        partsList.appendChild(listItem);
      });
    });

}

function createPartListItem(part) {
  const listItem = document.createElement('button');
  listItem.classList.add("row");
  listItem.classList.add("list_button");
  listItem.innerHTML = `
      <span class="col-3"> ${part.name}</span>
      <span class="col-3"> ${part.value}</span>
      <span class="col-3"> ${part.footprint}</span>
      <span class="col-3"> ${part.rating}</span>
    `;
  return listItem;
}

function createPartListHeader() {
  const listItem = document.createElement('button');
  listItem.classList.add("row");
  listItem.classList.add("list_button");
  listItem.classList.add("listHeader");
  listItem.innerHTML = `
      <span class="col-3"><strong>Name</strong></span>
      <span class="col-3"><strong>Value</strong></span>
      <span class="col-3"><strong>Footprint</strong></span>
      <span class="col-3"><strong>Rating</strong></span>
    `;
  return listItem;
}


