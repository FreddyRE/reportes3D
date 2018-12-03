$(  ).ready( () => selectDesarrollo());


var desarrollo_ID;

var selectDesarrollo = () =>  {
	var URL_string = window.location.href
	var url = new URL(URL_string);
	desarrollo_ID = url.searchParams.get("sgs");
	inicializaDAE();
}	


if ( !Detector.webgl ) {
    console.log("WebGL No soportado");
    Detector.addGetWebGLMessage();
 
}else {
    console.log("WebGL soportado");
    
}


var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight-160;

// camera
var VIEW_ANGLE = 60;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 0.05;
var FAR = 2000;


var camera, scene, renderer;
var cameraControls;
var objectsGalerry = [];
var objectsScene = [];
var raycaster;


function inicializaDAE(){
	init();
	fillScene();
	update();
}



function init() {

	$($(".header").find("span")[0]).html(newPage[desarrollo_ID].nombre_desarrollo)
    // renderer
    renderer = new THREE.WebGLRenderer( { preserveDrawingBuffer: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( WIDTH, HEIGHT );

    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(8.840622355168074, 16.87759672672089, 41.13259903249096);

    cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
    raycaster = new THREE.Raycaster();
    raycaster.params.Points.threshold = 0.1;
    cameraControls.target.x=10;
    cameraControls.target.y=4;
    cameraControls.target.z=2;
    cameraControls.enablePan=true;
    // cameraControls.target={x:10, y:4, z:2}

    var container = document.getElementById( 'container' );
    container.appendChild( renderer.domElement );   
    window.addEventListener( 'resize', onWindowResize, false );

    //resetCam();
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


function fillScene() {

    verticalMirror = new THREE.Mirror( renderer, camera, { clipBias: 0.003, textureWidth: WIDTH, textureHeight: HEIGHT, color:0x889999 } );

    ambient = new THREE.AmbientLight(0xffffff,1);
    ambient.name = "ambientLight1";
    ambient.intensity = .5;
    scene.add(ambient);

    light = new THREE.PointLight( 0xffffff, 1, 100 );
    light.position.set( 0, 10, 0 );
    scene.add( light );

    
    light1 = new THREE.PointLight( 0xffffff, 0.2, 100, 2 );
    light1.position.set( 0, 3, 0 );
    light1.visible = true;
    scene.add( light1 );
    

    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    var modeloDae;

    //carga modelo

    
   modeloDae = newPage[desarrollo_ID].modelo
 	

    loader.load( modeloDae, function ( collada ) {

        object1 = collada.scene;

        objectsScene.push(object1);
        scene.add( object1 );
        pintarDeptos();
       

    } );
}


function update() {
    requestAnimationFrame( update );
    render();
    //cubeA.position.set(cameraControls.target.x, cameraControls.target.y, cameraControls.target.z);
    light1.position.set(cameraControls.object.position.x, cameraControls.object.position.y+0.5, cameraControls.object.position.z);

}

function render() {
    renderer.render(scene, camera);
    cameraControls.update();
    camera.updateProjectionMatrix();

}


function pintarDeptos() {


    var getUniqueDepto = new getDataModel3D(object1)

    var deptosToPaint = (getUniqueDepto.getAllMeshesToPaint())
    
    reasignarMaterial(deptosToPaint[1])

}

function reasignarMaterial(t) {

   

    t.material= new THREE.MeshLambertMaterial( { transparent: true, opacity: 1 } );
    t.material.color = {r:255, g:0, b:0} 
    t.material.opacity=.8;
    t.material.name="single";
}