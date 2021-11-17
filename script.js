class Line {
    constructor(text) {
        this.text = text;
        this.length = text.length;
        this.growing = false;
        this.delay = 7;
    }
    update() {
        if (this.length >= this.text.length && this.delay <= 0) this.growing = false;
        else if (this.length >= this.text.length) this.delay--;
        else if (this.length <= 0) {
            this.growing = true;
            this.delay = 10;
        }
        this.length += this.growing ? 3 : -2;
        return this.text.substring(0, this.length);
    }
}

const consoles = [];
for (consoleElem of document.getElementsByClassName("console")) {
    consoles.push({
        id: consoleElem.id,
        lines: consoleElem.innerText.split("\n").map(str => {
            return new Line(str)
        }),
        ignoreLines: consoleElem.getAttribute("ignoreLines").split(" "),
    });
}

window.consoleInterval = setInterval(() => {
    for (c of consoles) {
        let final = "";
        for (line in c.lines) {
            if (c.ignoreLines.includes("" + line)) final = final + c.lines[line].text + "\n";
            else final = final + c.lines[line].update() + "\n";
        }
        document.getElementById(c.id).innerText = final;
    }
}, 100);

const elem = document.getElementById("githubelem");
let on = false;
elem.onmouseover = () => {
    on = true;
}

elem.onmouseleave = () => {
    on = false;
}

window.moverInterval = setInterval(() => {
    if (!on) return;
    elem.style.left = (Math.random() < .5 ? -1 : 1) * Math.floor(Math.random() * 120) + "px";
    elem.style.top = (Math.random() < .5 ? -1 : 1) * Math.floor(Math.random() * 40) + "px";
    clearTimeout(window.returnInterval);
    window.returnInterval = setTimeout(() => {
        elem.style.left = 0;
        elem.style.top = 0;
    }, 1000);
}, 50);