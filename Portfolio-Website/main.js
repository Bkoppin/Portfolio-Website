import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(10);
camera.position.setX(0);
camera.position.setY(1);

renderer.render(scene, camera);

const geometry = new THREE.BoxGeometry( 1, 1, 1)
const material = new THREE.MeshStandardMaterial( { color: 0xffffff, wireframe: true });
const box = new THREE.Mesh(geometry, material);
box.position.set(3,3,5)
scene.add(box)


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const loader = new GLTFLoader();

let island;

loader.load( 'Winter Island.glb', function (obj) {
  island = obj.scene;
  console.log(obj)
  scene.add(island);
  island.position.y = -5;
})
//const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);

//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff, wireframe: true });
  const star = new THREE.Mesh( geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

//const spaceTexture = new THREE.TextureLoader().load('99.jpg');
//scene.background = spaceTexture

// how far from the top are we
let t = document.body.getBoundingClientRect().top;

function moveCamera() {
  t = document.body.getBoundingClientRect().top;
  if(t === -4000) {
    addBoxes()
  }

}

function addBoxes() {
  console.log('working')
}

document.body.onscroll = moveCamera
moveCamera()


function animate() {
  requestAnimationFrame( animate );

  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  box.rotation.z += 0.01;
  // controls.update();
  renderer.render(scene, camera);
  island.rotation.y = t * -0.001
}
animate()