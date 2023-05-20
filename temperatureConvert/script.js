// Get reference to the Celsius and Fahrenheit input fields

const main = document.querySelector("main"),
  celsius = main.querySelector("#celsius"),
  fahrenheit = main.querySelector("#fahrenheit");

  //Set focus to the Celsius input field when the page

  window.addEventListener("load" , () => celsius.focus());

  // Convert Celsius to Fahrenheit when Celsius value change
  celsius.addEventListener("input", () => {
    fahrenheit.value = ((celsius.value * 9)/ 5 + 32).toFixed(2);
    //Clear fahrenheit input when celsius input is empty
    if(!celsius.value) fahrenheit.value = "";
  });

//   Convert Fahrenheit to Celsius when Fahrenheit
    fahrenheit.addEventListener("input", () => {
        celsius.value = (((fahrenheit.value - 32)*5)/9).toFixed(2);
        // Clear celsius input when fahrenheit input is empy
        if(!fahrenheit.value) celsius.value = "";
    });