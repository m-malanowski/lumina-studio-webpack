import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';
import greek from '../assets/img/greek.glb';
import greekMobile from '../assets/img/main4.png';

let dracoLoader = new DRACOLoader();
let gltfLoader = new GLTFLoader();

let camera, scene, renderer;
let controls, model, pointLight2;
let mouse = {
    x: 0,
    y: 0
};
let container = document.querySelector( '#container' );


export default class HomeScene {

   checkViewPort(){
        let img = document.createElement('img');
        let container = document.querySelector( '#container' );
        container.appendChild(img);
        img.classList.add('greekMobile');

        let fotImg1 = document.querySelector('.greekMobile');
        fotImg1.src = greekMobile;
    }

    loadModel(){
        (async () => {
            const res = await dracoLoader.setDecoderPath( 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/' );
        })();

        dracoLoader.setDecoderConfig({ type: 'js' });
        gltfLoader.setDRACOLoader(dracoLoader);
        gltfLoader.setDDSLoader( new DDSLoader() );
        let loadStartTime = performance.now();

        gltfLoader.load(greek, function(geometry){
                model = geometry.scene;

                console.log( 'Load time: ' + ( performance.now() - loadStartTime ).toFixed( 2 ) + ' ms.' );

                scene.add(model);
                geometry.scene.traverse(function(child){
                    if (child.isMesh){
                        child.geometry.center();
                        child.material = new THREE.MeshPhongMaterial({
                            color: 0xecebec,
                            specular: 0x000000,
                            shininess: 100
                        });
                        // console.log(child);
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                //
                model.position.x = - 1.5;
                model.position.y = 2;
                model.position.z = -1.5;

                model.scale.x = 2.0;
                //
                model.rotation.x += THREE.Math.degToRad(30);
                model.rotation.y += THREE.Math.degToRad(-6);
                model.rotation.z += THREE.Math.degToRad(-1);

            },function(xhr) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            function (error) {
                console.log( 'An error occured' );
            }
        );

    }


    init(){
        camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 0.1, 2000 );
        camera.position.set( 0, 3, 8 );

        scene = new THREE.Scene();

        let pointLight = new THREE.DirectionalLight( 0xffffff, .2 );
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

        pointLight2 = new THREE.PointLight( 0xada8a0, .4, 10 );
        pointLight2.position.set(4,2,1);

        pointLight2.castShadow = true;
        pointLight2.shadow.camera.near = .1;
        pointLight2.shadow.camera.far = 60;
        pointLight2.name = 'pointLight';

        pointLight2.shadow.mapSize.width = 1024;
        pointLight2.shadow.mapSize.height = 1024;

        scene.add( pointLight2 );

        document.addEventListener('mousemove', this.onMouseMove, false);

        // const pyche = document.getElementById('pyche')
        // pyche.addEventListener('click', ()=>{
        //     scene.remove.apply(scene, scene.children);
        // })
        //
        // // window.addEventListener("beforeunload", () =>{
        // // sceneToRemove =  scene.remove.apply(scene, scene.children);
        // //     console.log('scene cleared', sceneToRemove);
        // // });
        // window.onbeforeunload = function(){
        //     scene.remove.apply(scene, scene.children);
        //     console.log('scene cleared');
        // };
        // renderer
        renderer = new THREE.WebGLRenderer( {  alpha: true, antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.shadowMap.enabled = true;
        renderer.shadowMapSoft = true;
        renderer.shadowMap.type =  THREE.PCFSoftShadowMap;

        container.appendChild( renderer.domElement );
        window.addEventListener( 'resize', this.onWindowResize, true );
    }

     onMouseMove(e){
        e.preventDefault();
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;

        let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
        vector.unproject(camera);
        let dir = vector.sub(camera.position).normalize();
        let distance = -camera.position.z / dir.z;
        let pos = camera.position.clone().add(dir.multiplyScalar(distance));
        //mouseMesh.position.copy(pos);

        pointLight2.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z + 3));

    }

     onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

     animate() {
         window.requestAnimationFrame(this.animate.bind(this))
         this.render();
    }

     render() {
        if(model){
            model.rotation.y += 0.0001;
            model.rotation.x += 0.0001;
            model.rotation.z += -0.0001;
        }

        renderer.render( scene, camera );
    }

    destroyOnLeave(){

       try {
           scene.remove.apply(scene, scene.children);
           console.log('Three scene removed');
       }catch (e) {
           console.log(e);
       }

    }


}