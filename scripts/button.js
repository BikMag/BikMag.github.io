"use strict"

// var x, y;

// document.querySelector('.block').onmousemove = function(event) {
//     event = event || window.event; // кроссбраузерность
//     // console.log(event); // вывод в консоль
//     x = document.querySelector('.x').innerHTML = event.offsetX;
//     y = document.querySelector('.y').innerHTML = event.offsetY;
//     alert(x);
// }

var pressed = false;

function changeColor(_this) {
    if (_this.style.backgroundColor == 'red') {
        pressed = false;
        _this.style.backgroundColor = 'lightgray';
        _this.style.color = 'black';
        _this.style.borderColor = 'black';
    } else {
        pressed = true;
        _this.style.backgroundColor = 'red';
        _this.style.color = 'white';
        _this.style.borderColor = 'white';
    }
}

document.body.addEventListener('mousemove', (e) => {
    if (pressed) {
        const img = document.createElement("img");
        img.src = "favicon.ico";
        img.style.position = "absolute";
        img.style.pointerEvents = "none";
        document.body.appendChild(img);

        img.style.top = e.pageY - img.height / 2 + "px";
        img.style.left = e.pageX - img.width / 2 + "px";
    }
});
