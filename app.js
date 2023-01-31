function add(a, b){
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b){
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b){
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b){
    return parseFloat(a) / parseFloat(b);
}

function operate(operator, a, b){
    switch(operator) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply':
            return subtract(a, b);
        case 'divide':
            return divide(a, b);
    }
}

function operationEvent(operator, btn){
    process = true;
    if(numInput && process){
        secondaryScreen.textContent = `${numInput} ${btn.textContent}`;
        operation = operator;
        if(!num2){
            num1 = parseFloat(numInput);
        } else{
            result = operate(operation, num1, num2);
            num1 = result;
            num2 = parseFloat(numInput);
            primaryScreen.textContent = result;
        }
        numInput = null;
    }
}

function equals(){
    if(process){
        secondaryScreen.textContent += ` ${numInput} =`;
        num2 = parseFloat(numInput);
        result = operate(operation, num1, num2);
        primaryScreen.textContent = result;
        numInput = result;
        process = false;
    }
}

const primaryScreen = document.querySelector('.primary');
const secondaryScreen= document.querySelector('.secondary');
const btnGrid = document.querySelector('.btn-grid');
const operator = ['add', 'multiply', 'divide', 'subtract'];
let numInput, operation;

btnGrid.addEventListener('click', e => {
    if(e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = primaryScreen.textContent;
        const previousKey = btnGrid.dataset.previousKeyType;
        let num1, num2;
        // when user click number button
        if(!action){
            if(displayedNum === '0' || previousKey === 'operator'){
                primaryScreen.textContent = keyContent;
            } else{
                primaryScreen.textContent += keyContent;
            }
            btnGrid.dataset.previousKeyType = 'number';
        }
        // when user click operator button
        if(operator.includes(action)){
            secondaryScreen.textContent = displayedNum + ' ' + keyContent;
            btnGrid.dataset.previousKeyType = 'operator';
            numInput = displayedNum;
            operation = action;
        }
        if(action === 'decimal'){
            if(!displayedNum.includes('.')){
                primaryScreen.textContent = displayedNum + '.';
            }
            if(previousKey === 'operator'){
                primaryScreen.textContent = '0.';
            }
            btnGrid.dataset.previousKeyType = 'decimal';
        }
        if(action === 'del'){
        
        }
        if(action === 'clear'){
            primaryScreen.textContent = '0';
            secondaryScreen.textContent = '';
        }
        if(action === 'percent'){
            console.log('percent');
        }
        if(action === 'equals'){
            // calculate result when previous data key is not equals and operation not null
            if(previousKey != 'equals' && operation){
                num1 = numInput;
                num2 = displayedNum;
                primaryScreen.textContent = operate(operation, num1, num2);
            }
            btnGrid.dataset.previousKeyType = 'equals';
            operation = null;
        }
    }
});
// btnNum.forEach(btn => btn.addEventListener('click', function(){
//     let clickedVal = this.textContent;
//     if(!numInput){
//         numInput = clickedVal;
//     } else{
//         numInput += clickedVal;
//     }
//     primaryScreen.textContent = numInput;
// }));

// clear.addEventListener('click', () => {
//     numInput = null;
//     primaryScreen.textContent = 0;
//     secondaryScreen.textContent = numInput;
// });

// del.addEventListener('click', () => {
//     if(numInput){
//         numInput = numInput.slice(0, -1);
//         primaryScreen.textContent = numInput;
//     }
// });

// divideBtn.addEventListener('click', () => {
//         operationEvent(divide, divideBtn);
// });

// multiplyBtn.addEventListener('click', () => {
//     operationEvent(multiply, multiplyBtn);
// });

// subtractBtn.addEventListener('click', () => {
//     operationEvent(subtract, subtractBtn);
// });

// addBtn.addEventListener('click', () => {
//     operationEvent(add, addBtn);
// });


// equalsBtn.addEventListener('click', equals);
