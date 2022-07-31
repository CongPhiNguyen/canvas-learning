let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight - 6;

window.addEventListener("resize", function () {
  // check width
  canvas.width = window.innerWidth - 6;
  canvas.height = window.innerHeight - 6;
});

let context = canvas.getContext("2d");
console.log("context", context);

context.fillRect(100, 100, 45, 45);

// console.log(window);s

context.beginPath();
context.moveTo(100, 200);
context.lineTo(200, 400);
context.lineTo(400, 66);
context.stroke();
