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

// this will start the webcam
navigator.mediaDevices.getUserMedia({ video: true })
 .then(stream => {
  video.srcObject = stream;
 }).catch(err => {
  console.error("Camera access failed:", err);
 });

// this will capture the frame
captureBtn.addEventListener("click", () => {
 ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
 const image = canvas.toDataURL("image/png");
 downloadLink.href = image;
});
