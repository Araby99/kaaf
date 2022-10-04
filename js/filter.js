let filter = true
const toggleFilter = document.getElementById("toggleFilter");
const filterItems = document.getElementById("filterItems");
toggleFilter.onclick = () => {
    if (filter) {
        filterItems.style.display = "none";
        filter = false
    } else {
        filterItems.style.display = "flex";
        filter = true
    }
}