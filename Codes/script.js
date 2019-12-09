"use strict";
import { Lensflare, LensflareElement } from '../Modules/lensflare/Lensflare.js';
import particleFire from '../Modules/three-particle-fire/src/three-particle-fire.js';

particleFire.install({ THREE: THREE });

//Inicialização da Cena
var isFireOnScene = false;
var clock = new THREE.Clock();
var cena = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0.3, 0.02, 13);

//Inicialização do Canvas
var cenario = new Scenario();
var render = cenario.getRender();
render.autoClearColor = false;

var canvas = cenario.getCanvas();
document.body.appendChild(canvas);

//Luz Ambiente
var luz = cenario.buildAmbientLight(0, 0, 1);
cena.add(luz);

//Ifsc
var earth = new Earth();
var ifsc = earth.getEarth();
cena.add(ifsc);

//Plataforma
var plataform = earth.getPlataform();
cena.add(plataform);

//Controle de Câmera
var controls = new THREE.OrbitControls(camera, canvas);
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
containerEarth.position.z = 13
cena.add(containerEarth)

var moonMesh = THREEx.Planets.createMoon()
moonMesh.position.set(0, 0.5, 1)
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
var atmosphereMesh = new THREE.Mesh(geometry, material);
atmosphereMesh.position.z = 13
atmosphereMesh.scale.multiplyScalar(1.15);
containerEarth.add(atmosphereMesh);
//Terminando de criar a Terra, Atmosfera e Lua

//Criando Venus
var containerVenus = new THREE.Object3D()
containerVenus.position.z = 7
cena.add(containerVenus)

var venusMesh = THREEx.Planets.create("Venus")
venusMesh.receiveShadow = true
venusMesh.castShadow = true
containerVenus.add(venusMesh)
//Terminando Venus

//Criando Mercurio
var containerMercury = new THREE.Object3D()
containerMercury.position.z = 4
cena.add(containerMercury)

var mercuryMesh = THREEx.Planets.create("Mercury")
mercuryMesh.receiveShadow = true
mercuryMesh.castShadow = true
containerMercury.add(mercuryMesh)
//Terminando Mercurio

//Criando Marte
var containerMars = new THREE.Object3D()
containerMars.position.z = 20
cena.add(containerMars)

var marsMesh = THREEx.Planets.create("Mars")
marsMesh.receiveShadow = true
marsMesh.castShadow = true
containerMars.add(marsMesh)
//Terminando Marte

//Criando Jupiter
var containerJupiter = new THREE.Object3D()
containerJupiter.position.z = 27
cena.add(containerJupiter)

var jupiterMesh = THREEx.Planets.create("Jupiter")
jupiterMesh.receiveShadow = true
jupiterMesh.castShadow = true
containerJupiter.add(jupiterMesh)
//Terminando Jupiter

//Criando Saturno
var containerSaturn = new THREE.Object3D()
containerSaturn.position.z = 32
cena.add(containerSaturn)

var saturnMesh = THREEx.Planets.create("Saturn")
saturnMesh.receiveShadow = true
saturnMesh.castShadow = true
//saturnMesh.getObjectByName("").rotation.y += 0.008;
saturnMesh.rotation.z = 0
containerSaturn.add(saturnMesh)
//Terminando Saturno

//Criando Urano
var containerUranus = new THREE.Object3D()
containerUranus.position.z = 40
cena.add(containerUranus)

var uranusMesh = THREEx.Planets.create("Uranus")
uranusMesh.receiveShadow = true
uranusMesh.castShadow = true
uranusMesh.rotation.z = 0
containerUranus.add(uranusMesh)
//Terminando Urano

//Criando Netuno
var containerNeptune = new THREE.Object3D()
containerNeptune.position.z = 46
cena.add(containerNeptune)

var neptuneMesh = THREEx.Planets.create("Neptune")
neptuneMesh.receiveShadow = true
neptuneMesh.castShadow = true
neptuneMesh.rotation.z = 0
containerNeptune.add(neptuneMesh)
//Terminando Netuno

//Criando Plutao
var containerPluto = new THREE.Object3D()
containerPluto.position.z = 50
cena.add(containerPluto)

var plutoMesh = THREEx.Planets.create("Pluto")
plutoMesh.receiveShadow = true
plutoMesh.castShadow = true
containerPluto.add(plutoMesh)
//Terminando Plutao

//FIXME Decidir se será usado uma luz, ou um objeto 
//Criando Sol
// var containerSun = new THREE.Object3D()
// cena.add(containerSun)

// var sunMesh = THREEx.Planets.create("Sun")
// sunMesh.receiveShadow = true
// sunMesh.castShadow = true
// containerSun.add(sunMesh)
//Terminando Sol

//Orbita de Mercurio
var mercuryOrbit = new THREE.Object3D();
mercuryOrbit.add(containerMercury)

//Orbita de Venus
var venusOrbit = new THREE.Object3D();
venusOrbit.add(containerVenus)

//Orbita da Terra
var earthOrbit = new THREE.Object3D();
earthOrbit.add(containerEarth)
earthOrbit.add(atmosphereMesh)

//Orbita de Marte
var marsOrbit = new THREE.Object3D();
marsOrbit.add(containerMars)

//Orbita de Jupiter
var jupiterOrbit = new THREE.Object3D();
jupiterOrbit.add(containerJupiter)

//Orbita de Saturno
var saturnOrbit = new THREE.Object3D();
saturnOrbit.add(containerSaturn)

//Orbita de Urano
var uranusOrbit = new THREE.Object3D();
uranusOrbit.add(containerUranus)

//Orbita de Netuno
var neptuneOrbit = new THREE.Object3D();
neptuneOrbit.add(containerNeptune)

