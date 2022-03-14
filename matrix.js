const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let cw = window.innerWidth;
let ch = window.innerHeight;

let charArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

let maxCharCount = 200;
let fontSize = 18;
let fallingCharArr = [];
let maxColumns = cw / fontSize;
canvas.width = cw;
canvas.height = ch;

let frames = 0;

class FallingChar {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        this.value = charArr[Math.floor(Math.random() * (charArr.length - 1))]
            .toUpperCase();
        this.speed = Math.random() * fontSize * 3/6 + fontSize * 3/6;
        ctx.fillStyle = "rgba(166, 10, 10, 1)";
        ctx.font = fontSize + "px san-serif";
        ctx.fillText(this.value, this.x, this.y);
        this.y += this.speed;

        if(this.y > ch) {
            this.y = Math.random() * ch / 2 - 50;
            this.x = Math.floor(Math.random() * maxColumns) * fontSize;
            this.speed = Math.random() * fontSize * 3/7 + fontSize * 3/7;
        }
    }
}

let update = () => {
    if(fallingCharArr.length < maxCharCount) {
        let fallingChar = new FallingChar(
            Math.floor(Math.random() * maxColumns) * fontSize, 
            (Math.random() * ch) /2 - 50
            );
        fallingCharArr.push(fallingChar);
    }
    ctx.fillStyle = "rgba(0,0,0,0.03)";
    ctx.fillRect(0, 0, cw, ch);
    for(let i = 0; i < fallingCharArr.length && frames % 2 == 0; i++) {
        fallingCharArr[i].draw(ctx);
    }
    requestAnimationFrame(update);
    frames++;
};
update();