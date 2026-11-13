const deleteButton = document.getElementById('btn-delete');
const cleanButton = document.getElementById('btn-clean');
const percentageButton = document.getElementById('btn-percentage');
const divisionButton = document.getElementById('btn-division');
const multiplicationButton = document.getElementById('btn-multi');
const subtractionButton = document.getElementById('btn-sub');
const additionButton = document.getElementById('btn-add');
const toggleSignButton = document.getElementById('btn-toggle-sign');
const decimalButton = document.getElementById('btn-decimal');
const resultButton = document.getElementById('btn-result');
const resultNumber = document.getElementById('result-number');

const numberButton = document.querySelectorAll('.calculator__button--number');

//Variables globales
let num1 = "";
let num2 = "";
let operation = undefined;

//Se obtiene el número al que se le da click y se guarda en num2 (num actual)
numberButton.forEach(button => {
    button.addEventListener('click', (event) => {
        const clickedNumber = event.target.dataset.value;
        console.log("Número presionado: ", clickedNumber);
        
        // Se concatena el número a num2
        num2 = num2 + clickedNumber;

        updateDisplay()
    });
});

//Botones de operaciones y resultado

//suma
additionButton.addEventListener('click', () => {
    chooseOperation('+');
    updateDisplay();
});

//resta
subtractionButton.addEventListener('click', () => {
    chooseOperation('-');
    updateDisplay();
});

//multiplicación
multiplicationButton.addEventListener('click', () => {
    chooseOperation('*');
    updateDisplay();
});

//division
divisionButton.addEventListener('click', () => {
    chooseOperation('/');
    updateDisplay();
});

//porcentaje
percentageButton.addEventListener('click', () => {
    chooseOperation('%');
    updateDisplay();
});

//Cambiar valor positivo/negativo
toggleSignButton.addEventListener('click', () => {
    if (num2 === '') return;

    num2 = (parseFloat(num2) * -1).toString();
    updateDisplay();
});
//Resultado
resultButton.addEventListener('click', () => {
    calculate();
});

//Botones para limpiar el display.

//Botón para borrar todo el cálculo
cleanButton.addEventListener('click', ()=>{
    num1="";
    num2="";
    operation=undefined;
    updateDisplay();
})

// Botón para borrar el último dígito
deleteButton.addEventListener('click', () => {
    num2 = num2.toString().slice(0, -1);
    updateDisplay();
});

//boton para el decimal
decimalButton.addEventListener('click', () => {
    if (num2.includes('.')) return;
    if (num2 === "") num2 = "0";
    num2 = num2 + '.';
    updateDisplay();
});

//En las funciones no se utilizan arrowFunction porque no pueden ser utilizadas antes de ser declaradas.

//Función para mostrar texto en calculadora
function updateDisplay(){
    if(num2 != ""){
            resultNumber.textContent = num2;
        } else if (num1 !=""){
            resultNumber.textContent = num1;
        } else{
            resultNumber.textContent = 0;
        }
    }


// Función para seleccionar el operador
function chooseOperation (operator) {
    // Guard clause
    if (num2 === "") return;
    
    // Si ya había una operación pendiente, calcula el resultado primero
    if (num1 !== "") {
        calculate();
    }
    
    operation = operator;
    num1 = num2;
    num2 = "";

     updateDisplay()
}

// Funcion para realizar cualquier cálculo 
function calculate() {


    // Se cambia el tipo de dato de texto a número
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    // Guard clause
    if (isNaN(number1) || isNaN(number2)) return;

    let result;



    switch(operation) {
        case '+':
            result = number1 + number2;
            
            break;
        case '-':
            result = number1 - number2;
            break;
        case '*':
            result = number1 * number2;
            break;
        case '/':
            result = number1 / number2;
            break;
        case '%':
            result = (number1 * number2) / 100;
            break;
        default:
            return;
    }

    // Se actualizan las variables globales con el resultado
    num2 = result.toString();
    operation = undefined;
    num1 = "";

     updateDisplay()
}

