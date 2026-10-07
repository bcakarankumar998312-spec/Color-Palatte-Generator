
const cp = document.querySelectorAll(".cp");
const generatepalette = document.querySelector(".g");
const copyBtns = document.querySelectorAll(".copy");
const saveBtn = document.querySelector(".s");
const savedPaletteBtn = document.querySelector(".sp");
const savedPalettesContainer = document.querySelector(".saved-palettes");

generatepalette.addEventListener("click", colGen);

function colGen(){
   for(let color of cp){
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    let rgb = `rgb(${red}, ${green}, ${blue})`;

    let redHex = red.toString(16).padStart(2, "0");
    let greenHex = green.toString(16).padStart(2, "0");
    let blueHex = blue.toString(16).padStart(2,"0");

    let hex = `#${redHex}${greenHex}${blueHex}`;

    color.style.backgroundColor = rgb;
    color.querySelector(".hc").textContent = hex;
   }
   
}

colGen();

for(let button of copyBtns){
   button.addEventListener("click", function(){
      let colorBox = button.parentElement;
      let hexCode = colorBox.querySelector(".hc").textContent;

      navigator.clipboard.writeText(hexCode);
      button.textContent = "Copied!";

      setTimeout(function() {
         button.textContent = "Copy";
      }, 1000);
   })

  
}

//SAVE PALETTE
saveBtn.addEventListener("click", function(){
   //Get the current palette
   let palette = [];

   for(let color of cp){
      let hex = color.querySelector(".hc").textContent;
      palette.push(hex);
   }

   console.log(palette);


   //Get previously saved palettes
   let palettes = JSON.parse(localStorage.getItem("palettes")) || [];
   console.log(palettes)
   
   //Add current palette to the collection
   palettes.push(palette);

   //Save all palettes
   localStorage.setItem("palettes", JSON.stringify(palettes));

   //Confirmation
   alert("Palette saved successfully!");
});

//RETRIEVE SAVED PALETTE

savedPaletteBtn.addEventListener("click", function() {
   let savedPalettes = JSON.parse(
      localStorage.getItem("palettes")
   ) || [];

   displaySavedPalettes(savedPalettes);
})

function displaySavedPalettes(savedPalettes){
   savedPalettesContainer.innerHTML = "";
   for(let i = 0; i<savedPalettes.length; i++){
      let palette = savedPalettes[i];
      let paletteBox = document.createElement("div");
      paletteBox.classList.add("saved-palette");
      for(let hex of palette){
         let colorBox = document.createElement("div");
         colorBox.style.backgroundColor = hex;
         paletteBox.appendChild(colorBox);
      }
      let deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      paletteBox.appendChild(deleteBtn);
      deleteBtn.addEventListener("click", function(){
         savedPalettes.splice(i, 1);
         localStorage.setItem("palettes", JSON.stringify(savedPalettes));
         displaySavedPalettes(savedPalettes);
      });
      savedPalettesContainer.appendChild(paletteBox);
   }
}