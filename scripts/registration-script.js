"use strict"

const infoBlock = document.querySelector('.info');
const capchaBlock = document.querySelector('.capcha-generator-block');
const inputBlock = document.querySelector('#capcha');
const messageBlock = document.querySelector('.message');
const button = document.querySelector('.submit');

let firstState = true;
capchaBlock.textContent = letterGenerator(7);
let answer = capchaBlock.textContent;

inputBlock.addEventListener('input', function (evt) {
    if (!firstState) {
        button.disabled = true;
    }

    if (isEmpty(inputBlock)) {
        messageBlock.style.display = "none";
    }
    else if (inputBlock.value != answer) {
        messageBlock.textContent = "Неверно";
        messageBlock.style.color = "red";
        messageBlock.style.display = "inline";
    }
    else {
        messageBlock.textContent = "Верно";
        messageBlock.style.color = "#0cdf0c";
        button.disabled = false;
    }
});

function isEmpty(obj) {
    if (obj.value) return false;
    return true;
}

function letterGenerator(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

function expressionGenerator(maxValue) {
    let a = 1 + Math.floor(Math.random() * (maxValue - 1));
    let b = 1 + Math.floor(Math.random() * (maxValue - 1));
    answer = a + b;
    return a + " + " + b + " = ?";
}

document.querySelector('form').onsubmit = function() {
    if (inputBlock.value != answer) {
        alert("Капча введена неверно. Будет предложен другой вариант.");
        infoBlock.textContent = "Введите результат математического выражения:";
        inputBlock.value = null;
        capchaBlock.textContent = expressionGenerator(100);
        button.disabled = true;
        firstState = false;
        return false;
    }
    return true;
}
