q = document.querySelector.bind(document)

function onLoad() {
    try {
        q("#dark-mode").checked = JSON.parse(localStorage.getItem("dark-mode"));
        darkMode(JSON.parse(localStorage.getItem("dark-mode")));
    } catch (error) {
        localStorage.setItem("dark-mode", false)
    }
}

document.addEventListener("click", element => {
    if (!q(".settings").contains(element.target) && element.target !== q(".settings-icon")) {
        closeSettings()
    }
})

q(".settings-icon").addEventListener("click", showSettings)

function closeSettings() {
    $(".settings").hide()
}

function showSettings() {
    $(".settings").show()
}

q("#dark-mode").addEventListener("click", () => {
    localStorage.setItem("dark-mode", q("#dark-mode").checked)
    darkMode(q("#dark-mode").checked)
})

function darkMode(isOn) {
    q(".night-mode-link").disabled = !isOn
}
onLoad()