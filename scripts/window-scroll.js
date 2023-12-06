"use strict"

window.addEventListener("scroll", () => {
    let sections = document.querySelectorAll("section");
    for (let cardBlock of sections) {
        let targetY = cardBlock.offsetTop;
        if (window.scrollY >= targetY - window.innerHeight / 1.3) {
            cardBlock.style.transition = "all .8s";
            cardBlock.style.transform = "translate(0, 0)";
            cardBlock.style.opacity = "1";
        }
        else if (window.scrollY <= targetY - window.innerHeight) {
            cardBlock.style.transition = "none";
            cardBlock.style.transform = "translate(0, 100px)";
            cardBlock.style.opacity = "0";
        }
    }
});