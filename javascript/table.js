const loading = document.getElementById("loading");
const error = document.getElementById("error");

loading.style.display = 'none';
error.style.display = 'none';

let niftydata = []; 
let sectoral=[]
let comdaties=[]

const nifty_table = async () => {
    loading.style.display = 'block';  
    const url = 'jsondata/data.json'; 
    try {
        const response = await fetch(url, {
            method: "GET"
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();

       
        const broad_based = data.broad_based;
        const sectroal_data=data.sectoral
        const comodities_data=data.commodities
        niftydata = broad_based; 
        sectoral=sectroal_data
        comdaties=comodities_data
        render_table_broad(broad_based);
        render_table_sectoral(sectroal_data)
        render_table_comodities(comodities_data)


    } catch (err) {
        console.error(err);
        error.style.display = 'block';  
        error.textContent = `Error: ${err.message}`;  
    } finally {
        loading.style.display = 'none';  
    }
};

nifty_table();

const render_table_broad = (niftydata) => {
    const tableBody = document.getElementById('fetch_data'); 
    tableBody.innerHTML = '';
    
    niftydata.forEach((item) => {
        console.log("hello:",item.data_points)
        const row = document.createElement('tr'); 
        let iconClass = '';
        let textColor = '';
        let iconText = '';

        if (item.perc < 0) {
            iconClass = 'fa-caret-down';
            textColor = 'text-danger'; 
            iconText = `<span class="${textColor}">${item.perc} %</span>`; 
        } else {
            iconClass = 'fa-caret-up';
            textColor = 'text-success';
            iconText = `<span class="${textColor}">${item.perc} %</span>`; 
        }
        
        row.innerHTML=`
                <td class="w-100 p-1 d-flex">
                    <div class="w-100 p-1 d-flex justify-content-center align-items-start flex-column" >
                    <span>${item.name}</span><span class="text-secondary">${item.sec}</span>
                    </div>
                    <div class="w-100 p-1 d-flex justify-content-center align-items-center" >
                         <div class="chart-container p-0 mt-0" id="chart-${item.id}" style="width: 150px;"></div>
                    </div>
                    <div class="w-100 p-1 d-flex justify-content-center align-items-end flex-column">
                          <span>${item.price1}</span>
                          <span><i class="fa-solid ${iconClass} ${textColor}"></i> ${iconText}</span>
                    </div>
                </td>
        `
        
        tableBody.appendChild(row);
        const data = item.data_points;  
        
                
        const lastTwoComparison = data[data.length - 2] < data[data.length - 1];
        const lineColor = lastTwoComparison ? "green" : "red";

        const options = {
            chart: {
                padding:0,
                height:70,
                type: "line",
                stacked: false,
                zoom: {
                    enabled: false 
                },
                toolbar: {
                    show: false 
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: [lineColor],  // Dynamic color based on last two points comparison
            series: [
                {
                    data: data  // Use the dynamically fetched data
                }
            ],
            stroke: {
                width: [2]
            },
            xaxis: {
                labels: {
                    show: false // Hide x-axis labels for better visualization
                }
            },
            yaxis: {
                labels: {
                    show: false // Hide y-axis labels
                },
                axisTicks: {
                    show: true
                },
                axisBorder: {
                    show: true,
                    color: "#808080" 
                }
            },
            tooltip: {
                shared: false,
                intersect: true,
                x: {
                    show: false
                }
            },
            legend: {
                horizontalAlign: "left",
            
            }
        };

        // Render the chart into the dynamically created div
        const chartContainer = document.querySelector(`#chart-${item.id}`);
        const chart = new ApexCharts(chartContainer, options);
        chart.render();

    });
};

let isHighFilter = true;

const toggleFilter = () => {
    // Toggle the filter state
    isHighFilter = !isHighFilter;

    // Sort the data based on the current filter
    const sortedData = niftydata.sort((a, b) => {
        if (isHighFilter) {
            return parseFloat(b.price1) - parseFloat(a.price1); // Sort by high price
        } else {
            return parseFloat(a.price1) - parseFloat(b.price1); // Sort by low price
        }
    });

    // Render the sorted data
    render_table_broad(sortedData);

    // Update the anchor tag text based on the filter
    const filterToggle = document.getElementById('filterToggle');
    if (isHighFilter) {
        filterToggle.innerHTML = `High <i class="fa-solid fa-sort"></i>`;
    } else {
        filterToggle.innerHTML = `Low <i class="fa-solid fa-sort"></i>`;
    }
};

// Event listener for anchor tag click
document.getElementById('filterToggle').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor tag behavior
    toggleFilter(); // Call the function to sort and toggle
});




const render_table_sectoral = (niftydatasectoral) => {
    const tableBody = document.getElementById('fetch_datasectoral'); 
    tableBody.innerHTML = '';
    
    niftydatasectoral.forEach((item) => {
        const row = document.createElement('tr'); 
        let iconClass = '';
        let textColor = '';
        let iconText = '';

        if (item.perc < 0) {
            iconClass = 'fa-caret-down';
            textColor = 'text-danger'; 
            iconText = `<span class="${textColor}">${item.perc} %</span>`; 
        } else {
            iconClass = 'fa-caret-up';
            textColor = 'text-success';
            iconText = `<span class="${textColor}">${item.perc} %</span>`; 
        }

        row.innerHTML=`
        <td class="w-100 p-1 d-flex">
            <div class="w-100 p-1 d-flex justify-content-center align-items-start flex-column" >
            <span>${item.name}</span><span class="text-secondary">${item.sec}</span>
            </div>
            <div class="w-100 p-1 d-flex justify-content-center align-items-center" >
                 <div class="chart-container2 p-0 mt-0" id="chart2-${item.id}" style="width: 150px;"></div>
            </div>
            <div class="w-100 p-1 d-flex justify-content-center align-items-end flex-column">
                  <span>${item.price1}</span>
                  <span><i class="fa-solid ${iconClass} ${textColor}"></i> ${iconText}</span>
            </div>
        </td>
`

tableBody.appendChild(row);
const data = item.data_points;  

        
const lastTwoComparison = data[data.length - 2] < data[data.length - 1];
const lineColor = lastTwoComparison ? "green" : "red";

const options = {
    chart: {
        padding:0,
        height:70,
        type: "line",
        stacked: false,
        zoom: {
            enabled: false 
        },
        toolbar: {
            show: false 
        }
    },
    dataLabels: {
        enabled: false
    },
    colors: [lineColor],  // Dynamic color based on last two points comparison
    series: [
        {
            data: data  // Use the dynamically fetched data
        }
    ],
    stroke: {
        width: [2]
    },
    xaxis: {
        labels: {
            show: false // Hide x-axis labels for better visualization
        }
    },
    yaxis: {
        labels: {
            show: false // Hide y-axis labels
        },
        axisTicks: {
            show: true
        },
        axisBorder: {
            show: true,
            color: "#808080" 
        }
    },
    tooltip: {
        shared: false,
        intersect: true,
        x: {
            show: false
        }
    },
    legend: {
        horizontalAlign: "left",
    
    }
};

// Render the chart into the dynamically created div
const chartContainer = document.querySelector(`#chart2-${item.id}`);
const chart = new ApexCharts(chartContainer, options);
chart.render();

});
};


const toggleFilter2 = () => {
    // Toggle the filter state
    isHighFilter = !isHighFilter;

    // Sort the data based on the current filter
    const sortedData = sectoral.sort((a, b) => {
        if (isHighFilter) {
            return parseFloat(b.price1) - parseFloat(a.price1); // Sort by high price
        } else {
            return parseFloat(a.price1) - parseFloat(b.price1); // Sort by low price
        }
    });

    // Render the sorted data
    render_table_sectoral(sortedData);

    // Update the anchor tag text based on the filter
    const filterToggle = document.getElementById('filterToggle2');
    if (isHighFilter) {
        filterToggle.innerHTML = `High <i class="fa-solid fa-sort"></i>`;
    } else {
        filterToggle.innerHTML = `Low <i class="fa-solid fa-sort"></i>`;
    }
};

// Event listener for anchor tag click
document.getElementById('filterToggle2').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor tag behavior
    toggleFilter2(); // Call the function to sort and toggle
});


