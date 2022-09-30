const openQr = document.getElementById("openQr");
const barcode = document.getElementById("barcode");
const overlay = document.getElementById("overlay");

openQr.onclick = () => {
    barcode.style.display = "block";
    overlay.style.display = "block";
}
overlay.onclick = () => {
    barcode.style.display = "none";
    overlay.style.display = "none";
}