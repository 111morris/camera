const cameraFeed = document.querySelector("#cameraFeed");
navigator.mediaDevices.getUserMedia({video: true})
 .then(stream => {
  cameraFeed.srcObject = stream;
 })

 .catch(error => {
  console.error("cant open it");
 })