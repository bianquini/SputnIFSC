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
    '../Modules/threex.planets/images/maps/tycho-skymap.jpg',
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
    var plane = new THREE.SphereGeometry(1000, 32, 32);
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

//Criando Venus
var containerVenus = new THREE.Object3D()
containerVenus.rotateZ(-23.4 * Math.PI / 180)
containerVenus.position.z = 1
cena.add(containerVenus)

var venusMesh = THREEx.Planets.create("Venus")
venusMesh.receiveShadow = true
venusMesh.castShadow = true
containerVenus.add(venusMesh)
//Terminando Venus

//Criando Mercurio
var containerMercury = new THREE.Object3D()
containerMercury.rotateZ(-23.4 * Math.PI / 180)
containerMercury.position.z = 2 
cena.add(containerMercury)

var mercuryMesh = THREEx.Planets.create("Mercury")
mercuryMesh.receiveShadow = true
mercuryMesh.castShadow = true
containerMercury.add(mercuryMesh)
//Terminando Mercurio

//Criando Marte
var containerMars = new THREE.Object3D()
containerMars.rotateZ(-23.4 * Math.PI / 180)
containerMars.position.z = -1 
cena.add(containerMars)

var marsMesh = THREEx.Planets.create("Mars")
marsMesh.receiveShadow = true
marsMesh.castShadow = true
containerMars.add(marsMesh)
//Terminando Marte

//Criando Jupiter
var containerJupiter = new THREE.Object3D()
containerJupiter.rotateZ(-23.4 * Math.PI / 180)
containerJupiter.position.z = -3 
cena.add(containerJupiter)

var jupiterMesh = THREEx.Planets.create("Jupiter")
jupiterMesh.receiveShadow = true
jupiterMesh.castShadow = true
containerJupiter.add(jupiterMesh)
//Terminando Jupiter

//Criando Saturno
var containerSaturn = new THREE.Object3D()
containerSaturn.rotateZ(-23.4 * Math.PI / 180)
containerSaturn.position.z = -7 
cena.add(containerSaturn)

var saturnMesh = THREEx.Planets.create("Saturn")
saturnMesh.receiveShadow = true
saturnMesh.castShadow = true
containerSaturn.add(saturnMesh)
//Terminando Saturno

//Criando Urano
var containerUranus = new THREE.Object3D()
containerUranus.rotateZ(-23.4 * Math.PI / 180)
containerUranus.position.z = -10 
cena.add(containerUranus)

var uranusMesh = THREEx.Planets.create("Uranus")
uranusMesh.receiveShadow = true
uranusMesh.castShadow = true
containerUranus.add(uranusMesh)
//Terminando Urano

//Criando Netuno
var containerNeptune = new THREE.Object3D()
containerNeptune.rotateZ(-23.4 * Math.PI / 180)
containerNeptune.position.z = -13 
cena.add(containerNeptune)

var neptuneMesh = THREEx.Planets.create("Neptune")
neptuneMesh.receiveShadow = true
neptuneMesh.castShadow = true
containerNeptune.add(neptuneMesh)
//Terminando Netuno

//Criando Plutao
var containerPluto = new THREE.Object3D()
containerPluto.rotateZ(-23.4 * Math.PI / 180)
containerPluto.position.z = -15 
cena.add(containerPluto)

var plutoMesh = THREEx.Planets.create("Pluto")
plutoMesh.receiveShadow = true
plutoMesh.castShadow = true
containerPluto.add(plutoMesh)
//Terminando Plutao

//Criando Sol
var containerSun = new THREE.Object3D()
containerSun.rotateZ(-23.4 * Math.PI / 180)
containerSun.position.z = 5 
cena.add(containerSun)

var sunMesh = THREEx.Planets.create("Sun")
sunMesh.receiveShadow = true
sunMesh.castShadow = true
containerSun.add(sunMesh)
//Terminando Sol


//Renderiza na Tela
function desenhar() {
    bgMesh.position.copy(camera.position);
    render.render(bgScene, camera);
    render.render(cena, camera);
    controls.update();
    requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);