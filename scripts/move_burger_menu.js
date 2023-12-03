"use strict"
// burger menu
const navButton = document.querySelector("input");
const menu = document.querySelector("#menu");

navButton.addEventListener("change", () => {
    if (navButton.checked) {
        menu.style.transform = "translate(0, 0)";
    } else {
        menu.style.transform = "translate(100%, 0)";
    }
});

// Функция сворачивания навигационного окна при адаптивном переходе
window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
        menu.style = "none";
        navButton.checked = false;
    }
});

// Отслеживание нажатий кнопок навигации для сворачивания окна навигации
let buttons = document.querySelectorAll(".nav-btn");
for (let index = 0; index < buttons.length; index++) {
    let button = buttons[index];
    button.addEventListener('click', function (event) {
        console.log('click');
        if (window.innerWidth <= 800) {
            setTimeout(() => {
                menu.style.transform = "translate(100%, 0)";
                navButton.checked = false;
                event.preventDefault();
            }, 10);
            
        }
    });
}