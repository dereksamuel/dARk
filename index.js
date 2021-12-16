import * as THREE from "https://cdn.skypack.dev/three@latest";
import { OrbitControls } from "https://cdn.skypack.dev/three@latest/examples/jsm/controls/OrbitControls.js";
import { initArrow } from "./particles.js";

const $root = document.querySelector("canvas#root");

const $camera = document.getElementById("camera");
const $errorVideo = document.getElementById("errorVideo");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas: $root });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

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

window.addEventListener("deviceorientation", function(event) {
  if (event.absolute) {
    alert("the angle of the device is now " , event.alpha, event.beta, event.gamma);
  } else {this.alert("No absolute")}
}, true);

function initDARK() {
  const texture = new THREE.VideoTexture($camera);

  const geometry = new THREE.ConeGeometry(0.2, 0.5, 20);
  const material = new THREE.MeshBasicMaterial({
    color: "royalblue",
  });

  const arrow = new THREE.Mesh(geometry, material);
  scene.add(camera);
  camera.add(arrow);

  arrow.scale.set(0.5, 0.5, 0.5);
  arrow.position.set(0, -0.5, -1);

  const geometry2 = new THREE.ConeGeometry(0.5, 20, 3);
  const material2 = new THREE.MeshBasicMaterial({
    color: "red",
  });

  const arrow2 = new THREE.Mesh(geometry2, material2);
  scene.add(arrow2);
  arrow2.position.set(0, 0, -1);

  // SCENES BACKGROUND

  scene.background = texture;
  camera.position.z = 1;

  const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  animate();
}

navigator.mediaDevices.getUserMedia(constrains)
  .then((stream) => {
    $camera.srcObject = stream;
    $camera.play();

    $camera.onloadedmetadata = () => {
      initDARK();

      window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    };
  })
  .catch((error) => {
    console.error("An error ocurred on started camera", error);

    $errorVideo.classList.remove("hidde");
    $errorVideo.classList.add("show");
  });


// import { OrbitControls } from "https://cdn.skypack.dev/three@latest/examples/jsm/controls/OrbitControls.js";