const more_btn = document.getElementById('more');
        const more_menu_pannel = document.getElementById('more_menu');

        more_menu_pannel.style.display = 'none';


        more_btn.addEventListener('mouseenter', function () {
            more_menu_pannel.style.display = 'block';
        });
        more_menu_pannel.addEventListener('mouseleave', function () {
            more_menu_pannel.style.display = 'none';
        });
       
        
        const trade_value = document.getElementById('trade_value');
        const trade_value2 = document.getElementById('trade_value1');

            const value1 = "20.365855";
            const value2 = "-0.25%";

            function updateValue() {
                trade_value.textContent = value1;
                trade_value.classList.remove("red");
                trade_value2.textContent = value1;
                trade_value2.classList.remove("red");

                setTimeout(() => {
                    trade_value.textContent = value2;
                    trade_value.classList.add("red");

                    trade_value2.textContent = value2;
                    trade_value2.classList.add("red");
                    
                }, 1000);
            }

            setInterval(() => {
                updateValue();
            }, 2000);
   // Initially hide both containers
   const mc1 = document.getElementById('main_container1');
   const mc2 = document.getElementById('main_container2');
   mc1.style.display = 'none';
   mc2.style.display = 'none';
   
   // Get the initial value of the 'week_month_fun' element
   const wm_function = document.getElementById('week_month_fun').innerHTML;
   
   // Set the initial state based on the value
   if (wm_function === "Daily") {
       mc1.style.display = 'block';
   } else if (wm_function === "Monthly") {
       mc2.style.display = 'block';
   }
   
   
   document.getElementById('week_month_fun').addEventListener('click', function() {
       // Check the current state of 'week_month_fun' and toggle accordingly
       if (this.innerText === 'Daily') {
           this.innerText = 'Monthly'; // Change to Monthly
           mc1.style.display = 'none';  // Hide main_container1
           mc2.style.display = 'block'; // Show main_container2
       } else if (this.innerText === 'Monthly') {
           this.innerText = 'Daily';   // Change to Daily
           mc2.style.display = 'none'; // Hide main_container2
           mc1.style.display = 'block'; // Show main_container1
       }
   });
   
      
   document.addEventListener('DOMContentLoaded', function() {
       const clickableDivs = document.querySelectorAll('[id^="cont_click"]');
       const contentDivs = document.querySelectorAll('[id^="cont"]');
   
       clickableDivs.forEach((clickDiv, index) => {
           clickDiv.addEventListener('click', function() {
               contentDivs.forEach((contentDiv, contentIndex) => {
                   if (index === contentIndex) {
                       contentDiv.style.display = 'block';
                   } else {
                       contentDiv.style.display = 'none';
                   }
               });
   
               
               clickableDivs.forEach((div, divIndex) => {
                   if (divIndex === index) {
                       div.style.backgroundColor = ' rgb(64, 64, 64)';
                   } else {
                       div.style.backgroundColor = ''; 
                   }
               });
           });
       });
   
       // Initially display only the first content div and set the first clickable div as active
       contentDivs.forEach((div, index) => {
           if (index === 0) {
               div.style.display = 'block';
           } else {
               div.style.display = 'none';
           }
       });
   
       clickableDivs.forEach((div, index) => {
           if (index === 0) {
               div.style.backgroundColor = ' rgb(64, 64, 64)'; // 
           } else {
               div.style.backgroundColor = ''; // Reset others
           }
       });
   });

              
document.addEventListener('DOMContentLoaded', function() {
    const clickableDivs = document.querySelectorAll('[id^="month_click"]');
    const contentDivs = document.querySelectorAll('[id^="month"]');

    clickableDivs.forEach((clickDiv, index) => {
        clickDiv.addEventListener('click', function() {
            contentDivs.forEach((contentDiv, contentIndex) => {
                if (index === contentIndex) {
                    contentDiv.style.display = 'block';
                } else {
                    contentDiv.style.display = 'none';
                }
            });

            
            clickableDivs.forEach((div, divIndex) => {
                if (divIndex === index) {
                    div.style.backgroundColor = ' rgb(64, 64, 64)';
                } else {
                    div.style.backgroundColor = ''; 
                }
            });
        });
    });

    // Initially display only the first content div and set the first clickable div as active
    contentDivs.forEach((div, index) => {
        if (index === 0) {
            div.style.display = 'block';
        } else {
            div.style.display = 'none';
        }
    });

    clickableDivs.forEach((div, index) => {
        if (index === 0) {
            div.style.backgroundColor = ' rgb(64, 64, 64)'; // 
        } else {
            div.style.backgroundColor = ''; // Reset others
        }
    });
});