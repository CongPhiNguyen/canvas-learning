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

let angle = 0;
// Event Listeners
addEventListener("mousemove", (event) => {
  gsap.to(mouse, {
    x: event.clientX - canvas.width / 2,
    y: event.clientY - canvas.height / 2,
    duration: 1,
  });
  // mouse.x = event.clientX - canvas.width / 2;
  // mouse.y = event.clientY - canvas.height / 2;

  angle = Math.atan2(mouse.y, mouse.x);
  console.log(angle);
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

const randomColor2 = () => {
  return `rgb(${randomIntFromRange(0, 255)},${randomIntFromRange(
    0,
    255
  )},${randomIntFromRange(0, 255)})`;
};

let time = 0.1;
// Objects
class Particle {
  constructor(x, y, radius, color, distanceFromCenter) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.distanceFromCenter = distanceFromCenter;
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
    // Spinning
    // this.x =
    //   canvas.width / 2 + this.distanceFromCenter * Math.cos(Math.PI + time);
    // this.y =
    //   canvas.height / 2 + this.distanceFromCenter * Math.sin(Math.PI + time);
    // Nhân code với sin nó ra một đống thứ
    this.x =
      canvas.width / 2 +
      this.distanceFromCenter *
        Math.cos(angle) *
        Math.sin(Math.PI + time + this.distanceFromCenter);
    this.y =
      canvas.height / 2 +
      this.distanceFromCenter *
        Math.sin(angle) *
        Math.cos(Math.PI + time + this.distanceFromCenter);
    // this.x = canvas.width / 2 + this.distanceFromCenter * Math.cos(angle);
    // this.y = canvas.height / 2 + this.distanceFromCenter * Math.sin(angle);
  }
}

// Implementation
let particles = [];
const particleCount = 300;
function init() {
  for (let i = 0; i < particleCount; i++) {
    const x = canvas.width / 2 + i;
    const y = canvas.height / 2 + i;
    console.log("color", Math.round((i / particleCount) * 255));
    particles.push(
      new Particle(x, y, 5, `hsl(${(i / particleCount) * 255},50%,50%)`, i)
    );
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,0.1)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  time += 0.1;

  // c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
  particles.forEach((particle) => particle.update());
}

init();
animate();
