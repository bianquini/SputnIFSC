class Earth {
    constructor() {
    }

    getEarth() {
        var geometry = new THREE.SphereGeometry(5, 32, 32);
        var material = new THREE.MeshBasicMaterial({ color: 0xffff00 , side: THREE.DoubleSide});
        var earth = new THREE.Mesh(geometry, material);
        return earth;
    }


}