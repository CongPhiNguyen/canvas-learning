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

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  // init();
});

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

class Player {
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
    // c.strokeStyle = this.color;
    // c.stroke();
    c.closePath();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.velocity.y += GRAVITY;
    if (this.y + this.radius + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    }
  }
}

class Platform {
  constructor(x, y, width, height) {
    this.x = x;
    this, (y = y);
    this.width = width;
    this.height = height;
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
// Implementation

function init() {
  const x = randomIntFromRange(0, canvas.width);
  const y = randomIntFromRange(0, canvas.height);
  const radius = 40;
  player = new Player(x, 0, radius, randomColor2(), { x: 0, y: 2 });
}

const moving = () => {
  if (keys.left.pressed) {
    player.velocity.x = -8;
  } else if (keys.right.pressed) {
    player.velocity.x = 8;
  } else player.velocity.x = 0;

  if (keys.up.pressed) {
    player.velocity.y = -8;
  } else if (keys.down.pressed) {
    player.velocity.y = 8;
  }
};

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(255, 255, 255, 1)";
  c.fillRect(0, 0, canvas.width, canvas.height);
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
