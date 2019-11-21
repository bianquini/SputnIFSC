"use strict";
//Inicialização da Cena
var cena = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 3);

//Inicialização do Canvas
var cenario = new Scenario();
var render = cenario.getRender();
render.autoClearColor = false;
var canvas = cenario.getCanvas();
document.body.appendChild(canvas);

var controls = new THREE.OrbitControls( camera, canvas );

//controls.update() must be called after any manual changes to the camera's transform
controls.update();

// var controls = new THREE.OrbitControls(camera, canvas);
// controls.target.set(0, 0, 0);
// controls.update();

//Luz Ambiente
var luz = cenario.buildAmbientLight(0, 0, 1);
cena.add(luz);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var materialCubo = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, materialCubo);
cube.position.z = -5;
cena.add(cube);

var loader = new THREE.TextureLoader();
var texture = loader.load(
    '../Textures/Space.jpg',
);
texture.magFilter = THREE.LinearFilter;
texture.minFilter = THREE.LinearFilter;

var bgScene = new THREE.Scene();
var bgMesh;
{

    var shader = THREE.ShaderLib.equirect;
    var material = new THREE.ShaderMaterial({
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: THREE.BackSide,
    });
    material.uniforms.tEquirect.value = texture;
    var plane = new THREE.BoxBufferGeometry(2, 2, 2);
    bgMesh = new THREE.Mesh(plane, material);
    bgScene.add(bgMesh);
}

//Renderiza na Tela
function desenhar() {
    bgMesh.position.copy(camera.position);
    render.render(bgScene, camera);
    render.render(cena, camera);
    controls.update();
    requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);