//Orbita de Plutao
var plutoOrbit = new THREE.Object3D();
plutoOrbit.add(containerPluto)

//Grupo do Sistema Solar
var solarSystem = new THREE.Group();
//solarSystem.add(containerSun);

solarSystem.add(earthOrbit);
solarSystem.add(venusOrbit);
solarSystem.add(mercuryOrbit);
solarSystem.add(marsOrbit);
solarSystem.add(jupiterOrbit);
solarSystem.add(saturnOrbit);
solarSystem.add(saturnOrbit);
solarSystem.add(uranusOrbit);
solarSystem.add(neptuneOrbit);
solarSystem.add(plutoOrbit);

cena.add(solarSystem)

function update() {
    //Rotação dos Corpos Celestes
    containerEarth.rotation.y += 0.004;
    moonMesh.rotation.y += 0.001;
    containerMercury.rotation.y += 0.03;
    containerVenus.rotation.y += 0.04;
    containerMars.rotation.y += 0.02;
    containerJupiter.rotation.y += 0.05;
    containerSaturn.rotation.y += 0.008;
    containerUranus.rotation.y += 0.003;
    containerNeptune.rotation.y += 0.008;
    containerNeptune.rotation.y += 0.009;
    containerPluto.rotation.y += 0.01;

    //containerSun.rotation.y += 0.001;

    //Translação dos Corpos Celestes
    //earthOrbit.rotation.y += 0.001;
    mercuryOrbit.rotation.y += 0.005;
    venusOrbit.rotation.y += 0.003;
    marsOrbit.rotation.y += 0.0008;
    jupiterOrbit.rotation.y += 0.0005;
    saturnOrbit.rotation.y += 0.0003;
    uranusOrbit.rotation.y += 0.0002;
    neptuneOrbit.rotation.y += 0.0001;
    plutoOrbit.rotation.y += 0.00008;
}


// lensflares
var textureLoader = new THREE.TextureLoader();
var textureFlare0 = textureLoader.load('../Images/lensflare/lensflare0.png');
var textureFlare3 = textureLoader.load('../Images/lensflare/lensflare3.png');
addLight(0.08, 0.8, 0.8, 0, 0, - 1000);
function addLight(h, s, l, x, y, z) {
    var light = new THREE.PointLight(0xffffff, 1.5, 2000);
    light.color.setHSL(h, s, l);
    light.position.set(x, y, z);
    var lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement(textureFlare0, 1000, 0, light.color));
    lensflare.addElement(new LensflareElement(textureFlare3, 600, 0.6));
    lensflare.addElement(new LensflareElement(textureFlare3, 700, 0.7));
    lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
    lensflare.addElement(new LensflareElement(textureFlare3, 700, 1));
    light.add(lensflare);
    light.position.z = 0;
    cena.add(light);
}

//Criando Foguete
var gloader = new THREE.GLTFLoader();
var model = new THREE.Scene();
gloader.load('../Models/Rocket.gltf', function (gltf) {

    var rocket = gltf.scene.children[0];
    rocket.position.set(-0.04, -0.05, 13);
    rocket.scale.set(0.02, 0.02, 0.02);
    rocket.rotation.x = Math.PI / 2;
    model = rocket;
    cena.add(gltf.scene);

    //loop para ajustar a camera ao foguete
    window.setInterval(function () {
        controls.target = model.position;
    }, 2000);


}, undefined, function (error) {

    console.error(error);

});

//Terminando de criar Foguete
var teclas = [];

//TODO Posicionar e se movimentar em relação ao foguete

//Criando Fogo do Motor
var fireRadius = 0.01;
var fireHeight = 0.2;
var particleCount = 60;

var geometryFire = new particleFire.Geometry(fireRadius, fireHeight, particleCount);
var materialFire = new particleFire.Material({ color: 0xff2200 });
materialFire.setPerspective(camera.fov, window.innerHeight / 6);
var particleFireMesh = new THREE.Points(geometryFire, materialFire);
particleFireMesh.rotation.x = Math.PI;
//Terminando de criar Fogo do Motor

//Renderiza na Tela
function desenhar() {
    //FIXME Retirar valores de teste, a fazer movimentação do foguete 
    //por comandos do usuário

    movimentoFoguete()
    //FIXME Fazer o fogo rotacionar junto do foguete (quem sabe criar um group para os dois)
    if (particleFireMesh) {
        particleFireMesh.position.set(model.position.x, model.position.y - 0.1, model.position.z - 0.021);
        var delta = clock.getDelta();
        particleFireMesh.material.update(delta);
    }
    bgMesh.position.copy(camera.position);
    render.render(bgScene, camera);
    render.render(cena, camera);
    update()
    controls.update();
    requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);


//Controle Ignição
window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);

function verificaFogo() {
    return !isFireOnScene;
    
}

function keysPressed(evt) {
    teclas[evt.keyCode] = true;

}
function keysReleased(evt) {
    teclas[evt.keyCode] = false;

    cena.remove(particleFireMesh)

}

function movimentoFoguete() {

    //Espaço
    if (teclas[32]) {
        if (verificaFogo()) {
            cena.add(particleFireMesh);
        }
        model.position.y += 0.001;
        camera.position.y = model.position.y;
    }

    //Tecla S
    if(teclas[83]){
        model.rotation.x -= 0.03;
        particleFireMesh.rotation.x -=0.03;
        particleFireMesh.position.x
    }

    //Tecla W
    if(teclas[87]){
        model.rotation.x += 0.03;
    }

    //Tecla A
    if(teclas[65]){
        model.rotation.y += 0.03;
    }

    //Tecla D
    if(teclas[68]){
        model.rotation.y -= 0.03;
    }
}
