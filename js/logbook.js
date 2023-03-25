window.onload = () => {
    /* Variables */
    const tableHead = document.getElementById("tableHead");
    const tableRows = document.getElementsByClassName("tableRows");
    let rows, rowsByPage = 5, pageActive = 1;
    const pageItem = document.getElementsByClassName("page-item");
    const pageNumber = document.getElementsByClassName("page-number");
    const movePaginate = document.getElementsByClassName("move-paginate");
    const addRow = document.getElementById("addRow");
    const addColumn = document.getElementById("addColumn");
    const columnAction = document.getElementById("columnAction");
    const maxMarkInput = document.getElementsByClassName("maxMarkInput");
    const markInput = document.getElementsByClassName("markInput");
    const applyMarks = document.getElementsByClassName("applyMarks");

    /* Actions */
    const actions = () => {
        for (let i = 0; i < pageNumber.length; i++) {
            pageNumber[i].onclick = () => {
                pageActive = parseInt(pageNumber[i].children[0].innerHTML);
                changeActivePage();
            }
        }
        for (let i = 0; i < movePaginate.length; i++) {
            movePaginate[i].onclick = () => {
                if (i == 0 && pageActive > 1) {
                    pageActive--
                } else if (i == 1 && pageActive < Math.ceil(rows.length / rowsByPage)) {
                    pageActive++;
                }
                changeActivePage();
            }
        }
        for (let i = 0; i < tableRows.length; i++) {
            for (let j = 0; j < tableRows[i].children.length; j++) {
                tableRows[i].children[j].onclick = () => {
                    if (!tableRows[i].children[j].children.length) {
                        const value = tableRows[i].children[j].innerHTML;
                        const input = document.createElement("input");
                        input.value = value;
                        tableRows[i].children[j].innerHTML = "";
                        tableRows[i].children[j].appendChild(input);
                        input.addEventListener("keyup", e => {
                            if (e.key === 'Enter') {
                                tableRows[i].children[j].innerHTML = e.target.value;
                            }
                        })
                    }
                }
            }
        }
        for (let i = 0; i < tableHead.children.length; i++) {
            tableHead.children[i].onclick = () => {
                if (!tableHead.children[i].children.length) {
                    const value = tableHead.children[i].innerHTML;
                    const input = document.createElement("input");
                    input.value = value;
                    tableHead.children[i].innerHTML = "";
                    tableHead.children[i].appendChild(input);
                    input.addEventListener("keyup", e => {
                        if (e.key === 'Enter') {
                            tableHead.children[i].innerHTML = e.target.value;
                        }
                    })
                }
            }
        }
        for (let i = 0; i < applyMarks.length; i++) {
            applyMarks[i].onclick = () => {
                if (markInput[i].value > maxMarkInput[i].value) {
                    alert("mark should be lower")
                } else {
                    for (let j = 0; j < tableRows.length; j++) {
                        tableRows[j].children[i + 2].innerHTML = markInput[i].value;
                    }
                }
            }
        }
    }
    actions();

    /* Methods */
    const insertAfter = (newNode, existingNode) => existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    const createElementFromHTML = (htmlString) => {
        const div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }
    const fetchRows = () => Array.from(tableRows);
    rows = fetchRows();
    const clearRows = () => {
        while (tableRows[0]) tableRows[0].remove();
    }
    clearRows()
    const visibleRows = () => rows.filter((row, index) => index >= (pageActive - 1) * rowsByPage && index < pageActive * rowsByPage);
    const displayRow = (rowsSelected) => {
        for (let i = rowsSelected.length - 1; i >= 0; i--) insertAfter(rowsSelected[i], tableHead);
    }
    displayRow(visibleRows());
    const clearNumber = () => {
        while (pageNumber[0]) pageNumber[0].remove()
    }
    clearNumber()
    const displayNumbers = () => {
        let pages = Math.ceil(rows.length / rowsByPage);
        for (let i = pages; i > 0; i--) {
            const schema = `<li class="page-item page-number"><a class="page-link" href="javascript:void(0)">${i}</a></li>`;
            insertAfter(createElementFromHTML(schema), pageItem[0])
        }
        actions();
    }
    displayNumbers()
    const clearActivePag = () => {
        for (let i = 0; i < pageNumber.length; i++) pageNumber[i].children[0].classList.remove("active");
    }
    const changeActivePage = () => {
        clearRows();
        displayRow(visibleRows());
        clearActivePag();
        pageNumber[pageActive - 1].children[0].classList.add("active");
    }
    addRow.onclick = () => {
        const newRow = document.createElement("tr");
        newRow.classList.add("tableRows")
        for (let i = 0; i < tableHead.children.length; i++) {
            const newCell = document.createElement("td");
            newCell.innerHTML = "صف جديد"
            newRow.appendChild(newCell);
        }
        insertAfter(newRow, tableRows[tableRows.length - 1]);
        actions();
        let newRows = [];
        newRows = newRows.concat(rows.slice(0, tableRows.length - 1));
        newRows.push(newRow);
        newRows = newRows.concat(rows.slice(tableRows.length - 1))
        rows = newRows;
        clearNumber();
        displayNumbers();
    }
    addColumn.onclick = () => {
        const newTd = document.createElement("td");
        const actionSchema = '<td><div class="d-flex flex-column gap-4"><label class="container-checkbox"><input type="checkbox" checked="checked"><span class="checkmark"></span><span>ترحيل إلى نور</span></label><div class="max-mark"><input type="number" placeholder="الدرجة الكبرى" class="maxMarkInput"></div><div class="table-add"><input type="number" class="markInput"> <img src="../assets/icons/add-circle-outline.svg" class="applyMarks" alt="إضافة"> </div> </div></td>';
        newTd.appendChild(createElementFromHTML(actionSchema))
        insertAfter(newTd, columnAction.children[columnAction.children.length - 1])
        const newTh = document.createElement("th");
        newTh.innerHTML = "عمود جديد";
        insertAfter(newTh, tableHead.children[tableHead.children.length - 1])
        for (let i = 0; i < rows.length; i++) {
            const newCell = document.createElement("td")
            newCell.innerHTML = "عمود جديد";
            insertAfter(newCell, rows[i].children[rows[i].children.length - 1])
        }
        actions();
    }
}