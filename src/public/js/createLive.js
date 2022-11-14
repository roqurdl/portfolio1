const video = document.querySelector(`video`);
const startBtn = document.querySelector(`#startBtn`);

const handleStart = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  video.srcObject = stream;
  video.play();
};

startBtn.addEventListener(`click`, handleStart);
