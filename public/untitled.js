var container;
var camera, scene, renderer, controls, mesh;
var mouse = new THREE.Vector2();
var meshR, meshG;
var initF, initR, initG;
var randomPoints = [];
var angle = 0;
var uniforms;
var clock = new THREE.Clock();
var xBox, yBox;

var socket = io.connect('http://localhost:3000');
var xBox;
socket.on('data', function (data) {
  console.log(data.x);
  xBox = data.x;
  yBox = data.y;
  // socket.emit('message', { say: 'hi' });
});

init();
animate();

function init() {
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor(new THREE.Color(0x222222));
	document.body.appendChild( renderer.domElement );
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 0, 0, 1000 );
	controls = new THREE.TrackballControls( camera, renderer.domElement );
	scene.add( new THREE.AmbientLight( 0xffffff ) );
	var light = new THREE.PointLight( 0xffffff );
	light.position.copy( camera.position );
	scene.add( light );

	///////SHADERS/////////

	uniforms = {
        time:       { value: 1.0 },
        resolution: { value: new THREE.Vector2() }
    };

    var shaderMat = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragment_shader' ).textContent
    } );

	///////SHADERS ENDED/////////

	var initialPoints = [];

	for (var i=0; i<20; i++) {
		initialPoints.push( new THREE.Vector3(0,i,i));
	}

	var firstSpline =  new THREE.CatmullRomCurve3( initialPoints );
	firstSettings = {
		steps: 40,
		bevelEnabled: false,
		extrudePath: firstSpline
	};

	var meshFgeom = new THREE.ExtrudeGeometry(drawShape("#f"), firstSettings);
	var meshmat = new THREE.MeshStandardMaterial({color: 0x18e80d});
	initF = new THREE.Mesh(meshFgeom, meshmat);
	initF.rotation.x = Math.PI/360 * -90;
	initF.rotation.y = Math.PI/360 * 330;
	initF.rotation.z = Math.PI/360 * -40;
	initF.position.setX(-500);
	scene.add(initF);

	var meshRgeom = new THREE.ExtrudeGeometry(drawShape("#r"), firstSettings);
	initR = new THREE.Mesh(meshRgeom, meshmat);
	initR.rotation.x = Math.PI/360 * -120;
	initR.rotation.y = Math.PI/360 * 360;
	initR.rotation.z = Math.PI/360 * -50;
	initR.position.setX(-300);
	scene.add(initR);

	var meshRgeom = new THREE.ExtrudeGeometry(drawShape("#g"), firstSettings);
	initG = new THREE.Mesh(meshRgeom, meshmat);
	initG.rotation.x = Math.PI/360 * -120;
	initG.rotation.y = Math.PI/360 * 360;
	initG.rotation.z = Math.PI/360 * 50;
	initG.position.setX(100);
	scene.add(initG);

	var donut = new THREE.TorusGeometry( 60, 20, 20, 80 );
	mesh = new THREE.Mesh( donut, shaderMat );
	mesh.rotateY(Math.PI/360 * 270);
	mesh.rotateX(Math.PI/360 * 60);
	mesh.position.setX(-50);
    scene.add( mesh );

}

document.onmousemove = function(event){
	var rect = renderer.domElement.getBoundingClientRect();
	mouse.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1;
	mouse.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1;

	var normX = normalize(mouse.x);
	var normY = normalize(mouse.y);

	//use mouse movement (fucked up backwards)
	// randomPoints.push( new THREE.Vector3( 
	// 	0,
	// 	Math.cos(normX*10)*100,
	// 	normX * -1000
	// ));

	//use angle 
	// angle += 0.1;
	// randomPoints.push( new THREE.Vector3( 
	// 	0,
	// 	Math.sin(angle)*100,
	// 	angle * -100
	// 	));
	// if (normX > 0.99 || normX < 0.01) {
	// 	randomPoints = [];
	// 	angle = 0;
	// }

	if (normX > 0.5 && randomPoints.length > 0) {
		intrude();

	} else if (normX < 0.5) {
		extrude();
	}

	if( randomPoints.length > 3) {
		scene.remove(initR);
		scene.remove(initG);
	}
}

function extrude() {
	angle += 0.1;
	randomPoints.push( new THREE.Vector3( 
		0,
		Math.sin(angle)*100,
		angle * -100
	));
}

function intrude() {
	angle -= 0.1;
	randomPoints.pop();
	if(randomPoints.length < 1) {
		angle = 0;
		scene.add(initR);
		scene.add(initG);
	}
}

function normalize(val) {
	return (val + 1)/2;
}

function drawShape(id) {
	var svgString = document.querySelector(id).getAttribute("d");
	var shape = transformSVGPathExposed(svgString);
	return shape;
}

function createMesh(geom, x, deg) {
	var meshMaterial = new THREE.MeshStandardMaterial({color: 0x18e80d});
	meshMaterial.side = THREE.DoubleSide;
	mesh = new THREE.Mesh(geom, meshMaterial);
	mesh.rotation.z = Math.PI;
	mesh.rotation.x = Math.PI/360 * 45;
	mesh.rotation.y = Math.PI/360 * deg;
	mesh.position.setX(x);
	return mesh;
}

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
	update();
}

var count = 0;

function update() {
	var delta = clock.getDelta();
	uniforms.time.value += delta*0.8;

	mesh.position.setX(xBox);
	mesh.position.setY(yBox);

	 // scene clear
	 scene.remove(meshR);
	 scene.remove(meshG);

	// initR.rotation.z = Math.PI/360 * count++;
	// console.log(count);

	 // scene update
	 if ( randomPoints.length < 2) {
	 	return;
	 }

	 randomSpline =  new THREE.CatmullRomCurve3( randomPoints );
	 extrudeSettings = {
	 	steps: 40,
	 	bevelEnabled: false,
	 	extrudePath: randomSpline
	 };

	 meshR = createMesh(new THREE.ExtrudeGeometry(drawShape("#r"), extrudeSettings), -300, 60);
	 meshG = createMesh(new THREE.ExtrudeGeometry(drawShape("#g"), extrudeSettings), 100, -60);

	 if (randomPoints.length > 50) {
	 	randomPoints.splice(0,1);
	 }

	 // scene render
	 scene.add(meshR);
	 scene.add(meshG);
	}
