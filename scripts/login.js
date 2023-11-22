"use strict"

let login = prompt("Введите логин");

if (login == "Админ") {
    let password = prompt("Введите пароль");
    if (password == "Я главный") {
        alert("Здравствуйте!");
    } else if (password === null) {
        alert("Отменено");
    } else {
        alert("Неверный пароль");
    }
} else if (login === null) {
    alert("Отменено");
} else {
    alert("Я вас не знаю");
}
