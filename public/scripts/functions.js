function search(dropdown, searchbar, JSON, className) {
    q(dropdown).innerHTML = "";

    // Get JSON
    axios.get(JSON).then(res => {
        var searchElement = Object.keys(res.data);
        for (var i = 0; i < searchElement.length; i++) {

            // Check if matches
            if (searchElement[i].match(q(searchbar).value.toLowerCase().replace(/ /gi, "_").replace("minecraft:", ""))) {

                // Create dropdown item
                found = searchElement[i];
                var format = capitalize(found.replace(/_/gi, " "));
                var a = c("a");
                a.addEventListener("click", x => {
                    setBlock(x.target.innerHTML)
                });
                a.innerHTML = format;
                a.className = "dropdown-item " + className;
                q(dropdown).appendChild(a);
            };
        };
    });
}

function upperCase(str) {
    return str.toUpperCase();
};

function capitalize(str) {
    var firstLetterRx = /(^|\s)[a-z]/g;
    return str.replace(firstLetterRx, upperCase);
};