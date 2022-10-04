const item = document.getElementsByClassName("item");
const setting = document.getElementById("setting");
const settingItems = document.getElementById("settingItems");
const trace = document.getElementById("trace");
const close = document.getElementById("close");
const links = document.getElementById("links");
const open = document.getElementsByClassName("bars")[0];
const userData = document.getElementById("userData");
const userAction = document.getElementById("userAction");

setting.onmouseover = () => {
    if (!setting.classList.contains("active")) {
        settingItems.style.display = "block";
    }
}
setting.onmouseout = () => {
    if (!setting.classList.contains("active")) {
        settingItems.style.display = "none";
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