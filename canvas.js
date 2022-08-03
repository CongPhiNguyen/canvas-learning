let canvas = document.querySelector("canvas");
// canvas.width = window.innerWidth - 60;
// canvas.height = window.innerHeight - 6;
canvas.width = 600;
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

let mouseObject = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  [mouseObject.x, mouseObject.y] = [e.clientX, e.clientY];
  console.log(mouseObject);
});

function Circle(x, y, radius, color, backgroundColor, xVelocity, yVelocity) {
  this.x = x;
  this.y = y;

  this.radius = radius;
  this.currentRadius = radius;
  this.minRadius = randomBetween(1, radius);

  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;

  this.xDirection = Math.random() > 0.5 ? 1 : -1;
  this.yDirection = Math.random() > 0.5 ? 1 : -1;

  this.color = color;
  this.backgroundColor = backgroundColor;
  this.draw = () => {
    c.beginPath();

    c.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2, false);

    c.strokeStyle = this.color;
    c.stroke();
    c.fillStyle = this.backgroundColor;
    c.fill();
  };

  this.update = () => {
    if (this.x <= this.radius) {
      this.xDirection = 1;
      this.xVelocity = Math.round(Math.random() * 16) / 12;
    } else if (this.x >= canvas.width - this.radius) {
      this.xDirection = -1;
      this.xVelocity = Math.round(Math.random() * 16) / 12;
    }
    if (this.y <= this.radius) {
      this.yDirection = 1;
      this.yVelocity = Math.round(Math.random() * 16) / 12;
    } else if (this.y >= canvas.height - this.radius) {
      this.yDirection = -1;
      this.yVelocity = Math.round(Math.random() * 16) / 12;
    }

    this.x += this.xDirection * this.xVelocity;
    this.y += this.yDirection * this.yVelocity;

    if (
      Math.abs(this.x - mouseObject.x) < 50 &&
      Math.abs(this.y - mouseObject.y) < 50 &&
      this.currentRadius < 40
    ) {
      this.currentRadius++;
    } else if (this.currentRadius > this.minRadius) {
      this.currentRadius--;
    }

    this.draw();
  };
}

let circleList = [];

const randomBetween = (a, b) => {
  return Math.round(Math.random() * (b - a) + a);
};

const makeCircleList = () => {
  const radius = randomBetween(4, 8);
  const randomX = randomBetween(radius, canvas.width - radius);
  const randomY = randomBetween(radius, canvas.height - radius);
  const randomColor = `rgb(${randomBetween(0, 255)},
  ${randomBetween(0, 255)},
  ${randomBetween(0, 255)})`;
  const randomBackgroundColor = `rgb(${randomBetween(0, 255)},
  ${randomBetween(0, 255)},
  ${randomBetween(0, 255)})`;
  const randomXVelocity = randomBetween(1, 3);
  const randomYVelocity = randomBetween(1, 3);
  circleList.push(
    new Circle(
      randomX,
      randomY,
      radius,
      randomColor,
      randomBackgroundColor,
      randomXVelocity,
      randomYVelocity
    )
  );
};

for (let i = 0; i < 400; i++) {
  makeCircleList();
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  circleList.forEach((circle) => circle.update());
}

animate();
