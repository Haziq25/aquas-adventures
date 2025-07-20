let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let keys = {};

let player = { x: 100, y: 300, w: 30, h: 40, vx: 0, vy: 0, grounded: false };
let bullets = [];
let enemy = { x: 600, y: 300, w: 40, h: 40, alive: true };
let gravity = 0.5;

function startGame() {
  document.getElementById("splash").style.display = "none";
  canvas.style.display = "block";
  document.getElementById("controls").style.display = "block";
  requestAnimationFrame(update);
}

document.getElementById("left").ontouchstart = () => keys["ArrowLeft"] = true;
document.getElementById("right").ontouchstart = () => keys["ArrowRight"] = true;
document.getElementById("jump").ontouchstart = () => {
  if (player.grounded) player.vy = -10;
};
document.getElementById("shoot").ontouchstart = shoot;
document.getElementById("left").ontouchend = () => keys["ArrowLeft"] = false;
document.getElementById("right").ontouchend = () => keys["ArrowRight"] = false;

function shoot() {
  bullets.push({ x: player.x + player.w / 2, y: player.y + 10, vx: 5 });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Movement
  player.vx = 0;
  if (keys["ArrowLeft"]) player.vx = -3;
  if (keys["ArrowRight"]) player.vx = 3;

  player.x += player.vx;
  player.vy += gravity;
  player.y += player.vy;

  // Ground
  if (player.y + player.h > 360) {
    player.y = 360 - player.h;
    player.vy = 0;
    player.grounded = true;
  } else {
    player.grounded = false;
  }

  // Draw Player
  ctx.fillStyle = "lightblue";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // Draw Enemy
  if (enemy.alive) {
    ctx.fillStyle = "orange";
    ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
  }

  // Bullets
  ctx.fillStyle = "aqua";
  bullets.forEach((b, i) => {
    b.x += b.vx;
    ctx.fillRect(b.x, b.y, 5, 5);

    // Check collision with enemy
    if (
      enemy.alive &&
      b.x > enemy.x &&
      b.x < enemy.x + enemy.w &&
      b.y > enemy.y &&
      b.y < enemy.y + enemy.h
    ) {
      enemy.alive = false;
    }
  });

  requestAnimationFrame(update);
}
