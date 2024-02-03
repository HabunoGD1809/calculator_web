const display = document.getElementById('display');
let numeroActual = "";
let numeroAnterior = "";
let operador = null;

const botones = document.querySelectorAll('.calculadora__boton');
botones.forEach(boton => {
   boton.addEventListener('click', () => {
      manejarClickBoton(boton.textContent);
   });
});

function manejarClickBoton(valor) {
   switch (valor) {
      case 'AC': 
         limpiarTodo();
         break;
      case 'Del': 
         borrarUltimoDigito();
         break;
      case '=': 
         calcularResultado();
         break;
      case '.': 
         agregarDecimal();
         break;
      case '+': 
      case '-': 
      case '*': 
      case '/': 
         manejarOperador(valor);
         break;
      default: 
         agregarNumero(valor);
         break;
   }
}

function limpiarTodo() {
   numeroActual = "";
   numeroAnterior = "";
   operador = null;
   actualizarDisplay('0');
}

function borrarUltimoDigito() {
   if (numeroActual.length > 0) {
      numeroActual = numeroActual.slice(0, -1);
      actualizarDisplay(numeroActual);
   }
}

function calcularResultado() {
   if (numeroAnterior === "" || operador === null) {
      return; 
   }

   const numeroActualFloat = parseFloat(numeroActual);
   const numeroAnteriorFloat = parseFloat(numeroAnterior);

   let resultado;
   switch (operador) {
      case '+':
         resultado = numeroAnteriorFloat + numeroActualFloat;
         break;
      case '-':
         resultado = numeroAnteriorFloat - numeroActualFloat;
         break;
      case '*':
         resultado = numeroAnteriorFloat * numeroActualFloat;
         break;
      case '/':
         if (numeroActualFloat === 0) {
            resultado = "Error: División por cero";
         } else {
            resultado = numeroAnteriorFloat / numeroActualFloat;
         }
         break;
   }

   numeroAnterior = "";
   operador = null;
   numeroActual = (resultado === "Error: División por cero") ? resultado : resultado.toString();
   actualizarDisplay(numeroActual);
}

function agregarDecimal() {
   if (numeroActual.includes('.')) {
      return; 
   }

   numeroActual += '.';
   actualizarDisplay(numeroActual);
}

function manejarOperador(nuevoOperador) {
   if (numeroActual === "") {
      return; 
   }

   if (numeroAnterior !== "") {
      calcularResultado(); 
   }

   numeroAnterior = numeroActual;
   numeroActual = "";
   operador = nuevoOperador;
}

function agregarNumero(numero) {
   numeroActual += numero;
   actualizarDisplay(numeroActual);
}

function actualizarDisplay(valor) {
   display.textContent = valor;
}
