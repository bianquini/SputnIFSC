"use strict";
//Inicialização da Cena
var cena = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 3);

//Inicialização do Canvas
var cenario = new Scenario();
var render = cenario.getRender();
var canvas = cenario.getCanvas();
document.body.appendChild(canvas);
var controls = new THREE.OrbitControls( camera, canvas );

//controls.update() must be called after any manual changes to the camera's transform
controls.update();


//Luz Ambiente
var luz = cenario.buildAmbientLight(0, 0, 1);
cena.add(luz);

//Renderiza na Tela
function desenhar() {
    render.render(cena, camera);
    controls.update();
    requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);