// Ajustar el tamaño de las imágenes a medida que se carga la página y cuando se cambia el tamaño de la ventana del navegador.
window.addEventListener('load', adjustImageSize);
window.addEventListener('resize', adjustImageSize);

function adjustImageSize() {
  const images = document.querySelectorAll('.image');
  images.forEach((image) => {
    const img = image.querySelector('img');
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const containerWidth = image.offsetWidth;
    const containerHeight = image.offsetHeight;
    const containerAspectRatio = containerWidth / containerHeight;
    if (aspectRatio > containerAspectRatio) {
      img.style.width = '100%';
      img.style.height = 'auto';
    } else {
      img.style.width = 'auto';
      img.style.height = '100%';
    }
  });
}

// Calculator
let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}
function handleSymbol(symbol) {
  switch (symbol) {
    case 'C':
      buffer = '0';
      runningTotal = 0;
      break;
    case '=':
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal=0;
      break;
    case '←':
      if (buffer.length === 1) {
        buffer = '0';
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case '+':
    case '−':
    case '×':
    case '÷':
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (buffer === '0') {
    return;
  }
  const intBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = symbol;
  buffer = '0';
}

function flushOperation(intBuffer) {
  if (previousOperator === '+') {
    runningTotal += intBuffer;
  } else if (previousOperator === '−') {
    runningTotal -= intBuffer;
  } else if (previousOperator === '×') {
    runningTotal *= intBuffer;
  } else if (previousOperator === '÷') {
    runningTotal /= intBuffer;
  }
}

function handleNumber(numberString) {
  if (buffer === '0') {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}
function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}
init();
//Función que me aplica el estilo a la opciòn seleccionada y quita la previamente seleccionada
function seleccionar(link) {
  var opciones = document.querySelectorAll("#links  a");
  opciones[0].className = "";
  opciones[1].className = "";
  opciones[2].className = "";
  opciones[3].className = "";
  opciones[4].className = "";
  link.className = "seleccionado";
}

//función que muestra el menu responsive
function responsiveMenu() {
  var x = document.getElementById("nav");
  if (x.className === "") {
    x.className = "responsive";
  } else {
    x.className = "";
  }
}

const btn = document.getElementById("button_form_contact");

document
  .getElementById("form_contact")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    btn.value = "Enviando...";

    const serviceID = "service_kl1plj1";
    const templateID = "template_codsbny";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = "Enviar Mensaje";
        alert("Enviado!");
      },
      (err) => {
        btn.value = "Enviar Mensaje";
        alert(JSON.stringify(err));
      }
    );
  });
