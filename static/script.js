function tableElementMouseOver(element){
    const descendantButtons = element.querySelectorAll('a');

    // Loop through each descendant button and apply the expandDiv function
    descendantButtons.forEach(function(button) {
      button.style.display = "flex";
    });
}

function tableElementMouseLeave(element){
    const descendantButtons = element.querySelectorAll('a');

    // Loop through each descendant button and apply the expandDiv function
    descendantButtons.forEach(function(button) {
      button.style.display = "none";
    });
}

function reloadPage() {
    location.reload();
  }
  
  // Schedule a page reload every 5 seconds
 // setInterval(reloadPage, 5000);