const render_table_comodities = (niftydatacomodities) => {
    const tableBody = document.getElementById('fetch_datacomodities'); 
    tableBody.innerHTML = '';
    
    niftydatacomodities.forEach((item) => {
        const row = document.createElement('tr'); 
        let iconClass = '';
        let textColor = '';
        let iconText = '';

        if (item.perc < 0) {
            iconClass = 'fa-caret-down';
            textColor = 'text-danger'; 
            iconText = `<span class="${textColor}">${item.perc} %</span>`; 
        } else {
            iconClass = 'fa-caret-up';
            textColor = 'text-success';
            iconText = `<span class="${textColor}">${item.perc} %</span>`; 
        }

        row.innerHTML=`
        <td class="w-100 p-1 d-flex">
            <div class="w-100 p-1 d-flex justify-content-center align-items-start flex-column" >
            <span>${item.name}</span><span class="text-secondary">${item.sec}</span>
            </div>
            <div class="w-100 p-1 d-flex justify-content-center align-items-center" >
                 <div class="chart-container3 p-0 mt-0" id="chart3-${item.id}" style="width: 150px;"></div>
            </div>
            <div class="w-100 p-1 d-flex justify-content-center align-items-end flex-column">
                  <span>${item.price1}</span>
                  <span><i class="fa-solid ${iconClass} ${textColor}"></i> ${iconText}</span>
            </div>
        </td>
`

tableBody.appendChild(row);
const data = item.data_points;  

        
const lastTwoComparison = data[data.length - 2] < data[data.length - 1];
const lineColor = lastTwoComparison ? "green" : "red";

const options = {
    chart: {
        padding:0,
        height:70,
        type: "line",
        stacked: false,
        zoom: {
            enabled: false 
        },
        toolbar: {
            show: false 
        }
    },
    dataLabels: {
        enabled: false
    },
    colors: [lineColor],  // Dynamic color based on last two points comparison
    series: [
        {
            data: data  // Use the dynamically fetched data
        }
    ],
    stroke: {
        width: [2]
    },
    xaxis: {
        labels: {
            show: false // Hide x-axis labels for better visualization
        }
    },
    yaxis: {
        labels: {
            show: false // Hide y-axis labels
        },
        axisTicks: {
            show: true
        },
        axisBorder: {
            show: true,
            color: "#808080" 
        }
    },
    tooltip: {
        shared: false,
        intersect: true,
        x: {
            show: false
        }
    },
    legend: {
        horizontalAlign: "left",
    
    }
};

// Render the chart into the dynamically created div
const chartContainer = document.querySelector(`#chart3-${item.id}`);
const chart = new ApexCharts(chartContainer, options);
chart.render();

    });
};


