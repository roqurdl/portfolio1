const video = document.querySelector(`video`);
const startBtn = document.querySelector(`#startBtn`);
const muteBtn = document.querySelector(`#mute`);
const cameraBtn = document.querySelector(`#camera`);
const cameraList = document.querySelector(`#cameras`);
const audioList = document.querySelector(`#audios`);

let Stream;
let muted = false;
let camera = false;

async function getCameras() {
  try {
    /**
     * device.kind = audio or vided
     * device.label = divce name
     * device.deviceId = unique numver of device
     */
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const currentCamera = Stream.getVideoTracks()[0];
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      cameraList.appendChild(option);
    });
  } catch (err) {
    console.log(err);
  }
}

async function getAudios() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const audios = devices.filter((device) => device.kind === "audioinput");
  const currentAudio = Stream.getAudioTracks()[0];
  audios.forEach((audio) => {
    const option = document.querySelector("option");
    option.value = audio.id;
    option.innerText = audio.label;
    if (currentAudio.label === audio.label) {
      option.selected = true;
    }
    audioList.appendChild(option);
  });
}

async function init() {
  try {
    Stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
  } catch (error) {
    console.log(error);
  }
  await getCameras();
  // await getAudios();
  video.srcObject = Stream;
  video.play();
}
init();

async function handleStart() {
  startBtn.innerText = "Stop";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);
  const recorder = new MediaRecorder(Stream);
}

function handleMute() {
  Stream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}
function handleCamera() {
  Stream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
  if (!camera) {
    cameraBtn.innerText = "Camera ON";
    camera = true;
  } else {
    cameraBtn.innerText = "Camera OFF";
    camera = false;
  }
}

function handleStop() {
  startBtn.innerText = "Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleStart);
}

startBtn.addEventListener(`click`, handleStart);
muteBtn.addEventListener(`click`, handleMute);
cameraBtn.addEventListener(`click`, handleCamera);
