const password = document.getElementById("password");
const repeatPassword = document.getElementById("repeatPassword");
const validateForm = document.getElementById("validateForm");
const match = document.getElementsByClassName("match");
const formInput = document.getElementsByClassName("formInput");
let passNum = 0;
let formStatue = true;

const checkPass = () => {
    for (let i = 0; i < formInput.length; i++) {
        if (formInput[i] === repeatPassword) {
            passNum = i;
        }
    }
    if (repeatPassword.value !== "") {
        if (repeatPassword.value !== password.value) {
            repeatPassword.style.border = "solid 1px #FF1343";
            password.style.border = "solid 1px #FF1343";
            match[passNum].style.display = "block";
            formStatue = false;
        } else {
            repeatPassword.style.border = "none";
            password.style.border = "none";
            match[passNum].style.display = "none";
        }
    }
}
const check = () => {
    checkPass;
    for (let i = 0; i < formInput.length; i++) {
        if (formInput[i].value === "") {
            formInput[i].style.border = "solid 1px #FF1343";
            match[i].style.display = "block";
            formStatue = false;
        }
    }
    if (!formStatue) {
        return false
    }
}
for (let i = 0; i < formInput.length; i++) {
    formInput[i].onchange = () => {
        if (formInput[i].value === "") {
            formInput[i].style.border = "solid 1px #FF1343";
            match[i].style.display = "block";
        } else {
            formInput[i].style.border = "none";
            match[i].style.display = "none";
        }
    }
}
repeatPassword.onchange = checkPass;
password.onchange = checkPass;
validateForm.onsubmit = check;