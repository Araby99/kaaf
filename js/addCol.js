const addColBtn = document.getElementById("addColBtn")
const addColumn = () => {
    for (const [i, row] of [...document.querySelectorAll('#table tr')].entries()) {
        const cell = document.createElement(i ? "td" : "th");
        if (i == 0) {
            cell.innerHTML = "عمود إضافي";
        }
        row.appendChild(cell)
    };
}

addColBtn.onclick = () => addColumn()