const xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
const yValues = [7, 8, 8, 9, 9, 9, 20, 11, 14, 14, 10];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0.3,
      backgroundColor: "rgba(0,0,0,1.0)",
      borderColor: "rgba(193,176,82,0.7)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      
      x: {
        ticks: {
          color: '#000', // Color of the x-axis labels
        },
        grid: {
          color: '#000', // Color of the x-axis grid lines
        },
        border: {
          width: 2,
          color: '#000', // <-------------- Color of the x-axis
        },
      },
      y: {
        ticks: {
          color: '#000', // Color of the x-axis labels
        },
        grid: {
          color: '#000', // Color of the x-axis grid lines
        },
        border: {
          width: 2,
          color: '#000', // <-------------- Color of the x-axis
        },
      }
    }
  }
});


function deletePart(part){
  
}