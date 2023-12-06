"use strict"

const WIDTH = 200, HEIGHT = 200;

// Создаем элемент
const item = document.createElement("div");
item.innerHTML = `<img src="/images/Ind.jpg" width=${WIDTH} height=${HEIGHT}>`;
item.style.position = "fixed";
item.style.backgroundColor = "red";
item.style.padding = "5px";
item.style.cursor = "pointer";
document.body.append(item);

// Центрируем его
item.style.top = (window.innerHeight - item.offsetHeight) / 2  + "px";
item.style.left = (document.body.clientWidth - item.offsetWidth) / 2 + "px";

// Центрируем при изменении размеров экрана
window.addEventListener("resize", () => {
    item.style.top = (window.innerHeight - item.offsetHeight) / 2  + "px";
    item.style.left = (document.body.clientWidth - item.offsetWidth) / 2 + "px";
});

// Закрываем изображение при нажатии на него
item.onclick = () => {item.remove()};