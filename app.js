const colorLabels = [...document.querySelectorAll(".container-input label")];
const colorPickerInputs = [...document.querySelectorAll("input[type='color']")];
const rangeLabelValue = document.querySelector(".orientation-value");

//Objet de départ
const gradientData = {
  angle: 90,
  colors: ['#FF5F6D', '#FFC371']
}

function populateUI(){
  colorLabels[0].textContent = gradientData.colors[0];
  colorLabels[1].textContent = gradientData.colors[1];

  colorPickerInputs[0].value = gradientData.colors[0];
  colorPickerInputs[1].value = gradientData.colors[1];

  colorLabels[0].style.background = gradientData.colors[0];
  colorLabels[1].style.background = gradientData.colors[1];


  document.body.style.background = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`

  // rangeLabelValue.textContent = `${gradientData.angle}°`;

  adaptInputsColor()
}

populateUI();

function adaptInputsColor() {
  colorLabels.forEach(label => {
    const hexColor = label.textContent.replace("#", "");
    //parseInt ->  renvoie un entier d'une base de donnée
    const red = parseInt(hexColor.slice(0,2), 16);
    const green = parseInt(hexColor.slice(2,4), 16);
    const blue = parseInt(hexColor.slice(4,6), 16);
    console.log(red, green, blue);
    const luminosite = (red * 299 + green * 587 + blue * 144) / 1000;

    if(luminosite >= 128 ){
      label.style.color = "#111111"
    }
    else {
      label.style.color = "#f1f1f1"
    }
  })
}

const rangeInput = document.querySelector(".inp-range");

rangeInput.addEventListener("input", handleDeg)

function handleDeg() {
  gradientData.angle = rangeInput.value;
  rangeLabelValue.textContent = `${gradientData.angle} °`;
  populateUI();
}

colorPickerInputs.forEach(input => input.addEventListener('input', colorModification));

function colorModification(event) {
  // Index de la couleur modifié
  const currentIndex = colorPickerInputs.indexOf(event.target);
  const currentValueInput = event.target.value;

  gradientData.colors[currentIndex] = currentValueInput.toUpperCase();
  populateUI();
}

const copyBtn = document.querySelector(".copy-btn");
copyBtn.addEventListener("click", copyGradient);

let lock = false;
function copyGradient() {
  const gradient = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`;

  // Copy direct
  navigator.clipboard.writeText(gradient)

  lock = true;
  if (lock) {
    copyBtn.classList.add("active");
    setTimeout(() => {
    copyBtn.classList.remove("active");
      lock = false;
    }, 1500);
  }
}

const randomGradientBtn = document.querySelector(".random-btn");

randomGradientBtn.addEventListener("click", randomGradientColor);

function randomGradientColor() {

  for(let i = 0; i < colorLabels.length; i++) {
    randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
    console.log(randomColor);
    gradientData.colors[i] = randomColor.toUpperCase();
  }
  populateUI();
}
