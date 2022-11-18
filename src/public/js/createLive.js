import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const video = document.querySelector(`video`);
const startBtn = document.querySelector(`#startBtn`);
const muteBtn = document.querySelector(`#mute`);
const cameraBtn = document.querySelector(`#camera`);
const cameraList = document.querySelector(`#cameras`);

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

async function handleDownload() {
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();
  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));
  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");
  const mp4File = ffmpeg.FS("readFile", "output.mp4");
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const mp4Url = URL.createObjectURL(mp4Blob);
  const a = document.createElement("a");
  a.href = mp4Url;
  a.download = "MyRecording.mp4";
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
}

startBtn.addEventListener(`click`, handleRecordStart);
muteBtn.addEventListener(`click`, handleMute);
cameraBtn.addEventListener(`click`, handleCamera);
