const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator')
const clear = document.querySelector('.clear')
const remove = document.querySelector('.remove')
const equals = document.querySelector('.equals')
const divCurrentDisplay = document.querySelector('.current_display');
const divPreviousDisplay = document.querySelector('.previous_display')
const zero = document.querySelector("#zero")

let displayResult = ""
let displayPreviousResult = ""
let operation = undefined



// Calculate function
const calculate = () => {
    let action
    if(!displayResult || !displayPreviousResult){
        return
    }

    const previous = parseFloat(displayPreviousResult)
    const current = parseFloat(displayResult)

    if(isNaN(previous) || isNaN(current)){
        return
    }

    if(operation === "+"){
        action = previous + current
    } else if (operation === "-"){
        action = previous - current
    } else if (operation === "*"){
        action = previous * current
    } else if (operation === "/" && current == 0){
        action = "You blowed my mind.."
    } else if (operation === "%"){
        action = previous / 100 * current
    } else {
        action = previous / current
    }

    displayResult = action
    operation = undefined
    displayPreviousResult = ""
}



// Equal function
equals.addEventListener('click', () => {
    calculate()
    currentResult()
    displayPreviousResult = ""
    operation = undefined
})



// Display function
const currentResult = () =>{
    divCurrentDisplay.textContent = displayResult;
    if(operation != null) {
        divPreviousDisplay.textContent = displayPreviousResult + operation
    } else{
        divPreviousDisplay.textContent = ""
    }   
}



// Function select operation
const selectedOperation = (operator) => {
    if(displayResult === ""){
        return
    } else if (displayResult ===! "") {
        calculate()
    }
    operation = operator
    displayPreviousResult = displayResult
    displayResult = ""
}

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        selectedOperation(operator.textContent)
        currentResult()
    })
})



// ZERO FUNCTION
zero.addEventListener('click', () => {
    if (displayResult === "0" || displayResult === ""){
        displayResult = ""
        currentResult()
    }  
})



// DOTT FUNCTION
const addNumber = (number) => {
    if (number === "."){
        if (displayResult.includes(".")){
            return
        }
        number = "."
    }
    displayResult = displayResult + number
}



// ADD NUMBER FUNCTION
numbers.forEach((number) => {
    number.addEventListener('click', () =>{
        addNumber(number.textContent)
        currentResult()
    })
})



// CLEAR FUNCTION
clear.addEventListener('click', () => {
    displayResult = ""
    displayPreviousResult = ""
    operation = undefined
    currentResult()
})



//  REMOVE FUNCTION
const removeNumber = () => {
    displayResult = displayResult.toString().slice(0, -1);
    currentResult()
}
remove.addEventListener('click', removeNumber)
