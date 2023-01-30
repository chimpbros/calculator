function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(operator, a, b){
    return operator(a, b);
}

function operationEvent(operator){
    if(numInput){
        secondaryScreen.textContent = `${numInput} ${divideBtn.textContent}`;
        num1 = parseFloat(numInput);
        numInput = null;
        operation = divide;
    }
}

const primaryScreen = document.querySelector('.primary');
const secondaryScreen= document.querySelector('.secondary');
const btnNum = document.querySelectorAll('.btn.num');
let num1, num2, operation, result;
let numInput = null;
const clear = document.querySelector('#clear');
const del = document.querySelector('#del');
const divideBtn = document.querySelector('#divide');
const multiplyBtn = document.querySelector('#multiply');
const subtractBtn = document.querySelector('#subtract');
const addBtn = document.querySelector('#add');
const equalsBtn = document.querySelector('#equals');
btnNum.forEach(btn => btn.addEventListener('click', function(){
    let clickedVal = this.textContent;
    if(!numInput){
        numInput = clickedVal;
    } else{
        numInput += clickedVal;
    }
    primaryScreen.textContent = numInput;
}));

clear.addEventListener('click', () => {
    numInput = null;
    primaryScreen.textContent = 0;
    secondaryScreen.textContent = numInput;
});

del.addEventListener('click', () => {
    if(numInput){
        numInput = numInput.slice(0, -1);
        primaryScreen.textContent = numInput;
    }
});

divideBtn.addEventListener('click', () => {
        if(numInput){
            secondaryScreen.textContent = `${numInput} ${divideBtn.textContent}`;
            num1 = parseFloat(numInput);
            numInput = null;
            operation = divide;
        }
});

multiplyBtn.addEventListener('click', () => {
    if(numInput){
        secondaryScreen.textContent = `${numInput} ${multiplyBtn.textContent}`;
        num1 = parseFloat(numInput);
        numInput = null;
        operation = multiply;
    }
});

subtractBtn.addEventListener('click', () => {
    if(numInput){
        secondaryScreen.textContent = `${numInput} ${subtractBtn.textContent}`;
        num1 = parseFloat(numInput);
        numInput = null;
        operation = subtract;
    }
});

addBtn.addEventListener('click', () => {
    if(numInput){
        secondaryScreen.textContent = `${numInput} ${addBtn.textContent}`;
        num1 = parseFloat(numInput);
        numInput = null;
        operation = add;
    }
});


equalsBtn.addEventListener('click', () => {
    if(num1){
        secondaryScreen.textContent += ` ${numInput} =`;
        num2 = parseFloat(numInput);
        result = operate(operation, num1, num2);
        primaryScreen.textContent = result;
        numInput = result;
    }
});
