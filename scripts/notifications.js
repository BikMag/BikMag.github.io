"use strict"

let item = document.querySelector("#notification");

item.onmouseover = function() {
    // messageDecorator(sendMessage);
    // console.log('hovered');
}
item.onmouseout = function() {
    // console.log('unhovered');
}

let notificationBlock = document.querySelector('#notification_menu_sym');
let messageCounter = document.querySelectorAll(".block-wrap > li").length;
notificationBlock.setAttribute("countOfMessages", messageCounter);

function sendMessage() {
    let blockWrap = document.querySelector('.block-wrap');
    blockWrap.innerHTML += "<li><a>Новое сообщение</a></li>";
    messageCounter++;
    if (messageCounter < 10) {
        notificationBlock.setAttribute("countOfMessages", messageCounter);
    }
    else {
        notificationBlock.setAttribute("countOfMessages", "9+");
    }
}

let timer = setInterval(sendMessage, 3000);
let timeout;
// Декоратор
function messageDecorator(func) {
    console.log("decorator");
    clearInterval(timer);
    clearTimeout(timeout);
    timeout = setTimeout(() => {timer = setInterval(func, 3000);}, 10000);
}

let isClicked = false; 
function clicked() {
    console.log("pressed");
    isClicked = !isClicked;
    messageDecorator(sendMessage);
}

// Создатель списка
function createList() {
    let listObj = document.querySelector(".list-maker");
    let element;

    let text = prompt("Введите текст:");
    if (text !== null) {
        if (text != "") {
            element = document.createElement('li');
            element.textContent = text;
            listObj.append(element);
        }
        setTimeout(() => {createList()}, 100);
    }
}

// Временное уведомление
function showNotification(options) {
    let element = document.createElement('div');
    element.className = "float-note";
    element.innerHTML = "<article>Внимание!</br>Сообщение исчезнет через 1,5 секунды...</article>";
    document.body.append(element);
    setTimeout(() => document.body.removeChild(element), 3000);
}
