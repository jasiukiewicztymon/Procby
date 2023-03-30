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
        [{ left: true, star: true },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  }],
        [{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  }],
        [{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  }],
        [{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  }],
        [{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  }],
        [{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  }],
        [{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  }],
        [{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  }],
    ]
]

var lvl = 0, isMoving = null, star = 0; 
var x = 0, y = 0;

function check() {
    if (levels[lvl][y][x].star) {
        star++;
    }
}

async function key($event) {
    if (isMoving + 100 < new Date().getTime()) {
        switch ($event.code) {
            case "KeyW":
            case "ArrowUp":
                if (y > 0) {
                    document.querySelector("#dino").style.top = `${document.querySelector("#dino").offsetTop - 50}px`;
                    isMoving = new Date().getTime();
                    y--;
                    check()
                }
                break;
            case "KeyA":
            case "ArrowLeft":
                if (x > 0) {
                    document.querySelector("#dino").style.transform = 'scaleX(-1)';
                    document.querySelector("#dino").style.left = `${document.querySelector("#dino").offsetLeft - 50}px`;
                    isMoving = new Date().getTime();
                    x--;
                    check()
                }
                break;
            case "KeyS":
            case "ArrowDown":
                if (y < levels[lvl].length - 1) {
                    document.querySelector("#dino").style.top = `${document.querySelector("#dino").offsetTop + 50}px`;
                    isMoving = new Date().getTime();
                    y++;
                    check()
                }
                break;
            case "KeyD":
            case "ArrowRight":
                if (x < levels[lvl][0].length - 1) {
                    document.querySelector("#dino").style.transform = 'scaleX(1)';
                    document.querySelector("#dino").style.left = `${document.querySelector("#dino").offsetLeft + 50}px`;
                    isMoving = new Date().getTime();
                    x++;
                    check()
                }
                break;
        }
    }
}

document.addEventListener("keydown", key);

var decoCounter = 7;
var xCounter = 0, yCounter = 0;

let rowCount = document.querySelectorAll('.row').length, colCount = document.querySelectorAll('.row')[0].querySelectorAll('div').length;

document.querySelectorAll('.row').forEach(row => {
    row.querySelectorAll('div').forEach(el => {
        var r = false;
        let bg = '', size = '';
        let info = levels[lvl][yCounter][xCounter];

        if (info.left || xCounter == 0) {
            bg += `${r ? ',' : ''}url("../assets/l_wall.png")`;
            size += `${r ? ',' : ''}100% 100%`;
            r = true;
        }
        if (info.right || xCounter == colCount - 1) {
            bg += `${r ? ',' : ''}url("../assets/r_wall.png")`;
            size += `${r ? ',' : ''}100% 100%`;
            r = true;
        }
        if (info.top || yCounter == 0) {
            bg += `${r ? ',' : ''}url("../assets/t_wall.png")`;
            size += `${r ? ',' : ''}100% 100%`;
            r = true;
        }
        if (info.bottom || yCounter == rowCount - 1) {
            bg += `${r ? ',' : ''}url("../assets/b_wall.png")`;
            size += `${r ? ',' : ''}100% 100%`;
            r = true;
        }

        bg += `${r ? ',' : ''}url("../assets/deco${Math.floor(Math.random() * decoCounter) + 1}.png")`;
        size += `${r ? ',' : ''}80% 80%`;

        el.style.backgroundSize = size;
        el.style.backgroundImage = bg;

        xCounter++;
    })
    xCounter = 0;
    yCounter++;
})