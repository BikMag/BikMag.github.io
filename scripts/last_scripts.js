"use strict"

// "условный" переход по ссылке
document.getElementById('contents').addEventListener('click', function(event) {
    let el = event.target.closest('a');
    if (el !== null) {
        let rePage = confirm('Вас перенесет на другую страницу. Хотите перейти?');
        if (!rePage) {
            event.preventDefault();
        }
    }
});

// выбор картинки в галерее
function changeImage(imageName) {
    document.getElementById('main-picture').src = imageName;
}

// выделение элемента
function toggleSelection(event) {
    if (!event.ctrlKey && !event.metaKey) {
        const items = document.querySelectorAll('#select-item li');
        items.forEach(item => {
            if (item !== event.target) {
                item.classList.remove('selected');
            }
        });
    }
    event.target.classList.toggle('selected');
}

// Слайдер
const slider = document.getElementById('slider');
const handle = document.getElementById('handle');
let isDragging = false;

handle.addEventListener('mousedown', () => {
    isDragging = true;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const sliderRect = slider.getBoundingClientRect();
        let posX = e.clientX - sliderRect.left;
        if (posX < 0) {
            posX = 0;
        } else if (posX > sliderRect.width) {
            posX = sliderRect.width;
        }
        handle.style.left = posX - handle.offsetWidth / 2 + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Перетаскивание в корзину
const products = document.querySelectorAll('.product');
const cart = document.querySelector('.wishlist-btn');
let total = 0
products.forEach(product => {
    product.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });
});

cart.addEventListener('dragover', (e) => {
    e.preventDefault();
});

const animItem = document.querySelector('.wishlist-btn img');
cart.addEventListener('drop', (e) => {
    e.preventDefault();
    const productId = e.dataTransfer.getData('text/plain');
    acc.addToArray(productId);

    animate();
});

// Анимация
function animate() {
    console.log("rotate");
    animItem.style.transform = "rotate(360deg) scale(1.3)";
    animItem.style.transition = "all 1s";
    setTimeout(() => {
        animItem.style.transform = "none";
    }, 1000);
}