const toggleFilter3 = () => {
    // Toggle the filter state
    isHighFilter = !isHighFilter;

    // Sort the data based on the current filter
    const sortedData = comdaties.sort((a, b) => {
        if (isHighFilter) {
            return parseFloat(b.price1) - parseFloat(a.price1); // Sort by high price
        } else {
            return parseFloat(a.price1) - parseFloat(b.price1); // Sort by low price
        }
    });

    // Render the sorted data
    render_table_comodities(sortedData);

    // Update the anchor tag text based on the filter
    const filterToggle = document.getElementById('filterToggle3');
    if (isHighFilter) {
        filterToggle.innerHTML = `High <i class="fa-solid fa-sort"></i>`;
    } else {
        filterToggle.innerHTML = `Low <i class="fa-solid fa-sort"></i>`;
    }
};

// Event listener for anchor tag click
document.getElementById('filterToggle3').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor tag behavior
    toggleFilter3(); // Call the function to sort and toggle
});

const selectOption = document.getElementById("select_option");
const boxes = {
  "Large cap": document.getElementById("large"),
  "Mid cap": document.getElementById("mid"),
  "Small cap": document.getElementById("small"),
  "Market": document.getElementById("market"),
};

// Function to update the visible container
function updateVisibility(selectedOption) {
  Object.entries(boxes).forEach(([key, box]) => {
    if (key === selectedOption) {
      // Fade-in animation
      box.classList.remove("hidden");
      setTimeout(() => box.classList.add("active"), 3); 
    } else {
      // Fade-out animation
      box.classList.remove("active");
      setTimeout(() => box.classList.add("hidden"), 300); 
    }
  });
}

