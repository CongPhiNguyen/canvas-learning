let canvas = document.querySelector("canvas");
// canvas.width = window.innerWidth - 60;
// canvas.height = window.innerHeight - 6;
canvas.width = 300;
canvas.height = 400;

window.addEventListener("resize", function () {
  // check width
  canvas.width = window.innerWidth - 6;
  canvas.height = window.innerHeight - 6;
});

let c = canvas.getContext("2d");
// console.log("c", c);
// c.fillStyle = "rgba(100,100,100,0.25)";
// c.fillRect(100, 100, 45, 45);

// // console.log(window);s

// c.beginPath();
// c.moveTo(100, 200);
// c.lineTo(200, 400);
// c.lineTo(400, 66);
// c.strokeStyle = "#faf";
// c.stroke();

// // Arc
// c.beginPath();
// c.arc(100, 45, 199, (Math.PI * 55) / 360, (Math.PI * 150) / 360, false);
// c.stroke();

function Circle(x, y, radius, color, xVelocity, yVelocity) {
  this.x = x;
  this.y = y;

  this.radius = radius;

  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;

  this.xDirection = 1 * xVelocity;
  this.yDirection = 1 * yVelocity;

  this.color = color;

  this.draw = () => {
    c.beginPath();

    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

    c.strokeStyle = this.color;

    c.stroke();
  };

  this.update = () => {
    if (this.x <= this.radius) {
      this.xDirection = 1 * this.xVelocity;
      this.xVelocity = Math.round(Math.random() * 5);
    } else if (this.x >= canvas.width - this.radius) {
      this.xDirection = -1 * this.xVelocity;
      this.xVelocity = Math.round(Math.random() * 5);
    }
    if (this.y <= this.radius) {
      this.yDirection = 1 * this.yVelocity;
      this.yVelocity = Math.round(Math.random() * 5);
    } else if (this.y >= canvas.height - this.radius) {
      this.yDirection = -1 * this.yVelocity;
      this.yVelocity = Math.round(Math.random() * 5);
    }

    this.x += this.xDirection;
    this.y += this.yDirection;

    this.draw();
  };
}

let circleList = [];

const randomBetween = (a, b) => {
  return Math.round(Math.random() * (b - a) + a);
};

const makeCircleList = () => {
  const radius = randomBetween(10, 30);
  const randomX = randomBetween(radius, canvas.width - radius);
  const randomY = randomBetween(radius, canvas.height - radius);
  const randomColor = `rgb(${randomBetween(0, 255)},
  ${randomBetween(0, 255)},
  ${randomBetween(0, 255)})`;

  const randomXVelocity = randomBetween(1, 10);
  const randomYVelocity = randomBetween(1, 10);
  circleList.push(
    new Circle(
      randomX,
      randomY,
      radius,
      randomColor,
      randomXVelocity,
      randomYVelocity
    )
  );
};

for (let i = 0; i < 100; i++) {
  makeCircleList();
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  circleList.forEach((circle) => circle.update());
}

animate();
