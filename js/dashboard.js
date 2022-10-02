const item = document.getElementsByClassName("item");
const itemArrow = document.getElementsByClassName("itemArrow");
const setting = document.getElementById("setting");
const settingItems = document.getElementById("settingItems");
const settingArrow = document.getElementById("settingArrow");
const trace = document.getElementById("trace");
const close = document.getElementById("close");
const links = document.getElementById("links");
const open = document.getElementsByClassName("bars")[0];
const userData = document.getElementById("userData");
const userAction = document.getElementById("userAction");

for (let i = 0; i < item.length; i++) {
    if (item[i].classList.contains("active")) {
        itemArrow[i].src = "../assets/icons/blue-arrow.svg";
    }
    item[i].onmouseover = () => {
        itemArrow[i].src = "../assets/icons/blue-arrow.svg";
    }
    item[i].onmouseout = () => {
        if (!item[i].classList.contains("active")) {
            itemArrow[i].src = "../assets/icons/white-arrow.svg";
        }
    }
}
setting.onmouseover = () => {
    if (!setting.classList.contains("active")) {
        settingItems.style.display = "block";
        settingArrow.src = "../assets/icons/blue-arrow.svg";
    }
}
setting.onmouseout = () => {
    if (!setting.classList.contains("active")) {
        settingItems.style.display = "none";
        settingArrow.src = "../assets/icons/white-arrow.svg";
    }
}
const traceText = trace.innerText.split(">");
trace.innerHTML = traceText.map((e, index) => index == 0 ? `<span class="grey-trace">${e}</span>` : e).join(">");


close.onclick = () => {
    if (window.innerWidth <= 1200) {
        links.style.width = "0";
        links.style.padding = "0";
    }
}
open.onclick = () => {
    if (window.innerWidth <= 1200) {
        links.style.width = "100%";
        links.style.padding = "20px";
    }
}
window.onresize = () => {
    if (window.innerWidth >= 1200) {
        links.style.padding = "20px";
    } else if (links.style.width == "100%") {
        links.style.padding = "20px";
    } else {
        links.style.padding = "0";
    }
}

let userOpen = false
userData.onclick = () => {
    if (userOpen) {
        userAction.style.display = "none";
        userOpen = false
    } else {
        userAction.style.display = "flex";
        userOpen = true
    }
}