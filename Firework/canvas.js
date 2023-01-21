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

canvas.width = innerWidth - 16;
canvas.height = innerHeight - 16;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#00dbff", "#4d39ce ", "#088eff"];

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

const gravity = 0.05;
const friction = 0.9
;

class Particle {
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
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.velocity.y += gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.opacity -= 0.005;
  }

  draw() {
    c.save();
    c.globalAlpha = this.opacity;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    c.fillStyle = this.color;
    c.closePath();
    c.fill();
    c.restore();
  }
}

let particles = [];
// Implementation

function init() {}
let lastMousePos = { x: canvas.width, y: canvas.height };
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  // c.clearRect(0, 0, canvas.width, canvas.height);
  // c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "rgba(0,0,0,0.05)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    if (particle.opacity > 0) particle.update();
    else {
      particles.splice(index, 1);
    }
  });
}

init();
animate();

const randomColor2 = () => {
  return `rgb(${randomIntFromRange(0, 255)},${randomIntFromRange(
    0,
    255
  )},${randomIntFromRange(0, 255)})`;
};

addEventListener("click", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;

  console.log(mouse);

  const particleCount = 100;
  const angleIncrement = (Math.PI * 2) / particleCount;

  for (let i = 0; i < 100; i++) {
    const particle = new Particle(mouse.x, mouse.y, 3, randomColor2(), {
      x: Math.cos(angleIncrement * i) * 8 * Math.random(),
      y: Math.sin(angleIncrement * i) * 8 * Math.random(),
    });
    particles.push(particle);
  }
});
