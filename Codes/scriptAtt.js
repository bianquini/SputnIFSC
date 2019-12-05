import * as THREE from '../build/three.module.js';
import * as THREE1 from '../three.min.js';
import { FlyControls } from './jsm/controls/FlyControls.js';
import { Lensflare, LensflareElement } from './jsm/objects/Lensflare.js';

var container;
var camera, cena, renderer;
var controls;
var clock = new THREE.Clock();
init();
animate();
function init() {
    container = document.createElement('div');
    document.body.appendChild(container);
    // camera
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 15000);
    camera.position.z = 250;
    // scene
    cena = new THREE.Scene();
    cena.background = new THREE.Color().setHSL(0.51, 0.4, 0.01);
    cena.fog = new THREE.Fog(cena.background, 3500, 15000);

    // lights
    var dirLight = new THREE.DirectionalLight(0xffffff, 0.05);
    dirLight.position.set(0, - 1, 0).normalize();
    dirLight.color.setHSL(0.1, 0.7, 0.5);
    cena.add(dirLight);
    // lensflares
    var textureLoader = new THREE.TextureLoader();
    var textureFlare0 = textureLoader.load('textures/lensflare/lensflare0.png');
    var textureFlare3 = textureLoader.load('textures/lensflare/lensflare3.png');
    addLight(0.55, 0.9, 0.5, 5000, 0, - 1000);
    addLight(0.08, 0.8, 0.5, 0, 0, - 1000);
    addLight(0.995, 0.5, 0.9, 5000, 5000, - 1000);
    function addLight(h, s, l, x, y, z) {
        var light = new THREE.PointLight(0xffffff, 1.5, 2000);
        light.color.setHSL(h, s, l);
        light.position.set(x, y, z);
        cena.add(light);
        var lensflare = new Lensflare();
        lensflare.addElement(new LensflareElement(textureFlare0, 700, 0, light.color));
        lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
        lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
        lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
        lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));
        light.add(lensflare);
    }
    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    //
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    //
    controls = new FlyControls(camera, renderer.domElement);
    controls.movementSpeed = 2500;
    controls.rollSpeed = Math.PI / 6;
    controls.autoForward = false;
    controls.dragToLook = false;

}

function animate() {
    requestAnimationFrame(animate);
    render();
}
function render() {
    var delta = clock.getDelta();
    controls.update(delta);
    renderer.render(cena, camera);
}