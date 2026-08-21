const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");
const bestText = document.getElementById("best");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");

const gameMessage = document.getElementById("gameMessage");
const memberGrid = document.getElementById("memberGrid");


/* =========================
   MEMBERS
========================= */

const members = [

    {
        name: "S.COUPS",
        image: "assets/members/scoups.png"
    },

    {
        name: "JEONGHAN",
        image: "assets/members/jeonghan.png"
    },

    {
        name: "JOSHUA",
        image: "assets/members/joshua.png"
    },

    {
        name: "JUN",
        image: "assets/members/jun.png"
    },

    {
        name: "HOSHI",
        image: "assets/members/hoshi.png"
    },

    {
        name: "WONWOO",
        image: "assets/members/wonwoo.png"
    },

    {
        name: "WOOZI",
        image: "assets/members/woozi.png"
    },

    {
        name: "DK",
        image: "assets/members/dk.png"
    },

    {
        name: "MINGYU",
        image: "assets/members/mingyu.png"
    },

    {
        name: "THE 8",
        image: "assets/members/the8.png"
    },

    {
        name: "SEUNGKWAN",
        image: "assets/members/seungkwan.png"
    },

    {
        name: "VERNON",
        image: "assets/members/vernon.png"
    },

    {
        name: "DINO",
        image: "assets/members/dino.png"
    }

];


/* =========================
   MEMBER SELECTION
========================= */

let selectedMember = 0;

const characterImages = [];


members.forEach((member, index) => {

    const button = document.createElement("div");

    button.className =
        "member" +
        (index === 0 ? " selected" : "");

    button.innerHTML = `
        <img src="${member.image}"
             alt="${member.name}">

        <div class="member-name">
            ${member.name}
        </div>
    `;


    const img = new Image();

    img.src = member.image;

    characterImages.push(img);


    button.addEventListener("click", () => {

        document
            .querySelectorAll(".member")
            .forEach(el =>
                el.classList.remove("selected")
            );

        button.classList.add("selected");

        selectedMember = index;

    });


    memberGrid.appendChild(button);

});


/* =========================
   CANVAS SIZE
========================= */

function resizeCanvas() {

    canvas.width =
        canvas.clientWidth;

    canvas.height =
        canvas.clientHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================
   GAME VARIABLES
========================= */

let gameRunning = false;

let paused = false;

let score = 0;

let best =
    Number(
        localStorage.getItem(
            "svtFlyBest"
        )
    ) || 0;

bestText.textContent = best;


let gravity = 0.45;

let jumpStrength = -7;

let pipeSpeed = 2.5;

let pipeGap = 165;

let pipeWidth = 65;

let pipeTimer = 0;

let pipeInterval = 100;


/* =========================
   PLAYER
========================= */

const player = {

    x: 100,

    y: 300,

    width: 65,

    height: 65,

    velocity: 0

};


/* =========================
   PIPES
========================= */

let pipes = [];


/* =========================
   START GAME
========================= */

startBtn.addEventListener(
    "click",
    startGame
);


function startGame() {

    gameRunning = true;

    paused = false;

    score = 0;

    scoreText.textContent = 0;

    pipes = [];

    player.y =
        canvas.height / 2;

    player.velocity = 0;

    pipeTimer = 0;

    gameMessage.classList.add(
        "hidden"
    );

    requestAnimationFrame(gameLoop);

}


/* =========================
   FLY
========================= */

function fly() {

    if (!gameRunning) return;

    if (paused) return;

    player.velocity =
        jumpStrength;

}


/* CLICK */

canvas.addEventListener(
    "click",
    fly
);


/* MOBILE TOUCH */

canvas.addEventListener(
    "touchstart",
    (event) => {

        event.preventDefault();

        fly();

    }
);


/* SPACE */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.code === "Space") {

            event.preventDefault();

            fly();

        }

    }
);


/* =========================
   PAUSE
========================= */

pauseBtn.addEventListener(
    "click",
    () => {

        if (!gameRunning)
            return;

        paused = !paused;

        pauseBtn.textContent =
            paused ? "▶" : "⏸";

    }
);


/* =========================
   CREATE PIPE
========================= */

function createPipe() {

    const minimum = 90;

    const maximum =
        canvas.height -
        pipeGap -
        120;

    const topHeight =
        Math.random() *
        (maximum - minimum) +
        minimum;


    pipes.push({

        x: canvas.width,

        top: topHeight,

        bottom:
            topHeight +
            pipeGap,

        passed: false

    });

}


/* =========================
   DRAW BACKGROUND
========================= */

