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

function initDARK() {
  const texture = new THREE.VideoTexture($camera);

  const geometry = new THREE.ConeGeometry(2, 5, 3);
  const material = new THREE.MeshBasicMaterial( {
    color: "royalblue",
  } );

  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = 0;
  cube.position.y = 0;
  cube.position.z = -10;
  scene.add(cube);

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