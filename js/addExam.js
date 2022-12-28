let data = [
    {
        classe_id: null,
        subject_id: null,
        degree_directive_id: null,
        duration: null,
        date: null,
        choose_students: null,
        groups: null,
        image: null,
        questions: []
    },
]
let studentsData = []

const handleDelete = e => console.log(e);
const questionsContainer = document.getElementById("questions");
const addQuestion = document.getElementById("addQuestion");
const addAnswer = document.getElementById("addAnswer");
const examForm = document.getElementById("examForm");
const studentAdded = document.getElementById("studentAdded");
const students = document.getElementById("students");
const studentTitle = document.getElementById("studentTitle");
const studentId = document.getElementById("studentId");
const add = document.getElementsByClassName("add")[0];
const addQuestionForm = document.getElementById("addQuestionForm");
const addAction = document.getElementsByClassName("add-action")[0];
const overlay = document.getElementsByClassName("overlay")[0];
const checkAnswer = document.getElementsByClassName("check-answer");
const answer = document.getElementsByClassName("answer");
const removeAnswer = document.getElementsByClassName("removeAnswer");

const removeQuestion = id => {
    data[0].questions.splice(id, 1)
    fetchQuestion();
}

const fetchStudents = () => {
    students.innerHTML = "";
    if (studentsData.length > 0) {
        studentTitle.innerHTML = "الطلاب التي أُضيفت";
    } else {
        studentTitle.innerHTML = "";
    }
    for (let i = 0; i < studentsData.length; i++) {
        students.innerHTML += `
            <li>
                <span>${studentsData[i]}</span>
                <div class="remove"><i class="fas fa-times text-danger" onclick="removeStudent(${i})"></i></div>
            </li>
        `
    }
}
fetchStudents();

const removeStudent = i => {
    studentsData.splice(i, 1)
    fetchStudents();
}
add.onclick = () => {
    if (studentId.value.trim() !== "") {
        studentsData.push(studentId.value)
        studentId.value = "";
        fetchStudents()
    }
}
const checks = () => {
    for (let i = 0; i < checkAnswer.length; i++) {
        if (checkAnswer[i].getAttribute("data-check") == "true") {
            checkAnswer[i].children[0].style.display = "block";
            checkAnswer[i].children[1].style.display = "none";
        } else {
            checkAnswer[i].children[0].style.display = "none";
            checkAnswer[i].children[1].style.display = "block";
        }
        checkAnswer[i].onclick = () => {
            if (checkAnswer[i].getAttribute("data-check") == "true") {
                checkAnswer[i].setAttribute("data-check", "false")
                checkAnswer[i].children[0].style.display = "none";
                checkAnswer[i].children[1].style.display = "block";
            } else {
                checkAnswer[i].setAttribute("data-check", "true")
                checkAnswer[i].children[0].style.display = "block";
                checkAnswer[i].children[1].style.display = "none";
            }
        }
    }
}
checks()
const fetchQuestion = () => {
    questionsContainer.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].questions.length; j++) {
            questionsContainer.innerHTML += `
                <div class="col-lg-6 col-sm-12 rounded question flex-column gap-3 p-4">
                    <div class="title justify-content-between w-100">
                        <div class="d-flex gap-3 align-items-center">
                            <div class="number">${j + 1}</div>
                            <p class="m-0">${data[i].questions[j].title}</p>
                        </div>
                        <div
                            class="remove bg-danger text-light rounded-circle d-flex justify-content-center align-items-center" onclick="removeQuestion(${j})">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
                    <p class="desc m-0">${data[i].questions[j].description}</p>
                    <div class="answers">
                        <div class="answer d-flex gap-3 flex-column">
                            ${data[i].questions[j].answers.map(answer => (
                `
                                        <div>
                                            <input class="form-check-input" type="radio" name="flexRadioDefault">
                                            <label class="form-check-label">
                                                ${answer.title}
                                            </label>
                                        </div>
                                    `
            )).join("")
                }
                        </div>
                    </div>
                </div>
            `
        }
    }
}
fetchQuestion();

addAnswer.onclick = () => {
    addAnswer.parentElement.insertAdjacentHTML("beforeBegin",
        `<div class='col-lg-12 mt-3 position-relative d-flex justify-content-between align-items-center gap-2 answer'><div class='check-answer' role='button' data-check='false'><i class='fas fa-check text-success true-check'></i><i class='fas fa-times text-danger false-check'></i></div><input type='text' class='form-control' required placeholder='الإجابة' name='answer'><div role='button' class='removeAnswer d-flex justify-content-center align-items-center rounded bg-danger text-light' style='height: 30px;width: 30px;'><i class='fas fa-times'></div></div>`);
    checks();
    removeClick();
}
const removeClick = () => {
    for (let i = 0; i < removeAnswer.length; i++) {
        removeAnswer[i].onclick = () => {
            answer[i + 1].remove();
            checks();
        }
    }
}
addQuestion.onclick = () => {
    addAction.style.display = "flex";
    document.body.style.overflow = "hidden";
}
overlay.onclick = () => {
    addAction.style.display = "none";
    document.body.style.overflow = "auto";
}
const getExtension = filename => {
    let parts = filename.split('.');
    return parts[parts.length - 1];
}

const fileType = filename => {
    let ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'm4v':
        case 'avi':
        case 'mpg':
        case 'mp4':
            return 1;
    }
    switch (ext.toLowerCase()) {
        case 'jpg':
        case 'gif':
        case 'bmp':
        case 'png':
            return 2;
    }
    switch (ext.toLowerCase()) {
        case 'mp3':
        case 'wav':
            return 3;
    }
    return 0;
}

addQuestionForm.onsubmit = e => {
    e.preventDefault();
    let newQuestion = {
        title: e.target.title.value,
        description: e.target.desc.value,
        file: e.target.file.value == "" ? null : e.target.file.value,
        type: fileType(e.target.file.value),
        question: e.target.question.value,
        points_number: e.target.points.value,
        answers: []
    }
    const answers = e.target.answer;
    let answerData = []
    for (let i = 0; i < answers.length; i++) {
        let newAnswer = {
            title: answers[i].value,
            status: checkAnswer[i].getAttribute("data-check") == "true" ? 1 : 0
        }
        answerData.push(newAnswer)
    }
    newQuestion.answers = answerData;
    data[0].questions.push(newQuestion);
    addAction.style.display = "none";
    document.body.style.overflow = "auto";
    addQuestionForm.reset();
    for (let i = 0; i < answer.length; i++) {
        if (i == 0) {
            continue;
        }
        answer[i].remove()
    }
    fetchQuestion();
}

examForm.onsubmit = e => {
    e.preventDefault();
    const groups = document.getElementById("groups").title.split(",");
    const newExam = {
        classe_id: "2",
        subject_id: e.target.subject.value,
        degree_directive_id: e.target.degree_directive_id.value,
        duration: e.target.duration.value,
        date: e.target.date.value,
        choose_students: studentsData,
        groups: groups,
        image: e.target.image.value,
        questions: data[0].questions
    }
    console.log(newExam);
}