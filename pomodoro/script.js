document.addEventListener("DOMContentLoaded", function() {
  
  let displayElement = document.getElementById("displayfor2secondsitem");
  let noneElement = document.getElementById("none");

  if (displayElement && noneElement) {
      setTimeout(function() {
          displayElement.classList.add("fade-in");

        
          setTimeout(function() {
              displayElement.classList.remove("fade-in");
              displayElement.classList.add("fade-out");

              
              displayElement.addEventListener("transitionend", function() {
                  displayElement.style.display = "none";
                  noneElement.classList.remove("hidden");
                  noneElement.classList.add("fade-in");
              }, { once: true });
          }, 500); 
      }, 500); 
  }


  let timeEnterButton = document.getElementById("timeEnterButton");
  let restEnterButton = document.getElementById("restEnterButton");
  let startTimerButton = document.querySelector(".StartTimerButton");

  if (timeEnterButton && restEnterButton && startTimerButton) {
      let selectedTime;
      let selectedRest;

      timeEnterButton.addEventListener("click", function() {
          selectedTime = document.getElementById("timer2").value;
          console.log(selectedTime);
      });

      restEnterButton.addEventListener("click", function() {
          selectedRest = document.getElementById("timer4").value;
          console.log(selectedRest);
      });

      startTimerButton.addEventListener("click", function(event) {
          if (!selectedTime || !selectedRest) {
              event.preventDefault();
              alert("Please select both work and rest times.");
          } else {
             
              localStorage.setItem("selectedTime", selectedTime);
              localStorage.setItem("selectedRest", selectedRest);
          }
      });
  }


  let timer1Element = document.getElementById('timer1');
  let restPeriodElement = document.getElementById('restperiod1');

  if (timer1Element && restPeriodElement) {
      let selectedTime = localStorage.getItem("selectedTime");
      let selectedRest = localStorage.getItem("selectedRest");

      if (selectedTime && selectedRest) {
         
          let countdownTime = parseInt(selectedTime, 10) * 60; // to sec
          let restPeriod = parseInt(selectedRest, 10) * 60; // TO SEC
          let isResting = false;

          function updateDisplay() {
              let minutes = Math.floor(countdownTime / 60);
              let seconds = countdownTime % 60;
              let timeString = `${minutes}:${('0' + seconds).slice(-2)}`;
              
              if (isResting) {
                  restPeriodElement.innerHTML = timeString;
              } else {
                  timer1Element.innerHTML = timeString;
              }
          }

          function startRestPeriod() {
              isResting = true;
              countdownTime = restPeriod;
              updateDisplay();
              timer1Element.classList.add("hidden");
              restPeriodElement.classList.remove("hidden");
          }

          function showRestButton() {
              document.body.innerHTML = `
                  <div style="text-align: center; padding-top: 20%;">
                      <button style="font-size: 24px;">Rest Now</button>
                  </div>
              `;
              document.body.style.backgroundColor = "white";
          }

          updateDisplay();

          let interval = setInterval(function() {
              if (countdownTime > 0) {
                  countdownTime--;
                  updateDisplay();
              } else {
                  clearInterval(interval);

                  if (!isResting) {
                      startRestPeriod();
                      interval = setInterval(function() {
                          if (countdownTime > 0) {
                              countdownTime--;
                              updateDisplay();
                          } else {
                              clearInterval(interval);
                              showRestButton();
                          }
                      }, 1000);
                  } else {
                      showRestButton();
                  }
              }
          }, 1000);
      }
  }
});
