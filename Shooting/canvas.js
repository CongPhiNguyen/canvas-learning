function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FF16E5", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

// addEventListener("resize", () => {
//   canvas.width = innerWidth;
//   canvas.height = innerHeight;

//   init();
// });

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

const randomColor2 = () => {
  return `rgb(${randomIntFromRange(0, 255)},${randomIntFromRange(
    0,
    255
  )},${randomIntFromRange(0, 255)})`;
};

class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }
}

class ProjectTile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }
  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }
}

class Corrupted {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.opacity = 1;
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.opacity -= 0.02;
  }
  draw() {
    c.save();
    c.globalAlpha = this.opacity;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }
}

class Gun {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  update() {
    this.draw();
    const calSumSquare = Math.sqrt(
      (mouse.x - player.x) ** 2 + (mouse.y - player.y) ** 2
    );
    this.x = player.x + ((mouse.x - player.x) * player.radius) / calSumSquare;
    this.y = player.y + ((mouse.y - player.y) * player.radius) / calSumSquare;
  }
  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.closePath();
  }
}

let player;
let projectTiles = [];

let enemies = [];
let corrupteds = [];
let gun;

let score = 0;
let scoreDOM = document.querySelector("#score");

const SMALLEST_ENEMY_DISTANCE = 130;
let spawnEnemyID;

const spawnEnemy = () => {
  spawnEnemyID = setInterval(() => {
    let x, y;
    do {
      x = randomIntFromRange(0, canvas.width);
    } while (Math.abs(x - player.x) < SMALLEST_ENEMY_DISTANCE);

    do {
      y = randomIntFromRange(0, canvas.height);
    } while (Math.abs(y - player.y) < SMALLEST_ENEMY_DISTANCE);

    const calSumSquare = Math.sqrt((x - player.x) ** 2 + (y - player.y) ** 2);
    const velocityX = ((player.x - x) * 2) / calSumSquare;
    const velocityY = ((player.y - y) * 2) / calSumSquare;

    const radius = randomIntFromRange(1, 5) * 10;
    enemies.push(
      new Enemy(x, y, radius, randomColor2(), {
        x: velocityX,
        y: velocityY,
      })
    );
  }, 1500);
};

// Implementation
function init() {
  player = new Player(canvas.width / 2, canvas.height / 2, 30, "cyan");
  gun = new Gun(player.x, player.y, 10, "cyan");
  spawnEnemy();
}

let animationID;
// Animation Loop
function animate() {
  animationID = requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,0.1)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();
  gun.update();
  projectTiles.forEach((projectTile, index) => {
    projectTile.update();
    if (
      projectTile.x < 0 ||
      projectTile.y < 0 ||
      projectTile.x > canvas.width ||
      projectTile.y > canvas.height
    ) {
      projectTiles.splice(index, 1);
    }
  });

  corrupteds.forEach((corrupted, index) => {
    if (corrupted.opacity > 0) corrupted.update();
    else {
      corrupteds.splice(index, 1);
    }
  });

  enemies.forEach((enemy, index) => {
    enemy.update();
    if (
      enemy.x < 0 ||
      enemy.y < 0 ||
      enemy.x > canvas.width ||
      enemy.y > canvas.height
    ) {
      enemies.splice(index, 1);
    }

    if (
      getDistance(player.x, player.y, enemy.x, enemy.y) <=
      player.radius + enemy.radius
    ) {
      cancelAnimationFrame(animationID);
      clearInterval(spawnEnemyID);
      gameState = gameStateEnum.STOP;
      document.querySelector(".point").textContent = score;
      gameNotification.style.display = "block";
    }

    projectTiles.forEach((projectTile, i) => {
      if (
        getDistance(projectTile.x, projectTile.y, enemy.x, enemy.y) <=
        projectTile.radius + enemy.radius
      ) {
        // Not being flashed
        setTimeout(() => {
          if (enemy.radius > 20) {
            enemy.radius -= 20;
          } else {
            score++;
            scoreDOM.textContent = score;
            enemies.splice(index, 1);
          }
          projectTiles.splice(i, 1);
          const particleCount = 20;
          const angleIncrement = (Math.PI * 2) / particleCount;
          for (let i = 0; i < particleCount; i++) {
            const corrupted = new Corrupted(enemy.x, enemy.y, 3, enemy.color, {
              x: Math.cos(angleIncrement * i) * 8 * Math.random(),
              y: Math.sin(angleIncrement * i) * 8 * Math.random(),
            });
            corrupteds.push(corrupted);
          }
        }, 0);
      }
    });
  });
}

window.addEventListener("click", (e) => {
  if (gameState === gameStateEnum.IDLE) return;
  // console.log(mouse.x, mouse.y);
  const calSumSquare = Math.sqrt(
    (mouse.x - player.x) ** 2 + (mouse.y - player.y) ** 2
  );
  const velocityX = ((mouse.x - player.x) * 5) / calSumSquare;
  const velocityY = ((mouse.y - player.y) * 5) / calSumSquare;
  projectTiles.push(
    new ProjectTile(gun.x, gun.y, 4, randomColor2(), {
      x: velocityX,
      y: velocityY,
    })
  );
});

const gameStateEnum = {
  IDLE: "IDLE",
  RUNNING: "RUNNING",
  STOP: "STOP",
};
let gameState = gameStateEnum.IDLE;

const startGameDOM = document.querySelector(".start-game-btn");
const gameNotification = document.querySelector(".game-notification");

startGameDOM.onclick = (e) => {
  e.stopPropagation();
  if (gameState == gameStateEnum.IDLE) {
    init();
    animate();
    gameState = gameStateEnum.RUNNING;
    gameNotification.style.display = "none";
  } else if (gameState == gameStateEnum.STOP) {
    init();
    projectTiles = [];
    enemies = [];
    score = 0;
    scoreDOM.textContent = 0;
    document.querySelector(".point").textContent = 0;
    corrupteds = [];
    animate();

    gameState = gameStateEnum.RUNNING;
    gameNotification.style.display = "none";
  }
};
