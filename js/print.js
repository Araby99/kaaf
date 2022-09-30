const btn = document.getElementById("print");
const table = document.getElementById("table");

btn.onclick = () => {
    console.log(table.outerHTML);
    const newWin = window.open("");
    newWin.document.write('<html><head><title>Print it!</title><link rel="stylesheet" href="../css/global.css" media="all"><link rel="stylesheet" href="../css/dashboard-g.css" media="all"><link rel="stylesheet" href="../css/users.css" media="all"><link rel="stylesheet" href="../css/logbook.css" media="all"></head><body>')
    newWin.document.write(table.outerHTML);
    newWin.document.write('</body></html>');
    newWin.focus();
    setTimeout(() => {
        newWin.print()
    }, 100);
}