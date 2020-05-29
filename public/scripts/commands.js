q = document.querySelector.bind(document);
qAll = document.querySelectorAll.bind(document);
c = document.createElement.bind(document);
n = document.getElementsByClassName.bind(document);

var Command = {};

// window.onbeforeunload = function() {
//     if (Object.entries(Command).length) {
//         return true
//     };
// };

axios.get('/json/commands.json').then(res => {
    var loc = window.location.pathname.replace("/", "");
    var cmd = res.data[loc];

    // Position module
    if (cmd.position) {
        var pos = ["posX", "posY", "posZ"]
        pos.forEach(x => {
            q("." + x).addEventListener("input", () => {
                Command[x] = q("." + x).value;
            });
            
            q(".clear").addEventListener("click", () => {
                q("." + x).value = "";
                Command[x] = q("." + x).value;
            });

            qAll(".positioning").forEach(item => {
                item.addEventListener("click", e => {
                    var o = e.target.id;
                    var posb = [["^", "~"], ["~", "^"]];
                    if (!Command[x]) {
                        Command[x] = posb[o][0]
                    } else if (!Command[x].includes(posb[o][0]) && !Command[x].includes(posb[o][1])) {
                        Command[x] = posb[o][0] + Command[x]
                    } else if (Command[x].includes(posb[o][0])) {
                        Command[x] = Command[x].replace(posb[o][0], "");
                    } else {
                        Command[x] = Command[x].replace(posb[o][1], posb[o][0]);
                    }
                    q("." + x).value = Command[x]
                });
            });

            function splitPaste() {
                navigator.clipboard.readText()
                    .then(cliptext => {
                        var args = cliptext.split(' ');
                        if (args[pos.indexOf(x)]) {
                            q("." + x).value = args[pos.indexOf(x)]
                            Command[x] = args[pos.indexOf(x)]
                        }  
                    });
            };
            q(".paste-button").addEventListener("click", splitPaste)
            q("." + x).addEventListener("paste", splitPaste);
        });
    };

    // Block module
    if (cmd.block) {
        q(".search-blocks").addEventListener("input", () => {
            search(".blocks-dropdown", ".search-blocks", '/json/blocks.json', "block");
        });
        search(".blocks-dropdown", ".search-blocks", '/json/blocks.json', "block");
    };

    // Command updater
    addEventListener("keydown", deleteProp);
    addEventListener("click", deleteProp);

    function deleteProp() {
        for (const prop in Command) {
            if (Command[prop] == "") {
                delete Command[prop];
            };
        };
    };

    function updateCommand() {
        q("")
    }
});

q(".copy").addEventListener("click", () => {
    q(".command-output").select();
    document.execCommand('copy');
});

function setBlock(block) {
    q(".blocks-button").innerHTML = block
    if (block !== "Unset") {
        Command.block = block
    } else {
        Command.block = ""
    }
};