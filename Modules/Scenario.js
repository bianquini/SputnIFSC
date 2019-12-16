class Scenario {

    constructor() {
        //Render Boot
        this.render = new THREE.WebGLRenderer({
            antialias: true
        });
        this.render.setSize(window.innerWidth, window.innerHeight);
        this.render.setClearColor(0x101010);

        //Shadow Boot
        this.render.shadowMap.enabled = true;
        this.render.shadowMap.type = THREE.BasicShadowMap;

        //Canvas Boot
        this.canvas = this.render.domElement;
    }

    buildAmbientLight(x, y, z) {
        this.ambientLight = new THREE.AmbientLight(0xaaaaaa, 1);
        this.ambientLight.position.set(x, y, z);
        return this.ambientLight;
    }

    buildSun(x, y, z) {
        var sunGeometry = new THREE.SphereGeometry(x, y, z);
        var sunMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff00
        });
        var sol = new THREE.Mesh(sunGeometry, sunMaterial);
        sol.castShadow = false;
        sol.receiveShadow = false;
        return sol;
    }

    getRender() {
        return this.render;
    }

    getCanvas() {
        return this.canvas;
    }

    getIFSC() {
        var geometryEarth = new THREE.SphereGeometry(0.4, 40, 40);
        var ifsc = new THREE.TextureLoader().load('../Images/ifsc.png');
        var meshEarth = new THREE.MeshBasicMaterial({ map: ifsc });
        meshEarth.side = THREE.BackSide;
        var earth = new THREE.Mesh(geometryEarth, meshEarth);
        earth.position.z = 13

        var geometryGrass = new THREE.CircleGeometry(0.37, 32);
        var grass = new THREE.TextureLoader().load('../Images/grass.png');
        var meshGrass = new THREE.MeshBasicMaterial({ map: grass });
        var base = new THREE.Mesh(geometryGrass, meshGrass);
        base.rotation.x = -Math.PI / 2;
        base.position.y = -0.15;
        base.position.z = 13;

        var group = new THREE.Group();
        group.add(earth);
        group.add(base);

        return group;
    }


    getPlatform() {
        var geometry = new THREE.BoxGeometry(0.06, 0.2, 0.06);
        var grade = new THREE.TextureLoader().load('../Images/grid.png');
        var material = new THREE.MeshBasicMaterial({ map: grade, transparent: true, side: THREE.DoubleSide });
        var tower = new THREE.Mesh(geometry, material);
        tower.position.x = -0.15;
        tower.position.y = -0.04;
        tower.position.z = 13;

        var geometry = new THREE.BoxGeometry(0.65, 0.25, 0.01);
        var concrete = new THREE.TextureLoader().load('../Images/base.jpg');
        var material = new THREE.MeshBasicMaterial({ map: concrete });
        var base = new THREE.Mesh(geometry, material);
        base.rotation.x = Math.PI / 2;
        base.position.y = -0.145;
        base.position.z = 13;

        var geometry = new THREE.CylinderGeometry(0.03, 0.03, 0.2, 32);
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        var elevator = new THREE.Mesh(geometry, material);
        elevator.position.x = -0.15;
        elevator.position.y = -0.041;
        elevator.position.z = 13;

        var geometry = new THREE.BoxGeometry(0.09, 0.05, 0.05);
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        var tunnelDoor = new THREE.Mesh(geometry, material);
        tunnelDoor.position.x = -0.17;
        tunnelDoor.position.y = -0.115;
        tunnelDoor.position.z = 13;
        tunnelDoor.rotation.x = Math.PI / 2;

        var geometry = new THREE.BoxGeometry(0.07, 0.05, 0.05);
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        var tunnel = new THREE.Mesh(geometry, material);
        tunnel.position.x = -0.12;
        tunnel.position.y = 0.03;
        tunnel.position.z = 13;
        tunnel.rotation.x = Math.PI / 2;

        var geometry = new THREE.PlaneGeometry(0.04, 0.03, 32);
        var doorTexture = new THREE.TextureLoader().load('../Images/door.jpg');
        var material = new THREE.MeshBasicMaterial({ map: doorTexture, side: THREE.DoubleSide });
        var doorBelow = new THREE.Mesh(geometry, material);
        doorBelow.position.x = -0.2159;
        doorBelow.position.y = -0.125;
        doorBelow.position.z = 13;
        doorBelow.rotation.y = Math.PI / 2;

        var geometry = new THREE.PlaneGeometry(0.04, 0.03, 32);
        var doorTexture = new THREE.TextureLoader().load('../Images/door.jpg');
        var material = new THREE.MeshBasicMaterial({ map: doorTexture, side: THREE.DoubleSide });
        var doorUp = new THREE.Mesh(geometry, material);
        doorUp.position.x = -0.084;
        doorUp.position.y = 0.020;
        doorUp.position.z = 13;
        doorUp.rotation.y = Math.PI / 2;

        var group = new THREE.Group();
        group.add(tower);
        group.add(base);
        group.add(elevator);
        group.add(doorBelow);
        group.add(doorUp);
        group.add(tunnelDoor);
        group.add(tunnel);

        return group;
    }

    getSpace(bgScene) {
        var loader = new THREE.TextureLoader();
        var texture = loader.load(
            '../Images/maps/tycho-skymap.jpg',
        );
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearFilter;
        var bgMesh;
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
        return bgMesh;
    }
}