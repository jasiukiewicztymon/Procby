var clockIsRunning = false;
function startClock() {
    clockIsRunning = true;
    let min = 0, sec = 0, msc = 0;
    setInterval(() => {
        if (msc < 99)
            msc++;
        else {
            msc = 0;
            if (sec < 59)
                sec++;
            else {
                sec = 0;
                min++;
            }
        }        

        document.querySelector("#time").innerHTML = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}:${msc < 10 ? '0' : ''}${msc}`;

        if (clockIsRunning)
            return
    }, 10);
}
startClock()

var levels = [
    [
        [{ o: [true, true, true, true], star: true },{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },
         { o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },
         { o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] }],
        [{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },
         { o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },
         { o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] }],
        [{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },
         { o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },
         { o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] }],
        [{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },
         { o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },
         { o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] }],
        [{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },
         { o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },
         { o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] }],
        [{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },
         { o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },
         { o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] }],
        [{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },
         { o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },
         { o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] }],
        [{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },
         { o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] },
         { o: [true, true, true, true] },{ o: [true, true, true, true] },{ o: [true, true, true, true] }],
    ]
]

var lvl = 0, isMoving = null, star = 0; 
var x = 0, y = 0;

function check() {
    console.log(x, y)
    console.log(levels[lvl][x][y].star)
    if (typeof levels[lvl][x][y].star != 'undefined') {
        star++;
        console.log(levels[lvl][x][y])
    }
}
async function key($event) {
    if (isMoving + 500 < new Date().getTime()) {
        switch ($event.code) {
            case "KeyW":
            case "ArrowUp":
                if (y > 0) {
                    document.querySelector("#dino").style.top = `${document.querySelector("#dino").offsetTop - 54}px`;
                    isMoving = new Date().getTime();
                    y--;
                    check()
                }
                break;
            case "KeyA":
            case "ArrowLeft":
                if (x > 0) {
                    document.querySelector("#dino").style.left = `${document.querySelector("#dino").offsetLeft - 54}px`;
                    isMoving = new Date().getTime();
                    x--;
                    check()
                }
                break;
            case "KeyS":
            case "ArrowDown":
                if (y < levels[lvl].length - 1) {
                    document.querySelector("#dino").style.top = `${document.querySelector("#dino").offsetTop + 54}px`;
                    isMoving = new Date().getTime();
                    y++;
                    check()
                }
                break;
            case "KeyD":
            case "ArrowRight":
                if (x < levels[lvl][0].length - 1) {
                    document.querySelector("#dino").style.left = `${document.querySelector("#dino").offsetLeft + 54}px`;
                    isMoving = new Date().getTime();
                    x++;
                    check()
                }
                break;
        }
    }
}

function moves() {
    document.addEventListener("keydown", key);
}
moves()

function render(lvl) {

}