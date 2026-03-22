const items = [
    { name: "Attack on Titan", rating: 4.5 },
    { name: "Demon Slayer: Kimetsu no Yaiba: Mugen Train", rating: 4.5 },
    { name: "Frieren: Beyond Journey's End", rating: 5.0 },
    { name: "Jujutsu Kaisen", rating: 2.0 },
    { name: "Solo Leveling", rating: 5.0 },
    { name: "That Time I Got Reincarnated as a Slime", rating: 4.5 },
];

function displayItems(items) {
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = ""; 
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.rating.toFixed(1)}`;
        itemList.appendChild(li);
    });
}

function sortItems() {
    const sortOption = document.getElementById("sortOptions").value;
    let sortedItems = [...items]; 

    if (sortOption === "name") {
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "nameReverse") {
        sortedItems.sort((a, b) => b.name.localeCompare(a.name)); 
    } else if (sortOption === "rating") {
        sortedItems.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "ratingReverse") {
        sortedItems.sort((a, b) => a.rating - b.rating);
    }

    displayItems(sortedItems);
}

document.addEventListener("DOMContentLoaded", () => {
    displayItems(items);
    document.getElementById("sortOptions").addEventListener("change", sortItems);
});