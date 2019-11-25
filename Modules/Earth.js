class Earth {
    constructor() {
    }

    getEarth() {
        var geometry = new THREE.SphereGeometry(40, 40, 40);
        var chao = new THREE.TextureLoader().load('../Images/ifsc2.png');
        var mesh = new THREE.MeshBasicMaterial({ map: chao });

        mesh.side = THREE.BackSide;
        var earth = new THREE.Mesh(geometry, mesh);
        return earth;
    }


}