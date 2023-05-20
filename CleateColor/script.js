const container = document.querySelector(".container");
const refreshBtn = document.querySelector(".refresh_btn");

const maxPaletteBoxes = 32;

const generatePalette = () => {

    container.innerHTML = "";//clearing the container

  for(let i = 0 ; i<maxPaletteBoxes; i++){

    //generating a random hex color code
    let randomHex = Math.floor(Math.random()*0xffffff).toString(16);
       randomHex = `#${randomHex.padStart(6,"0")}`;

    // creating a new 'li' element and inserting it to the container

    const color = document.createElement("li");
    color.classList.add("color");
    color.innerHTML =  ` <section class="rect_box" style="background: ${randomHex}"></section>
                    <span class="hex_value">${randomHex}</span>`;

                    // adding click event to current li element to copy the color

                    color.addEventListener("click", ()=> copyColor(color, randomHex));
                    container.appendChild(color);


  }

  }


  generatePalette();

  const copyColor = (elem, hexVal) => {
    const colorElement = elem.querySelector(".hex_value");

    //copying the hex value, updating the text to copied
    //and chaning text back to original hex value after 1 second
    navigator.clipboard.writeText(hexVal).then(()=> {
        colorElement.innerText = "Copied";
        setTimeout(()=> colorElement.innerHTML = hexVal, 1000);
    }).catch(()=>alert("Failed to copy the color code !"))

  }

  refreshBtn.addEventListener("click", generatePalette);