const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const gui = new dat.GUI();

canvas.width = innerWidth - 16;
canvas.height = innerHeight - 16;

const wave = {
  y: canvas.height / 2,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01,
};

const colorControl = {
  color: "#00ffff",
  r: 255,
  g: 255,
  b: 0,
};
const waveFolder = gui.addFolder("wave");
waveFolder.add(wave, "y", 0, canvas.height);
waveFolder.add(wave, "length", -0.01, 0.01);
waveFolder.add(wave, "amplitude", -300, 300);
waveFolder.add(wave, "frequency", -0.01, 1);
waveFolder.open();
// gui.addColor(colorControl, "color", "#00ffff");
const colorFolder = gui.addFolder("color");
colorFolder.add(colorControl, "r", 0, 255);
colorFolder.add(colorControl, "g", 0, 255);
colorFolder.add(colorControl, "b", 0, 255);
colorFolder.open();

function init() {}

let increment = wave.frequency;
function draw() {
  c.beginPath();

  c.moveTo(0, canvas.height / 2);
  for (let i = 0; i < canvas.width; i++) {
    c.lineTo(
      i,
      wave.y +
        Math.sin(i * wave.length + increment) *
          wave.amplitude *
          Math.sin(increment)
    );
  }
  c.strokeStyle = `rgb(${Math.round(
    colorControl.r / 2 + (colorControl.r / 2) * Math.sin(increment)
  )}, ${colorControl.g}, ${colorControl.b})`;
  c.stroke();
}

function animate() {
  requestAnimationFrame(animate);
  // c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "rgba(0,0,0,0.01)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  // c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
  draw();
  increment += wave.frequency;
}

init();
animate();
