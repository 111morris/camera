/* const cameraFeed = document.querySelector("#cameraFeed");
navigator.mediaDevices.getUserMedia({video: true})
 .then(stream => {
  cameraFeed.srcObject = stream;
 })

 .catch(error => {
  console.error("cant open it");
 }) */

  
const video = document.querySelector("#video");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const captureBtn = document.querySelector("#captureBtn");
const downloadLink = document.querySelector("#downloadLink");
const countdownEl = document.getElementById("countdown");

let isCaptured = false;

async function setupCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        resolve();
      };
    });
  } catch (error) {
    alert("Could not access the camera. Please allow access and reload the page.");
    console.error("Camera error:", error);
  }
}

captureBtn.addEventListener("click", () => {
  if (!isCaptured) {
    // Begin countdown before capture
    let count = 3;
    countdownEl.textContent = count;


  } else {
    // Retake logic: resume video and reset state
    video.play();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    downloadLink.href = "#";
    captureBtn.textContent = "📸 Capture";
    isCaptured = false;
  }
});

// Init camera
setupCamera();
