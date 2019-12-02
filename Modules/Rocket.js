// class Rocket {

//     constructor() {
//     }
//     buildRocket() {
//         var gloader = new THREE.GLTFLoader();
//         gloader.load('../Models/rocket.gltf', function (gltf) {
//             var rocket = gltf.scene.children[0];
//             rocket.position.set(0.03, 0.1, 0);
//             rocket.scale.set(0.05, 0.05, 0.05);
//             rocket.rotation.x = Math.PI / 2;
//             cena.add(gltf.scene);

//             return gltf.scene;

//         }, undefined, function (error) {

//             console.error(error);

//         });
//     }

// }