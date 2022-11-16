const video = document.querySelector(`video`);
const startBtn = document.querySelector(`#startBtn`);
const muteBtn = document.querySelector(`#mute`);
const cameraBtn = document.querySelector(`#camera`);
const cameraList = document.querySelector(`#cameras`);
const audioList = document.querySelector(`#audios`);

let Stream;
let videoFile;
let recorder;
let muted = false;
let camera = false;

async function getConnectedDevices(type) {
  /**
   * device.kind = audio or vided
   * device.label = divce name
   * device.deviceId = unique numver of device
   */
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === type);
}

async function getCameras() {
  try {
    const cameras = await getConnectedDevices(`videoinput`);
    const currentCamera = Stream.getVideoTracks()[0];
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      cameraList.add(option);
    });
  } catch (err) {
    console.log(err);
  }
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
  video.srcObject = Stream;
  video.play();
}
init();

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

function handleDownload() {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm";
  document.body.appendChild(a);
  a.click();
}

function handleRecordStop() {
  startBtn.innerText = "Download Record";
  startBtn.removeEventListener("click", handleRecordStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
}

async function handleRecordStart() {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleRecordStart);
  startBtn.addEventListener("click", handleRecordStop);
  recorder = new MediaRecorder(Stream);
  recorder.ondataavailable = (e) => {
    videoFile = URL.createObjectURL(e.data);
    video.srcObject = null;
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 3000);
}

startBtn.addEventListener(`click`, handleRecordStart);
muteBtn.addEventListener(`click`, handleMute);
cameraBtn.addEventListener(`click`, handleCamera);
