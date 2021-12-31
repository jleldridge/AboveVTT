const particlesOnScreen = 245;
let particlesArray = [];

function random(min, max) {
  return min + Math.random() * (max - min + 1);
};

function createSnowFlakes() {
  let canvas = $("#weather_overlay").get(0);
  let w = canvas.width;
  let h = canvas.height;
  particlesArray = [];

  for (var i = 0; i < particlesOnScreen; i++) {
    particlesArray.push({
      x: Math.random() * w,
      y: Math.random() * h,
      opacity: Math.random(),
      speedX: random(-11, 11),
      speedY: random(7, 15),
      radius: random(0.5, 4.2),
    })
  }
};

function drawSnowFlakes(canvas, ctx) {
  for (var i = 0; i < particlesArray.length; i++) {
    var gradient = ctx.createRadialGradient(
      particlesArray[i].x,
      particlesArray[i].y,
      0,
      particlesArray[i].x,
      particlesArray[i].y,
      particlesArray[i].radius
    );

    gradient.addColorStop(0, "rgba(255, 255, 255," + particlesArray[i].opacity + ")");  // white
    gradient.addColorStop(.8, "rgba(210, 236, 242," + particlesArray[i].opacity + ")");  // bluish
    gradient.addColorStop(1, "rgba(237, 247, 249," + particlesArray[i].opacity + ")");   // lighter bluish

    ctx.beginPath();
    ctx.arc(
      particlesArray[i].x,
      particlesArray[i].y,
      particlesArray[i].radius,
      0,
      Math.PI * 2,
      false
    );

    ctx.fillStyle = gradient;
    ctx.fill();
  }
};

function moveSnowFlakes(w, h) {
  for (var i = 0; i < particlesArray.length; i++) {
    particlesArray[i].x += particlesArray[i].speedX;
    particlesArray[i].y += particlesArray[i].speedY;

    if (particlesArray[i].y > h) {
      particlesArray[i].x = Math.random() * w * 1.5;
      particlesArray[i].y = -50;
    }
  }
};

function updateSnowFall() {
  let canvas = $("#weather_overlay").get(0);
  let ctx = canvas.getContext("2d");
  let w = canvas.width;
  let h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  drawSnowFlakes(canvas, ctx);
  moveSnowFlakes(w, h);
  requestAnimationFrame(updateSnowFall);
};