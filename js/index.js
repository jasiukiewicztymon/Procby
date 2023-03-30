var timer = null;
var min = 0, sec = 0, msc = 0;
function startClock() {
    timer = setInterval(() => {
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
    }, 10);
}

var levels = [
    [
        [{ left: true },{ bottom: true },{ bottom: true },{  },{ star: true },{  },{  },{  },{  },{  },{ bottom: true, left: true },{ bottom: true },{  }],
        [{  },{  },{ star: true },{  },{  },{ star: true },{  },{  },{  },{ bottom: true },{ bottom: true },{  },{ left: true }],
        [{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{ bottom: true },{ bottom: true }],
        [{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{  },{ left: true },{  }],
        [{  },{  },{  },{ star: true },{  },{ top: true, right: true },{  },{  },{  },{  },{  },{ left: true },{ left: true }],
        [{  },{  },{  },{  },{  },{  },{ bottom: true },{ bottom: true },{ bottom: true },{  },{  },{  },{ left: true }],
        [{  },{  },{  },{  },{  },{ star: true },{  },{  },{  },{  },{  },{  },{  }],
        [{  },{  },{  },{ star: true },{  },{  },{  },{  },{  },{  },{  },{  },{ end: true }],
    ]
]

var lvl = 0, isMoving = null, starCounter = 0; 
var x = 0, y = 0;

function check() {
    let target = document.querySelectorAll('.row')[y].querySelectorAll('.row > *')[x];
    let star = target.querySelector('.star'), end = target.querySelector('.end');
    if (star) {
        target.removeChild(star)
        if (starCounter < 5)
            document.querySelector('#starbox').querySelectorAll('span')[starCounter].style.color = '#fff';
        starCounter++;
    }
    if (end) {
        clearInterval(timer);
        document.querySelector('#scoremsg').style.display = 'flex';
        document.querySelector('#starcount').innerHTML = starCounter;
        document.querySelector('#finaltime').innerHTML = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}:${msc < 10 ? '0' : ''}${msc}`;
    }
}

async function key($event) {
    if (isMoving + 100 < new Date().getTime()) {
        switch ($event.code) {
            case "KeyW":
            case "ArrowUp":
                if (!timer)
                    startClock()
                if (y > 0) {
                    let ok = true;
                    if (levels[lvl][y][x].top && levels[lvl][y][x].top == true)
                        ok = false;
                    if (y > 0 && levels[lvl][y - 1][x].bottom && levels[lvl][y - 1][x].bottom == true)
                        ok = false;
                    
                    if (ok) {
                        document.querySelector("#dino").style.top = `${document.querySelector("#dino").offsetTop - 50}px`;
                        isMoving = new Date().getTime();
                        y--;
                        check()
                    }
                }
                break;
            case "KeyA":
            case "ArrowLeft":
                if (!timer)
                    startClock()
                if (x > 0) {
                    let ok = true;
                    if (levels[lvl][y][x].left && levels[lvl][y][x].left == true)
                        ok = false;
                    if (x > 0 && levels[lvl][y][x - 1].right && levels[lvl][y][x - 1].right == true)
                        ok = false;

                    if (ok) {
                        document.querySelector("#dino").style.transform = 'scaleX(-1)';
                        document.querySelector("#dino").style.left = `${document.querySelector("#dino").offsetLeft - 50}px`;
                        isMoving = new Date().getTime();
                        x--;
                        check()
                    }
                }
                break;
            case "KeyS":
            case "ArrowDown":
                if (!timer)
                    startClock()
                if (y < levels[lvl].length - 1) {
                    let ok = true;
                    if (levels[lvl][y][x].bottom && levels[lvl][y][x].bottom == true)
                        ok = false;
                    if (y < levels[lvl].length - 2 && levels[lvl][y + 1][x].top && levels[lvl][y + 1][x].top == true)
                        ok = false;

                    if (ok) {
                        document.querySelector("#dino").style.top = `${document.querySelector("#dino").offsetTop + 50}px`;
                        isMoving = new Date().getTime();
                        y++;
                        check()
                    }
                }
                break;
            case "KeyD":
            case "ArrowRight":
                if (!timer)
                    startClock()
                if (x < levels[lvl][0].length - 1) {
                    let ok = true;
                    if (levels[lvl][y][x].right && levels[lvl][y][x].right == true)
                        ok = false;
                    if (x < levels[lvl][y].length - 2 && levels[lvl][y][x + 1].left && levels[lvl][y][x + 1].left == true)
                        ok = false;

                    if (ok) {
                        document.querySelector("#dino").style.transform = 'scaleX(1)';
                        document.querySelector("#dino").style.left = `${document.querySelector("#dino").offsetLeft + 50}px`;
                        isMoving = new Date().getTime();
                        x++;
                        check()
                    }
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

for (let i = 0; i < levels[lvl].length; i++) {
    for (let j = 0; j < levels[lvl][i].length; j++) {
        if (levels[lvl][i][j].star && levels[lvl][i][j].star == true) 
            document.querySelectorAll('.row')[i].querySelectorAll('div')[j].innerHTML = '<div class="star"></div>';
        if (levels[lvl][i][j].end && levels[lvl][i][j].end == true) 
            document.querySelectorAll('.row')[i].querySelectorAll('div')[j].innerHTML = '<div class="end"></div>';
    }
}