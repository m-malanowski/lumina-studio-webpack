import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';

import greek from '../assets/img/greek.glb';

var dracoLoader = new DRACOLoader();
var gltfLoader = new GLTFLoader();

////AAAADDDDD promise to load draco lin
(async () => {
    // const res = await fetch(`https://api.github.com/users/jameshibbard`);
    // const json = await res.json();
    // console.log(json.public_repos);
    // console.log("Hello!");

    const res = await dracoLoader.setDecoderPath( 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/' );
})();


var camera, scene, renderer;
var controls, model, pointLight2;
var mouse = {
    x: 0,
    y: 0
};
var container = document.querySelector( '#container' );

// Configure and create Draco decoder.


// try {
//     console.log('draco lib now');
// }
// catch(e){
//         console.log(e)
// }

dracoLoader.setDecoderConfig({ type: 'js' });
gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.setDDSLoader( new DDSLoader() );
var loadStartTime = performance.now();

gltfLoader.load(greek, function(geometry){
        model = geometry.scene;

        console.log( 'Load time: ' + ( performance.now() - loadStartTime ).toFixed( 2 ) + ' ms.' );

        scene.add(model);
        geometry.scene.traverse(function(child){
            if (child.isMesh){
                child.material = new THREE.MeshPhongMaterial({
                    color: 0xecebec,
                    specular: 0x000000,
                    shininess: 100
                });
                console.log(child);
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // scene.add(geometry.scene);

        model.position.x = - 4.0;
        model.position.y = -2;
        model.position.z = -1.5;

        model.scale.x = 2.0;

        model.rotation.x += THREE.Math.degToRad(30);
        model.rotation.y += THREE.Math.degToRad(-6);
        model.rotation.z += THREE.Math.degToRad(-1);


    },function(xhr) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function (error) {
        console.log( 'An error happened' );
    }

);

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 0.1, 2000 );
    camera.position.set( 0, 3, 8 );

    scene = new THREE.Scene();

    var pointLight = new THREE.DirectionalLight( 0xffffff, .2 );
    pointLight.position.set(-3,1,-11);

    pointLight.castShadow = true;
    pointLight.shadow.radius = 8;
    pointLight.receiveShadow = true;
    pointLight.shadow.camera.near = 25;
    pointLight.shadow.camera.far = 200;
    pointLight.shadow.camera.left = -50;
    pointLight.shadow.camera.right = 50;
    pointLight.shadow.camera.top = 50;
    pointLight.shadow.camera.bottom = -50;

    scene.add( pointLight );

    pointLight2 = new THREE.PointLight( 0xffffff, .1, 10 );
    pointLight2.position.set(4,2,1);

    pointLight2.castShadow = true;
    pointLight2.shadow.camera.near = .1;
    pointLight2.shadow.camera.far = 60;
    pointLight2.name = 'pointLight';

    pointLight2.shadow.mapSize.width = 1024;
    pointLight2.shadow.mapSize.height = 1024;

    // pointLight2.shadow.bias = - 0.005; // reduces self-shadowing on double-sided objects

    scene.add( pointLight2 );

    document.addEventListener('mousemove', onMouseMove, false);

    // var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    // scene.add( ambientLight );
    //
    // var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
    // directionalLight.position.set( 1, 1, 0 ).normalize();
    // scene.add( directionalLight );

    // renderer
    renderer = new THREE.WebGLRenderer( {  alpha: true, antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMap.type =  THREE.PCFSoftShadowMap;

    // renderer.shadowMapType = THREE.PCFSoftShadowMap

    container.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, true );

    // controls = new OrbitControls( camera, renderer.domElement );
    // controls.addEventListener( 'change', animate ); // use if there is no animation loop
    // // controls.minDistance = 2;
    // // controls.maxDistance = 10;
    // controls.target.set( 0, 0, - 0.2 );
    // controls.update();

}


function onMouseMove(e){
    e.preventDefault();
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;

    // Make the sphere follow the mouse
    var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);
    var dir = vector.sub(camera.position).normalize();
    var distance = -camera.position.z / dir.z;
    var pos = camera.position.clone().add(dir.multiplyScalar(distance));
    //mouseMesh.position.copy(pos);

    pointLight2.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z + 3));

    // console.log(model);
    // model.rotation.x = THREE.Math.degToRad(mouse.x * 2);
    // model.rotation.y = THREE.Math.degToRad(mouse.y * 2);

}


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {

    // var timer = Date.now() * 0.0003;
    //
    // camera.position.x = Math.sin( timer ) * 0.5;
    // camera.position.z = Math.cos( timer ) * 0.5;
    // camera.lookAt( 0, 0, 0 );

    // model.rotation.x += 0.01;

    renderer.render( scene, camera );

}

console.log(renderer.info.render)