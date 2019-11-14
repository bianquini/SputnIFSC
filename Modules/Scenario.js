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


    buildBackgroundImage(imgPath, x, y, z) {
        var texture = new THREE.TextureLoader().load(imgPath);
        var backgroundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(x, y, z),
            new THREE.MeshPhongMaterial({
                map: texture
            }));
        backgroundMesh.receiveShadow = true;
        return backgroundMesh;
    }

    getRender() {
        return this.render;
    }

    getCanvas() {
        return this.canvas;
    }
}