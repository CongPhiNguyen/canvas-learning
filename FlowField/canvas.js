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

  init();
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
    // c.fillStyle = this.color;
    // c.fill();
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath();
  }

  update() {
    this.draw();
  }
}

class Particle extends Object {
  constructor(x, y, radius, color, angle) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.angle = angle;
  }

  update() {
    this.draw();
  }
  draw() {
    c.beginPath();
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.moveTo(this.x, this.y);
    const nextX = this.x + 10 * Math.cos(this.angle);
    const nextY = this.y + 10 * Math.sin(this.angle);

    c.lineTo(nextX, nextY);
    c.stroke();
    c.closePath();
  }
}

let particles = [];

// Implementation

const DISTANCE = 40;
function init() {
  for (let i = 0; i < canvas.width / DISTANCE; i++) {
    for (let j = 0; j < canvas.height / DISTANCE; j++) {
      const angle = noise((i * DISTANCE + j) * 0.1) * Math.PI * 2;
      particles.push(
        new Particle(i * DISTANCE + 10, j * DISTANCE + 10, 1, "#fff", angle)
      );
    }
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,1)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    particle.update();
    // if (
    //   particle.x + particle.radius * 2 < 0 ||
    //   particle.x - particle.radius * 2 > canvas.width ||
    //   particle.y + particle.radius * 2 < 0 ||
    //   particle.y - particle.radius * 2 > canvas.height
    // ) {
    //   particles.splice(index, 1);
    // }
  });
}

init();
animate();
