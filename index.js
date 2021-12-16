const $camera = document.getElementById("camera");

const constrains = {
  video: {
    facingMode: {
      exact: "environment",
    },
  }
};

navigator.mediaDevices.getUserMedia(constrains)
  .then((stream) => {
    $camera.srcObject = stream;
    $camera.play();
  })
  .catch((error) => {
    console.error("An error ocurred on started camera", error);
  });