function drawBackground() {

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            canvas.height
        );

    gradient.addColorStop(
        0,
        "#9fe1dd"
    );

    gradient.addColorStop(
        1,
        "#c9e9b7"
    );


    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /* clouds */

    ctx.fillStyle =
        "rgba(255,255,255,0.65)";


    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const x =
            (i * 150 -
                (Date.now() / 60) % 180);

        const y =
            100 + i * 90;


        ctx.beginPath();

        ctx.arc(
            x,
            y,
            25,
            0,
            Math.PI * 2
        );

        ctx.arc(
            x + 30,
            y + 5,
            32,
            0,
            Math.PI * 2
        );

        ctx.arc(
            x + 60,
            y,
            22,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

}


/* =========================
   DRAW PIPES
========================= */

function drawPipe(pipe) {

    ctx.fillStyle =
        "#76b93d";


    /* TOP */

    ctx.fillRect(
        pipe.x,
        0,
        pipeWidth,
        pipe.top
    );


    /* TOP CAP */

    ctx.fillRect(
        pipe.x - 5,
        pipe.top - 20,
        pipeWidth + 10,
        20
    );


    /* BOTTOM */

    ctx.fillRect(
        pipe.x,
        pipe.bottom,
        pipeWidth,
        canvas.height -
        pipe.bottom
    );


    /* BOTTOM CAP */

    ctx.fillRect(
        pipe.x - 5,
        pipe.bottom,
        pipeWidth + 10,
        20
    );


    /* HIGHLIGHT */

    ctx.fillStyle =
        "rgba(255,255,255,0.25)";

    ctx.fillRect(
        pipe.x + 10,
        0,
        8,
        pipe.top
    );

    ctx.fillRect(
        pipe.x + 10,
        pipe.bottom,
        8,
        canvas.height -
        pipe.bottom
    );

}


/* =========================
   DRAW PLAYER
========================= */

function drawPlayer() {

    const image =
        characterImages[
            selectedMember
        ];


    if (
        image &&
        image.complete
    ) {

        ctx.drawImage(

            image,

            player.x,

            player.y,

            player.width,

            player.height

        );

    } else {

        /* fallback */

        ctx.fillStyle =
            "#ff9db4";

        ctx.beginPath();

        ctx.arc(
            player.x + 30,
            player.y + 30,
            30,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

}


/* =========================
   COLLISION
========================= */

function collision(pipe) {

    const padding = 8;


    const playerLeft =
        player.x + padding;

    const playerRight =
        player.x +
        player.width -
        padding;

    const playerTop =
        player.y + padding;

    const playerBottom =
        player.y +
        player.height -
        padding;


    const pipeLeft =
        pipe.x;

    const pipeRight =
        pipe.x +
        pipeWidth;


    const horizontal =
        playerRight >
            pipeLeft &&
        playerLeft <
            pipeRight;


    if (!horizontal)
        return false;


    if (
        playerTop <
        pipe.top
    ) {

        return true;

    }


    if (
        playerBottom >
        pipe.bottom
    ) {

        return true;

    }


    return false;

}


/* =========================
   GAME OVER
========================= */

function gameOver() {

    gameRunning = false;


    if (score > best) {

        best = score;

        localStorage.setItem(
            "svtFlyBest",
            best
        );

        bestText.textContent =
            best;

    }


    gameMessage.classList.remove(
        "hidden"
    );


    gameMessage.innerHTML = `

        <h1>
            GAME OVER 💀
        </h1>

        <p>
            ${members[selectedMember].name}
            flew ${score} pipes!
        </p>

        <button id="restartBtn">
            FLY AGAIN
        </button>

    `;


    document
        .getElementById(
            "restartBtn"
        )
        .addEventListener(
            "click",
            startGame
        );

}


/* =========================
   UPDATE
========================= */

function update() {

    if (paused)
        return;


    /* gravity */

    player.velocity +=
        gravity;

    player.y +=
        player.velocity;


    /* boundaries */

    if (
        player.y < 0 ||
        player.y +
        player.height >
        canvas.height
    ) {

        gameOver();

        return;

    }


    /* pipes */

    pipeTimer++;


    if (
        pipeTimer >
        pipeInterval
    ) {

        createPipe();

        pipeTimer = 0;

    }


    pipes.forEach(
        pipe => {

            pipe.x -=
                pipeSpeed;


            /* score */

            if (
                !pipe.passed &&
                pipe.x +
                pipeWidth <
                player.x
            ) {

                pipe.passed = true;

                score++;

                scoreText.textContent =
                    score;

            }


            /* collision */

            if (
                collision(pipe)
            ) {

                gameOver();

            }

        }
    );


    /* remove old pipes */

    pipes =
        pipes.filter(
            pipe =>
                pipe.x >
                -pipeWidth
        );

}


/* =========================
   GAME LOOP
========================= */

function gameLoop() {

    if (!gameRunning)
        return;


    if (!paused) {

        update();

    }


    drawBackground();


    pipes.forEach(
        drawPipe
    );


    drawPlayer();


    requestAnimationFrame(
        gameLoop
    );

}