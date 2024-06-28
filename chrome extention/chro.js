class LRUCache {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return null;
        const value = this.cache.get(key);
        // Move to the end to show that it was recently used
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size === this.maxSize) {
            // Remove the first (least recently used) item
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key, value);
    }

    values() {
        return Array.from(this.cache.values());
    }

    reset() {
        this.cache.clear();
    }
}

// Use the LRU cache class in your script
let leads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

// Create an LRU cache instance with a max size of 5 items
const cache = new LRUCache(5);

// Load leads from localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("leads"));
if (leadsFromLocalStorage) {
    leadsFromLocalStorage.forEach(lead => cache.set(lead, lead));
    render(cache.values());
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        addLead(tabs[0].url);
    });
});

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    cache.reset();
    render([]);
});

inputBtn.addEventListener("click", function() {
    addLead(inputEl.value);
    inputEl.value = "";
});

function addLead(lead) {
    if (!cache.get(lead)) {
        cache.set(lead, lead);
    }
    localStorage.setItem("leads", JSON.stringify(cache.values()));
    render(cache.values());
}

function render(myleads) {
    let listItems = "";
    for (let i = 0; i < myleads.length; i++) {
        listItems += `
            <li>
                <a href="#" onclick="linkClickHandler('${myleads[i]}')">${myleads[i]}</a>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
}

function linkClickHandler(link) {
    // Update the cache when a link is clicked
    cache.get(link);
    cache.set(link, link);
    localStorage.setItem("leads", JSON.stringify(cache.values()));
    render(cache.values());
    window.open(link, '_blank');
}
