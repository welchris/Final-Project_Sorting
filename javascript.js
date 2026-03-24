const apiUrl = 'https://api.jikan.moe/v4/anime'; 
let allItems = []; 

async function fetchItems() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const items = await response.json();
        allItems = items.data; 
        displayItems(allItems); 
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function searchItems(query) {
    const filteredItems = allItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
    );
    displayItems(filteredItems); 
}

function displayItems(items) {
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = ""; 
    items.forEach(item => {
        const li = document.createElement("li");
        
        const img = document.createElement("img");
        img.src = item.images.jpg.image_url; 
        img.alt = item.title; 
        img.style.width = "50px"; 
        img.style.height = "auto"; 
        
        li.appendChild(img);
        li.appendChild(document.createTextNode(` ${item.title} - ${item.score.toFixed(1)}`)); 
        
        itemList.appendChild(li);
    });
}


function sortByTitleAscending(items) {
    return items.sort((a, b) => a.title.localeCompare(b.title));
}

function sortByTitleDescending(items) {
    return items.sort((a, b) => b.title.localeCompare(a.title));
}

function sortByRatingAscending(items) {
    return items.sort((a, b) => a.score - b.score);
}

function sortByRatingDescending(items) {
    return items.sort((a, b) => b.score - a.score);
}


document.addEventListener("DOMContentLoaded", fetchItems);


document.getElementById("searchButton").addEventListener("click", function() {
    const searchQuery = document.getElementById("searchBar").value; 
    searchItems(searchQuery); 
});


document.getElementById("searchBar").addEventListener("keydown", function(event) {
    if (event.key === "Enter") { 
        const searchQuery = this.value; 
        searchItems(searchQuery); 
    }
});


document.getElementById("searchBar").addEventListener("input", function() {
    const searchQuery = this.value; 
    if (searchQuery === "") { 
        fetchItems(); 
    } else {
        searchItems(searchQuery); 
    }
});


document.getElementById("sortSelect").addEventListener("change", function() {
    const selectedValue = this.value;
    let sortedItems;

    switch (selectedValue) {
        case "titleAsc":
            sortedItems = sortByTitleAscending(allItems);
            break;
        case "titleDesc":
            sortedItems = sortByTitleDescending(allItems);
            break;
        case "ratingAsc":
            sortedItems = sortByRatingAscending(allItems);
            break;
        case "ratingDesc":
            sortedItems = sortByRatingDescending(allItems);
            break;
        default:
            sortedItems = allItems; 
    }

    displayItems(sortedItems);
});

let debounceTimer;
document.getElementById("searchBar").addEventListener("input", function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const searchQuery = this.value;
        if (searchQuery === "") {
            fetchItems(); 
        } else {
            searchItems(searchQuery); 
        }
    }, 300); 
});



