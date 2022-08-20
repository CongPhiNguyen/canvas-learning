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
  constructor(x, y, radius, color, velocity) {
    super();
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

let particles = [];

const PARTICLE_COUNT = 40;
// Implementation

function init() {
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    const radius = 5;
    particles.push(
      new Particle(x, y, radius, randomColor2(), {
        x: Math.cos((Math.PI * 2 * i) / PARTICLE_COUNT),
        y: Math.sin((Math.PI * 2 * i) / PARTICLE_COUNT),
      })
    );
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,0.1)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    particle.update();
    if (
      particle.x + particle.radius * 2 < 0 ||
      particle.x - particle.radius * 2 > canvas.width ||
      particle.y + particle.radius * 2 < 0 ||
      particle.y - particle.radius * 2 > canvas.height
    ) {
      particles.splice(index, 1);
    }
  });
}

init();
animate();
