let filter = true
const toggleFilter = document.getElementById("toggleFilter");
const toggleImg = document.getElementById("toggleImg");
const filterItems = document.getElementById("filterItems");
toggleFilter.onclick = () => {
    if (filter) {
        toggleImg.src = "../assets/icons/arrow-down.svg";
        filterItems.style.display = "none";
        filter = false
    } else {
        toggleImg.src = "../assets/icons/arrow-up.svg";
        filterItems.style.display = "flex";
        filter = true
    }
}