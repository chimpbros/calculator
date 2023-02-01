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
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
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
            btnGrid.dataset.previousKeyType = 'operator';
            const operator = btnGrid.dataset.operator;
            const num1 = numInput;
            const num2 = displayedNum;
            if((num1 && operator) && previousKey === 'number'){
                numInput = operate(operator, num1, num2);
                primaryScreen.textContent = Math.round(numInput * 100000000) / 100000000;
            }
            btnGrid.dataset.operator = action;
            numInput = primaryScreen.textContent;
            operation = action;
            secondaryScreen.textContent = primaryScreen.textContent + ' ' + keyContent;
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
            if(displayedNum.length <= 1){
                primaryScreen.textContent = '0';
            } else{
                let newValue = displayedNum.slice(0, -1);
                primaryScreen.textContent = newValue;
            }
        }
        if(action === 'clear'){
            primaryScreen.textContent = '0';
            secondaryScreen.textContent = '';
            numInput = null;
        }
        if(action === 'percent'){
            if(previousKey === 'number'){
                const currentValue = parseFloat(primaryScreen.textContent);
                primaryScreen.textContent = (currentValue / 100).toString();
            }
        }
        if(action === 'equals'){
            // calculate result when previous data key is not equals and operation not null
            let result;
            if(previousKey != 'equals' && operation){
                const num1 = numInput;
                const num2 = displayedNum;
                result = operate(operation, num1, num2);
                primaryScreen.textContent = Math.round(result * 100000000) / 100000000;
            }
            btnGrid.dataset.previousKeyType = 'equals';
            operation = null;
        }
    }
});

document.addEventListener('keyup', (e) => {
    if(!Number.isNaN(+e.key)){
        console.log(e.key);
    }
});