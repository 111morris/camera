/* const cameraFeed = document.querySelector("#cameraFeed");
navigator.mediaDevices.getUserMedia({video: true})
 .then(stream => {
  cameraFeed.srcObject = stream;
 })

 .catch(error => {
  console.error("cant open it");
 }) */

const video = document.querySelector("#video");
const canvas = document.querySelector("#canvas"); // Snapshot canvas
const ctx = canvas.getContext("2d");
const captureBtn = document.querySelector("#captureBtn");
const downloadLink = document.querySelector("#downloadLink");
const countdownEl = document.getElementById("countdown");

// 🎯 Face detection overlay canvas
const overlay = document.createElement("canvas");
overlay.setAttribute("id", "overlay");
overlay.style.position = "absolute";
overlay.style.top = "0";
overlay.style.left = "0";
document.body.appendChild(overlay);
const overlayCtx = overlay.getContext("2d");

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;

  return new Promise(resolve => {
    video.onloadedmetadata = () => {
      // Match canvas size to video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      overlay.width = video.videoWidth;
      overlay.height = video.videoHeight;
      resolve();
    };
  });
}

async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js/models');
}

async function startFaceDetection() {
  const options = new faceapi.TinyFaceDetectorOptions();

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, options);

    overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
    faceapi.draw.drawDetections(overlay, detections);
  }, 100);
}

// 📸 Snapshot logic with countdown
captureBtn.addEventListener("click", () => {
  let count = 3;
  countdownEl.textContent = count;

  const countdownInterval = setInterval(() => {
    count--;
    if (count === 0) {
      clearInterval(countdownInterval);
      countdownEl.textContent = "";

      // 📷 Capture snapshot
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const image = canvas.toDataURL("image/png");
      downloadLink.href = image;

    } else {
      countdownEl.textContent = count;
    }
  }, 1000);
});

// 🚀 Init everything
(async () => {
  await loadModels();
  await setupCamera();
  await startFaceDetection();
})();
