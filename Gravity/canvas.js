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

canvas.width = innerWidth - 10;
canvas.height = innerHeight - 10;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
class Object {
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

  update() {
    this.draw();
  }
}

const GRAVITY = 1;
const FRICTION = 0.95;
class Ball extends Object {
  constructor(x, y, dy, radius, color) {
    super();
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }
  update() {
    // this.x++;
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * FRICTION;
    } else {
      this.dy += GRAVITY;
    }
    this.y += this.dy;
    this.draw();
  }
}

// Implementation
let ball;
function init() {
  ball = new Ball(
    canvas.width / 2 - 30,
    canvas.height / 2 - 30,
    0,
    30,
    randomColor(colors)
  );
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  // c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
  ball.update();
}

init();
animate();
