"use strict"

let item = document.querySelector("#notification");

let notificationBlock = document.querySelector('#notification_menu_sym');
let messageCounter = document.querySelectorAll(".block-wrap > li").length;
notificationBlock.setAttribute("countOfMessages", messageCounter);

function sendMessage() {
    let blockWrap = document.querySelector('.block-wrap');
    blockWrap.innerHTML += '<li><a>Новое сообщение</a><span class="close-btn">x</span></li>';
    messageCounter++;
    if (messageCounter < 10) {
        notificationBlock.setAttribute("countOfMessages", messageCounter);
    }
    else {
        notificationBlock.setAttribute("countOfMessages", "9+");
    }
}

// let timer = setInterval(sendMessage, 3000);
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

// Временное уведомление
function showNotification(options) {
    let element = document.createElement('div');
    element.className = "float-note";
    element.innerHTML = "<article>Внимание!</br>Сообщение исчезнет через 1,5 секунды...</article>";
    document.body.append(element);
    setTimeout(() => document.body.removeChild(element), 3000);
}

// Закрытие сообщения
item.onclick = event => {
    if (event.target.className != "close-btn")
        return;
    
    console.log(event.target.parentNode);
    notificationBlock.setAttribute("countOfMessages", --messageCounter);
    event.target.parentNode.remove();
};
