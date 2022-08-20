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

let mouseDown;
addEventListener("mousedown", (event) => {
  mouseDown = true;
});
addEventListener("mouseup", (event) => {
  mouseDown = false;
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
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.shadowColor = this.color;
    c.shadowBlur = 15;
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }
}

let particles = [];

const PARTICLE_COUNT = 600;
// Implementation

function init() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const radius = 2 * Math.random();
    const longAxis = Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2;
    console.log(longAxis);
    const x =
      (longAxis / (canvas.width / 2)) *
      randomIntFromRange(-canvas.width / 2, canvas.width / 2);
    const y =
      (longAxis / (canvas.height / 2)) *
      randomIntFromRange(-canvas.height / 2, canvas.height / 2);

    particles.push(
      new Particle(x, y, radius, randomColor2(), {
        x: Math.cos((Math.PI * 2 * i) / PARTICLE_COUNT),
        y: Math.sin((Math.PI * 2 * i) / PARTICLE_COUNT),
      })
    );
  }
}

let angle = 0;
let alpha = 1;
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = `rgba(10,10,10,${alpha})`;
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  //Move anchor point

  c.translate(canvas.width / 2, canvas.height / 2);
  c.rotate(angle);
  particles.forEach((particle, index) => {
    particle.update();
  });

  c.restore();
  angle += 0.001;

  if (mouseDown) {
    if (alpha > 0.08) alpha -= 0.03;
    angle += 0.008;
  } else {
    if (alpha < 1) alpha += 0.001;
  }
}

init();
animate();
