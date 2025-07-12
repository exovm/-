const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

const fontSize = 16;
let columns, drops, animationInterval;
let fadeOutInterval, fadeInInterval;
let matrixAlpha = 1;
let exovmAlpha = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  setupMatrix();
}
function setupMatrix() {
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(0).map(() => Math.random() * canvas.height / fontSize);
}

function drawMatrixRain(alpha = 1) {
  ctx.globalAlpha = alpha;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < columns; i++) {
    const x = i * fontSize + fontSize / 2;
    const y = drops[i] * fontSize + fontSize / 2;
    ctx.fillStyle = 'rgba(0,255,0,1)';
    ctx.fillText(Math.random() > 0.5 ? '1' : '0', x, y);
    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    } else {
      drops[i] += 1;
    }
  }
  ctx.globalAlpha = 1;
}

function drawExovm(alpha = 1) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const text = 'exovm';
  let fontSize = Math.floor(canvas.height * 0.2);
  ctx.font = `bold ${fontSize}px Arial, sans-serif`;
  ctx.fillStyle = '#111';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  ctx.globalAlpha = 1;
}

window.onload = function() {
  document.getElementById('custom-modal').style.display = 'flex';
  resizeCanvas();
  animationInterval = setInterval(() => drawMatrixRain(matrixAlpha), 50);
  setTimeout(function() {
    document.getElementById('custom-modal').style.display = 'none';
    // Fade out Matrix
    let fadeStep = 0;
    if (animationInterval) clearInterval(animationInterval);
    fadeOutInterval = setInterval(() => {
      matrixAlpha -= 0.05;
      if (matrixAlpha <= 0) {
        matrixAlpha = 0;
        clearInterval(fadeOutInterval);
        // Fade in exovm
        fadeInInterval = setInterval(() => {
          exovmAlpha += 0.05;
          drawExovm(exovmAlpha);
          if (exovmAlpha >= 1) {
            exovmAlpha = 1;
            clearInterval(fadeInInterval);
          }
        }, 30);
      } else {
        drawMatrixRain(matrixAlpha);
      }
    }, 30);
  }, 5000);
};

window.addEventListener('resize', () => {
  resizeCanvas();
  if (animationInterval) clearInterval(animationInterval);
  animationInterval = setInterval(() => drawMatrixRain(matrixAlpha), 50);
}); 