selectOption.addEventListener("click", function(event) {
  event.preventDefault();

  if (selectOption.textContent.trim() === "Large cap") {
    selectOption.textContent = "Mid cap";
  } else if (selectOption.textContent.trim() === "Mid cap") {
    selectOption.textContent = "Small cap";
  } else if (selectOption.textContent.trim() === "Small cap") {
    selectOption.textContent = "Market";
  } else if (selectOption.textContent.trim() === "Market") {
    selectOption.textContent = "Large cap";
  }

  updateVisibility(selectOption.textContent.trim());
});

// Initialize the first visible box
updateVisibility("Large cap");

const gaindata = async () => {
loading.style.display = 'block';  
const url = 'jsondata/data.json'; 
try {
    const response = await fetch(url, {
        method: "GET"
    });
    
    if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();

   
    const largecap = data.largecap;
    const mid=data.mid_cap
    const smallcap = data.smallcap;
    const market=data.market
    render_table_large(largecap);
    render_table_mid(mid);
    render_table_small(smallcap);
    render_table_market(market);


} catch (err) {
    console.error(err);
    error.style.display = 'block';  
    error.textContent = `Error: ${err.message}`;  
} finally {
    loading.style.display = 'none';  
}
};

gaindata();

const render_table_large = (large) => {
const tableBody = document.getElementById('large_data'); 
tableBody.innerHTML = '';

large.forEach((item) => {
    const row = document.createElement('tr'); 
    row.innerHTML = `
        <td style="width:10%;"><img src="${item.logo}" alt="" width="50" height="50"></td>
        <td>${item.name}<br><span class="text-secondary">${item.cap_name}</span></td>
         <td class="d-flex justify-content-end" >
            <div class=" p-1" >
                <span>${item.price}</span><br>
                 <span class="text-success"><i class="fa-solid fa-caret-up"></i>${item.upgrade}</span>
                </div>
             <div class="p-1 d-flex justify-content-center align-items-center""><i class="fa-solid fa-plus"></i></div>
            </td>
       
    `;
    tableBody.appendChild(row);
});
};


const render_table_mid = (mid) => {
const tableBody = document.getElementById('mid_data'); 
tableBody.innerHTML = '';

mid.forEach((item) => {
    const row = document.createElement('tr'); 
    row.innerHTML = `
        <td style="width:10%;"><img src="${item.logo}" alt="" width="50" height="50"></td>
        <td>${item.name}<br><span class="text-secondary">${item.cap_name}</span></td>
         <td class="d-flex justify-content-end" >
            <div class=" p-1" >
                <span>${item.price}</span><br>
                 <span class="text-success"><i class="fa-solid fa-caret-up"></i>${item.upgrade}</span>
                </div>
             <div class="p-1 d-flex justify-content-center align-items-center""><i class="fa-solid fa-plus"></i></div>
            </td>
       
    `;
    tableBody.appendChild(row);
});
};

const render_table_small = (small) => {
const tableBody = document.getElementById('small_data'); 
tableBody.innerHTML = '';

small.forEach((item) => {
    const row = document.createElement('tr'); 
    row.innerHTML = `
        <td style="width:10%;"><img src="${item.logo}" alt="" width="50" height="50"></td>
        <td>${item.name}<br><span class="text-secondary">${item.cap_name}</span></td>
         <td class="d-flex justify-content-end" >
            <div class=" p-1" >
                <span>${item.price}</span><br>
                 <span class="text-success"><i class="fa-solid fa-caret-up"></i>${item.upgrade}</span>
                </div>
             <div class="p-1 d-flex justify-content-center align-items-center""><i class="fa-solid fa-plus"></i></div>
            </td>
       
    `;
    tableBody.appendChild(row);
});
};

const render_table_market = (market) => {
const tableBody = document.getElementById('market_data'); 
tableBody.innerHTML = '';

market.forEach((item) => {
    const row = document.createElement('tr'); 
    row.innerHTML = `
        <td style="width:10%;"><img src="${item.logo}" alt="" width="50" height="50"></td>
        <td>${item.name}<br><span class="text-secondary">${item.cap_name}</span></td>
         <td class="d-flex justify-content-end" >
            <div class=" p-1" >
                <span>${item.price}</span><br>
                 <span class="text-success"><i class="fa-solid fa-caret-up"></i>${item.upgrade}</span>
                </div>
             <div class="p-1 d-flex justify-content-center align-items-center""><i class="fa-solid fa-plus"></i></div>
            </td>
       
    `;
    tableBody.appendChild(row);
});
};