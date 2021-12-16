const $root = document.querySelector("canvas#root");
const ctx = $root.getContext("2d");

const $camera = document.getElementById("camera");
const $errorVideo = document.getElementById("errorVideo");

const constrains = {
  audio: true,
  video: {
    facingMode: {
      exact: "environment"
    }
  }
};

// {
//   facingMode: {
//     exact: "environment"
//   }
// }

function initDARK() {
  ctx.drawImage($camera, 0, 0);

  setTimeout(initDARK, 1000 / 50);
}

navigator.mediaDevices.getUserMedia(constrains)
  .then((stream) => {
    $camera.srcObject = stream;
    $camera.play();

    $camera.onloadedmetadata = () => {
      $root.width = $camera.videoWidth;
      $root.height = $camera.videoHeight;
      initDARK();
    };
  })
  .catch((error) => {
    console.error("An error ocurred on started camera", error);

    $errorVideo.classList.remove("hidde");
    $errorVideo.classList.add("show");
  });
