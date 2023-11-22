"use strict"
// burger menu
const navButton = document.querySelector("input");
const menu = document.querySelector("#menu");

navButton.addEventListener("change", () => {
    if (navButton.checked) {
        menu.style.transform = "none";
    } else {
        menu.style.transform = "translate(100%, 0)";
    }
});