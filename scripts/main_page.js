"use strict"

const database = {
    Volga: {
        name: "Волга",
        country: "Россия",
        picture: "images/Volga_.jpg"
    },
    Don: {
        name: "Дон",
        country: "Россия",
        picture: "images/Don_.jpg"
    },
    HuangHe: {
        name: "Хуанхэ",
        country: "Китай",
        picture: "images/HuangHe_.jpg"
    },
    Nil: {
        name: "Нил",
        country: "Египет",
        picture: "images/Nil.jpg"
    },
    Amazonka: {
        name: "Амазонка",
        country: "Бразилия",
        picture: "images/Amazonka.jpg"
    },
    Missisipi: {
        name: "Миссисипи",
        country: "США",
        picture: "images/Missisipi.jpg"
    },
    Ind: {
        name: "Инд",
        country: "Индия",
        picture: "images/Ind.jpg"
    }
};

let count = 0;
let countField = document.querySelector(".wishlist-btn");
countField.setAttribute("count", count);
let acc = new Accumulator(5);

// acumulate storage
function Accumulator(startingValue) {
    // this.value = startingValue;
    if (localStorage['wishlist'] != undefined) {
        console.log("save data");
        this.wishlist = JSON.parse(localStorage.getItem('wishlist'));
        count = this.wishlist.length;
        countField.setAttribute("count", count);
    } else {
        this.wishlist = [];
    }

    this.read = function(sign) {
        count += sign;
        countField.setAttribute("count", count);
    };

    this.addToArray = function(riverID) {
        const item = {
            id: riverID,
            name: database[riverID].name,
            country: database[riverID].country,
            picture: database[riverID].picture,
            count: 1
        };
        this.wishlist.push(item);
        
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));

        this.read(1);
    };

    this.deleteFromArray = function(riverID) {
        let res = this.wishlist.find(item => item.id == riverID);
        this.wishlist.splice(this.wishlist.indexOf(res), 1);

        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));

        this.read(-1);
    };
}

function plusCount(_this) {
    let riverID = _this.parentNode.parentNode['id'];
    console.log(riverID);
    const index = acc.wishlist.find(item => item.id == riverID);
    index.count += 1;

    const countImput = document.getElementById(riverID).querySelector(".count-input");
    countImput.value = index.count;

    localStorage.setItem('wishlist', JSON.stringify(acc.wishlist));
}

function minusCount(_this) {
    let riverID = _this.parentNode.parentNode['id'];
    const index = acc.wishlist.find(item => item.id == riverID);
    if (index.count > 1) {
        index.count -= 1;
        const countImput = document.getElementById(riverID).querySelector(".count-input");
        countImput.value = index.count;

        localStorage.setItem('wishlist', JSON.stringify(acc.wishlist));
    } else {
        acc.deleteFromArray(riverID);
        createWishList();
    }
}

function deleteItem(_this) {
    let riverID = _this.parentNode['id'];
    acc.deleteFromArray(riverID);
    createWishList();
}

// create cart (wishlist)
const createWishList = function(wishlist = acc.wishlist) {
    console.log(wishlist);
    let containers = '<h2>Понравившиеся реки</h2>';
    if (wishlist.length == 0) {
        containers += '<i>Тут ничего нет</i>';
    } else {
        for (let item of wishlist) {
            const container = `
            <article id="${item.id}" class="item template">
                <h1>Река ${item.name} (${item.country})</h1>
                <img src="${item.picture}" width="200">
                <div class="controller">
                    <button class="minus-btn" onclick="minusCount(this)">-</button>
                    <input class="count-input" type="number" value="${item.count}" readonly>
                    <button class="plus-btn" onclick="plusCount(this)">+</button>
                </div>
                <button class="del-btn" onclick="deleteItem(this)"><img src="images/trash.png"></button>
            </article>
            `;
            containers += container;
        }
    }
    
    wishSection.innerHTML = containers;
};

const wishSection = document.querySelector(".wishlist");
if (wishSection !== null) {
    createWishList();
    sumPoints();
} else {
    checkLikedButtons()
}

// Фильтрация
function filterItems() {
    const value = document.querySelector(".filter-input").value;
    const direction = document.querySelector(".filter-mode").checked;
    if (value != '') {
        const newArr = acc.wishlist.filter((item) => {
            if (direction)
                return item.count >= value;
            return item.count <= value;
        });
        console.log(newArr);
        createWishList(newArr);
    }
}

// Сортировка
function compare(a, b) {
    if (a.count > b.count) return 1;
    if (a.count == b.count) return 0;
    if (a.count < b.count) return -1;
}

function upsort() {
    acc.wishlist.sort(compare);
    console.log(acc.wishlist);
    createWishList();
}

function downsort() {
    acc.wishlist.sort(compare).reverse();
    console.log(acc.wishlist);
    createWishList();
}

// Для кнопки 'Лайк'
function accumulate(_this) {
    let riverID = _this.parentNode['id'];
    if (_this.style.backgroundColor == 'red') {
        _this.style.backgroundColor = '#9c9b9bcc';
        _this.children[0].style.filter = 'none';
        acc.deleteFromArray(riverID);
    } else {
        _this.style.backgroundColor = 'red';
        _this.children[0].style.filter = 'invert()';
        acc.addToArray(riverID);
    }
    
    console.log(acc.wishlist);
}

function checkLikedButtons() {
    const buttons = document.querySelectorAll('.like-btn');
    for (let button of buttons) {
        if (acc.wishlist.includes(acc.wishlist.find((item) => item.id == button.parentNode['id']))) {
            button.style.backgroundColor = 'red';
            button.children[0].style.filter = 'invert()';
        }
    }
}

// cut text
let cards = document.querySelectorAll('.wrapper p');

for (const card of cards) {
    card.innerHTML = truncate(card.innerHTML, 40);
}

function truncate(str, maxlength) {
    return (str.length > maxlength) ? 
        str.slice(0, maxlength - 1) + '…' : str;
}

// Сумма баллов
function sumPoints() {
    let sum = 0;
    for(let item of acc.wishlist) {
        sum += item.count;
    }

    const pointsCounter = document.querySelector(".points");
    pointsCounter.textContent = sum;
}

document.onclick = event => {
    // console.log(event.target.classList);
    if (document.querySelector(".wishlist") !== null)
        sumPoints();
}
