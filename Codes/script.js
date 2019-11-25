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

//Luz Ambiente
var luz = cenario.buildAmbientLight(0, 0, 1);
cena.add(luz);

//Controle de Câmera
var controls = new THREE.OrbitControls(camera, canvas);
//controls.update() must be called after any manual changes to the camera's transform
controls.update();


//Iniciando Textura do Espaço
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
    var plane = new THREE.BoxBufferGeometry(80, 80, 80);
    bgMesh = new THREE.Mesh(plane, material);
    bgScene.add(bgMesh);
}

//Criando a Terra, Atmosfera e Lua
var containerEarth = new THREE.Object3D()
containerEarth.rotateZ(-23.4 * Math.PI / 180)
containerEarth.position.z = 0
cena.add(containerEarth)

var moonMesh = THREEx.Planets.createMoon()
moonMesh.position.set(0.5, 0.5, 0.5)
moonMesh.scale.multiplyScalar(1 / 5)
moonMesh.receiveShadow = true
moonMesh.castShadow = true
containerEarth.add(moonMesh)

var earthMesh = THREEx.Planets.create("Earth")
earthMesh.receiveShadow = true
earthMesh.castShadow = true
containerEarth.add(earthMesh)

var geometry = new THREE.SphereGeometry(0.38, 32, 32)
var material = THREEx.createAtmosphereMaterial()
material.side = THREE.BackSide
material.uniforms.glowColor.value.set(0x00090ff)
material.uniforms.coeficient.value = 0.5
material.uniforms.power.value = 4.0
var mesh = new THREE.Mesh(geometry, material);
mesh.scale.multiplyScalar(1.15);
containerEarth.add(mesh);

//Terminando de criar a Terra, Atmosfera e Lua

//Renderiza na Tela
function desenhar() {
    bgMesh.position.copy(camera.position);
    render.render(bgScene, camera);
    render.render(cena, camera);
    controls.update();
    requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);