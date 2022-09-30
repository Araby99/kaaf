window.onload = () => {
    let teacherActive = true;
    const teacher = document.getElementById("teacher");
    const manager = document.getElementById("manager");
    const teacher_btn = document.getElementById("teacher-btn");
    const manager_btn = document.getElementById("manager-btn");
    const passImg = document.getElementById("passImg");
    const passField = document.getElementById("passField");
    manager.style.display = "none";
    teacher_btn.onclick = () => {
        if (!teacherActive) {
            manager.style.display = "none";
            teacher.style.display = "flex";
            teacher_btn.classList.add("active");
            manager_btn.classList.remove("active");
            teacherActive = true;
        }
    }
    manager_btn.onclick = () => {
        if (teacherActive) {
            manager.style.display = "flex";
            teacher.style.display = "none";
            teacher_btn.classList.remove("active");
            manager_btn.classList.add("active");
            teacherActive = false;
        }
    }
    passImg.onclick = () => passField.type == "password" ? passField.type = "text" : passField.type = "password"
}