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

canvas.width = 1024;
canvas.height = 500;

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

//   // init();
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

const GRAVITY = 0.5;
const platformImage = new Image();
platformImage.src = "./img/platform.png";

const groundImage = new Image();
groundImage.src = "./img/ground.jpg";

const backgroundImage = new Image();
backgroundImage.src = "./img/background.jpg";

const playerImage = new Image();
playerImage.src = "./img/kratos.jpg";

const playerStateEnum = {
  IDLE: "IDLE",
};
class Player {
  constructor(x, y, width, height, color, velocity) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.velocity = velocity;
    this.state = playerStateEnum.IDLE;
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    if (this.state == playerStateEnum.IDLE) {
      const source 
      c.drawImage(playerImage, this.x, this.y);
    }
    // c.fillRect(this.x, this.y, this.width, this.height);
    // c.strokeStyle = this.color;
    // c.stroke();
    c.closePath();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.velocity.y += GRAVITY;
    if (
      this.y + this.height + this.velocity.y >=
      canvas.height - GROUND_HEIGHT
    ) {
      this.velocity.y = 0;
    }
  }
}

class Platform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}

let player;
let keys = {
  left: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
  up: {
    pressed: false,
  },
  down: {
    pressed: false,
  },
};

let platforms = [];
// Implementation

let scrollOffset = 0;
function init() {
  const x = randomIntFromRange(0, canvas.width);
  const y = randomIntFromRange(0, canvas.height);
  const radius = 40;
  player = new Player(100, 0, 80, 80, "blue", { x: 0, y: 2 });
  for (let i = 0; i < 10; i++) {
    platform = new Platform(
      400 * (i + 1),
      200 * Math.random() + canvas.height - GROUND_HEIGHT - 300,
      200,
      10
    );
    platforms.push(platform);
  }
}

const moving = () => {
  if (keys.left.pressed && player.x > 100) {
    player.velocity.x = -8;
  } else if (keys.right.pressed && player.x < 500) {
    player.velocity.x = 8;
  } else {
    player.velocity.x = 0;
    if (keys.left.pressed && scrollOffset >= 0) {
      scrollOffset -= 8;
      platforms.forEach((platform) => {
        platform.x += 8;
      });
      // console.log(scrollOffset);
    } else if (keys.right.pressed && scrollOffset < 4100) {
      scrollOffset += 8;
      platforms.forEach((platform) => {
        platform.x -= 8;
      });
      // console.log(scrollOffset);
    }
  }

  if (keys.up.pressed) {
    player.velocity.y = -8;
  } else if (keys.down.pressed) {
    player.velocity.y = 8;
  }
};
const GROUND_HEIGHT = 40;
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(255, 255, 255, 1)";
  // c.fillRect(0, 0, canvas.width, canvas.height);
  // co
  // c.drawImage(0,0,)
  const source = [0, 0, 1600, 600];
  const destination = [0, 0, canvas.width, canvas.height];
  c.drawImage(backgroundImage, ...source, ...destination);
  c.fillStyle = "green";
  const source2 = [0, 280, 1000, 40];
  const destination2 = [
    0,
    canvas.height - GROUND_HEIGHT,
    canvas.width,
    GROUND_HEIGHT,
  ];
  c.drawImage(groundImage, ...source2, ...destination2);

  platforms.forEach((platform) => {
    platform.draw();
    const source = [100, 300, 380, 320];
    const destination = [
      platform.x,
      platform.y,
      platform.width,
      platform.height * 8,
    ];
    c.drawImage(platformImage, ...source, ...destination);
    if (
      player.y + player.height + player.velocity.y >= platform.y &&
      player.y + player.height <= platform.y &&
      player.x + player.width >= platform.x &&
      player.x < platform.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
  player.update();
  moving();
}

init();
animate();

const keyCodeEnum = {
  KEY_UP: 38,
  KEY_LEFT: 37,
  KEY_RIGHT: 39,
  KEY_DOWN: 40,
};

window.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case keyCodeEnum.KEY_UP: {
      keys.up.pressed = true;
      break;
    }
    case keyCodeEnum.KEY_LEFT: {
      keys.left.pressed = true;
      break;
    }
    case keyCodeEnum.KEY_RIGHT: {
      keys.right.pressed = true;
      break;
    }
    case keyCodeEnum.KEY_DOWN: {
      keys.down.pressed = true;
      break;
    }
  }
});

window.addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case keyCodeEnum.KEY_UP: {
      keys.up.pressed = false;
      break;
    }
    case keyCodeEnum.KEY_LEFT: {
      keys.left.pressed = false;
      break;
    }
    case keyCodeEnum.KEY_RIGHT: {
      keys.right.pressed = false;
      break;
    }
    case keyCodeEnum.KEY_DOWN: {
      keys.down.pressed = false;
      break;
    }
  }
});
