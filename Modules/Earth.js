class Earth {
    constructor() {
    }

    getEarth() {
        var geometryEarth = new THREE.SphereGeometry(40, 40, 40);
        var ifsc = new THREE.TextureLoader().load('../Images/ifsc.png');
        var meshEarth = new THREE.MeshBasicMaterial({ map: ifsc });
        meshEarth.side = THREE.BackSide;
        var earth = new THREE.Mesh(geometryEarth, meshEarth);

        var geometryGrass = new THREE.CircleGeometry(37, 32);
        var grass = new THREE.TextureLoader().load('../Images/grass.png');
        var meshGrass = new THREE.MeshBasicMaterial({ map: grass });
        var base = new THREE.Mesh(geometryGrass, meshGrass);
        base.rotation.x = -Math.PI / 2;
        base.position.y = -14.7;

        var group = new THREE.Group();
        group.add(earth);
        group.add(base);

        return group;
    }


}