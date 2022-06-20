import canvasConfetti from 'canvas-confetti';

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.style.zIndex = '1000';
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.position = 'fixed';
canvas.style.pointerEvents = 'none';

const confetti = canvasConfetti.create(canvas, {
  resize: true,
  useWorker: true,
});

export default confetti;
