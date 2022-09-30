const dateInput = document.getElementsByClassName("dateInput");
const dateBtn = document.getElementsByClassName("dateBtn");

for (let i = 0; i < dateInput.length; i++) {
    dateBtn[i].onclick = () => dateInput[i].click();
}