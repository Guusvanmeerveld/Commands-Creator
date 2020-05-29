q = document.querySelector.bind(document);
c = document.createElement.bind(document);
axios.get('/json/commands.json').then(res => {
    commands = res.data;
    commandsArr = Object.keys(res.data);
})

q(".search-input").addEventListener("input", () => {
    q(".commands-list").innerHTML = "";
    var key = q(".search-input").value;
    findResults(key);
    if (!q(".search-input").value) {
        hideSearch();
    } else {
        showSearch();
    };
})

q(".search-button").addEventListener("click", () => {
    openSearch();
});

q(".search-input").addEventListener("keyup", e => {
    if (e.keyCode == 13) {
        openSearch()
    }
})

function openSearch() {
    try {
        open(q(".commands-list").firstChild.id, "_self")
    } catch {}
}

function showSearch() {
    $(".commands").show()
}

function hideSearch() {
    $(".commands").hide()
}

function findResults(key) {
    q(".result").innerHTML = key
    commandsArr.forEach(e => {
        var match = e.match(key)
        if (match && key !== "") {
            var commandListItem = c("li")
            commandListItem.className = "list-group-item"
            commandListItem.id = e
            commandListItem.title = commands[e].desc
            commandListItem.innerHTML = e.slice(0, match.index) + "<span>" + match[0] + "</span>" + e.slice(match.index + match[0].length) + " <desc>" + commands[e].desc + "</desc>"
            commandListItem.addEventListener("click", () => {
                open(commandListItem.id, "_self")
            })
            q(".commands-list").appendChild(commandListItem)
        }
    })
}