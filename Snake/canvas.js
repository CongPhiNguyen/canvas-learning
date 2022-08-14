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

canvas.width = innerWidth - 12;
canvas.height = innerHeight - 12;

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
class Circle {
  constructor(x, y, radius, color, offset) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.offset = offset;
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

const randomColor2 = () => {
  return `rgb(${randomIntFromRange(0, 255)},${randomIntFromRange(
    0,
    255
  )},${randomIntFromRange(0, 255)})`;
};

let circles = [];
// Implementation
function init() {
  for (let i = 0; i < 100; i++) {
    circles.push(
      new Circle(
        noise(20 + i / 100) * canvas.width,
        noise(i / 100) * canvas.height,
        randomIntFromRange(4, 10),
        randomColor2(),
        i / 100
      )
    );
  }
}

let time = 0;
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  // c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "rgba(255,255,255,0.01)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  // c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);

  // circle.y = Math.random() * canvas.height;
  // circle.x = Math.random() * canvas.width;

  circles.forEach((circle) => {
    circle.update();
    circle.x = noise(time + 20 + circle.offset) * canvas.width;
    circle.y = noise(time + circle.offset) * canvas.height;

    // Này là ra con rắn rồi
    // circle.x = noise(time + 20 + circle.offset / 100) * canvas.width;
    // circle.y = noise(time + circle.offset / 100) * canvas.height;
  });

  time += 0.005;
}

init();
animate();
