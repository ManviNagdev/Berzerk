
// scene object variables
var renderer, scene, camera, pointLight, spotLight;
//player variables
var playerWidth, playerHeight, playerDepth;

// field variables
var fieldWidth = 1000, fieldHeight = 800;
// game-related variables
var score1 = 0;

var playerDirX = 0, playerSpeed=1, playerDirY = 0;
var faceDirX = 0, faceDirY = 0;
var walls = [];
var bullets = [];
var addBullet;
var fire = 0;
var faceX = [];
var faceY = [];
var enemy = [];

var dir = 0;
var time = 0;
var enemyBullet = [];
var enemyFaceX = 0;
var enemyFaceY = 0;
// ------------------------------------- //
// ------- GAME FUNCTIONS -------------- //
// ------------------------------------- //

function setup()
{
	// now reset player scores
	score1 = 0;
	// set up all the 3D objects in the scene
	createScene();
	// and let's get cracking!
	draw();
}

function createScene()
{
	// set the scene size
	var WIDTH = 800,
	  HEIGHT = 600;

	// set some camera attributes
	var VIEW_ANGLE = 90,
	  ASPECT = WIDTH / HEIGHT,
	  NEAR = 0.1,
	  FAR = 10000;

	var c = document.getElementById("gameCanvas");

	// create a WebGL renderer, camera
	// and a scene
	renderer = new THREE.WebGLRenderer();
	camera =
	  new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR);

	scene = new THREE.Scene();

	// add the camera to the scene
	scene.add(camera);

	// set a default position for the camera
	// not doing this somehow messes up shadow rendering
	camera.position.z = 400;
	var listener = new THREE.AudioListener();
	camera.add( listener );
	var sound = new THREE.Audio( listener );

//load a sound and set it as the Audio object's buffer
var audioLoader = new THREE.AudioLoader();

audioLoader.load( 'random.ogg', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.3 );
	sound.play();
});
	// start the renderer
	renderer.setSize(WIDTH, HEIGHT);

	// attach the render-supplied DOM element
	c.appendChild(renderer.domElement);

	// set up the playing surface plane
	var planeWidth = fieldWidth,
		planeHeight = fieldHeight,
		planeQuality = 10;
		var texture = new THREE.TextureLoader().load( 'robot.png' );

		// immediately use the texture for material creation
		var material = new THREE.MeshBasicMaterial( { map: texture } );
	// create the plane's material
	var planeMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x000000
		});
	// create the player's material
	var playerMaterial =
	new THREE.MeshLambertMaterial(
	{
	    color: 0x4BD121
	});
	// create the pillar's material
	var wallMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x7c40ff
		});
	// create the ground's material
	var groundMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x111111
		});
	var enemyMaterial =
		new THREE.MeshLambertMaterial(
		{
			    color: 0xE05A00
		});
		var topWall = new THREE.Mesh(

		  new THREE.CubeGeometry(
		  900,
		  30,
		  30,
		  1,
		  1,
		  1 ),

		  wallMaterial);

		topWall.position.x = 0;
		topWall.position.y = 350;
		topWall.position.z = 0;
		topWall.castShadow = true;
		topWall.receiveShadow = true;
		scene.add(topWall);
		walls.push(topWall);
		var sideWall1 = new THREE.Mesh(

		  new THREE.CubeGeometry(
		  30,
		  700,
		  30,
		  1,
		  1,
		  1 ),

		  wallMaterial);

		sideWall1.position.x = -436;
		sideWall1.position.y = 0;
		sideWall1.position.z = 0;
		sideWall1.castShadow = true;
		sideWall1.receiveShadow = true;
		scene.add(sideWall1);
		walls.push(sideWall1);

		var sideWall2 = new THREE.Mesh(

		  new THREE.CubeGeometry(
		  30,
		  700,
		  30,
		  1,
		  1,
		  1 ),

		  wallMaterial);

		sideWall2.position.x = 436;
		sideWall2.position.y = 0;
		sideWall2.position.z = 0;
		sideWall2.castShadow = true;
		sideWall2.receiveShadow = true;
		scene.add(sideWall2);
		walls.push(sideWall2);
		var sideWall3 = new THREE.Mesh(

			new THREE.CubeGeometry(
			30,
			400,
			30,
			1,
			1,
			1 ),

			wallMaterial);

		sideWall3.position.x = 250;
		sideWall3.position.y = 30;
		sideWall3.position.z = 0;
		sideWall3.castShadow = true;
		sideWall3.receiveShadow = true;
		scene.add(sideWall3);
		walls.push(sideWall3);
		var sideWall4 = new THREE.Mesh(

			new THREE.CubeGeometry(
			30,
			400,
			30,
			1,
			1,
			1 ),

			wallMaterial);

		sideWall4.position.x = -250;
		sideWall4.position.y = 30;
		sideWall4.position.z = 0;
		sideWall4.castShadow = true;
		sideWall4.receiveShadow = true;
		scene.add(sideWall4);
		walls.push(sideWall4);
		var sideWall5 = new THREE.Mesh(

			new THREE.CubeGeometry(
			500,
			30,
			30,
			1,
			1,
			1 ),

			wallMaterial);

		sideWall5.position.x = 0;
		sideWall5.position.y = 30;
		sideWall5.position.z = 0;
		sideWall5.castShadow = true;
		sideWall5.receiveShadow = true;
		scene.add(sideWall5);
		walls.push(sideWall5);
		var sideWall6 = new THREE.Mesh(

			new THREE.CubeGeometry(
			300,
			30,
			30,
			1,
			1,
			1 ),

			wallMaterial);

		sideWall6.position.x = -280;
		sideWall6.position.y = -335;
		sideWall6.position.z = 0;
		sideWall6.castShadow = true;
		sideWall6.receiveShadow = true;
		scene.add(sideWall6);
		walls.push(sideWall6);
		var sideWall7 = new THREE.Mesh(

			new THREE.CubeGeometry(
			300,
			30,
			30,
			1,
			1,
			1 ),

			wallMaterial);

		sideWall7.position.x = 280;
		sideWall7.position.y = -335;
		sideWall7.position.z = 0;
		sideWall7.castShadow = true;
		sideWall7.receiveShadow = true;
		scene.add(sideWall7);
		walls.push(sideWall7);

		playerWidth = 20;
		playerHeight = 30;
		playerDepth = 10;

		// set up paddle 1
		player = new THREE.Mesh(
		  new THREE.CubeGeometry(
			playerWidth,
			playerHeight,
			playerDepth,
			1,
			1,
			1),
		  playerMaterial);

		scene.add(player);
		player.position.x = -330;
		player.position.z = 0;

		var enemy1 = new THREE.Mesh(

			new THREE.CubeGeometry(
			20,
			30,
			10,
			1,
			1,
			1 ),

			enemyMaterial);

		enemy1.position.x = -220;
		enemy1.position.y = -220;
		enemy1.position.z = 0;
		enemy1.castShadow = true;
		enemy1.receiveShadow = true;
		scene.add(enemy1);
		enemy.push(enemy1);
		var enemy2 = new THREE.Mesh(

			new THREE.CubeGeometry(
			20,
			30,
			10,
			1,
			1,
			1 ),

			enemyMaterial);

		enemy2.position.x = -50;
		enemy2.position.y = -150;
		enemy2.position.z = 0;
		enemy2.castShadow = true;
		enemy2.receiveShadow = true;
		scene.add(enemy2);
		enemy.push(enemy2);

		var enemy3 = new THREE.Mesh(

			new THREE.CubeGeometry(
			20,
			30,
			10,
			1,
			1,
			1 ),

			enemyMaterial);

		enemy3.position.x = 50;
		enemy3.position.y = 150;
		enemy3.position.z = 0;
		enemy3.castShadow = true;
		enemy3.receiveShadow = true;
		scene.add(enemy3);
		enemy.push(enemy3);

		var enemy4 = new THREE.Mesh(

			new THREE.CubeGeometry(
			20,
			30,
			10,
			1,
			1,
			1 ),

			enemyMaterial);

		enemy4.position.x = 350;
		enemy4.position.y = 0;
		enemy4.position.z = 0;
		enemy4.castShadow = true;
		enemy4.receiveShadow = true;
		scene.add(enemy4);
		enemy.push(enemy4);

		var enemy5 = new THREE.Mesh(

			new THREE.CubeGeometry(
			20,
			30,
			10,
			1,
			1,
			1 ),

			enemyMaterial);

		enemy5.position.x = -150;
		enemy5.position.y = 100;
		enemy5.position.z = 0;
		enemy5.castShadow = true;
		enemy5.receiveShadow = true;
		scene.add(enemy5);
		enemy.push(enemy5);

		var enemy6 = new THREE.Mesh(

			new THREE.CubeGeometry(
			20,
			30,
			10,
			1,
			1,
			1 ),

			enemyMaterial);

		enemy6.position.x = 340;
		enemy6.position.y = -250;
		enemy6.position.z = 0;
		enemy6.castShadow = true;
		enemy6.receiveShadow = true;
		scene.add(enemy6);
		enemy.push(enemy6);

	var ground = new THREE.Mesh(

	  new THREE.CubeGeometry(
	  1000,
	  1000,
	  3,
	  1,
	  1,
	  1 ),

	  groundMaterial);
    // set ground to arbitrary z position to best show off shadowing
	ground.position.z = 0;
	ground.receiveShadow = true;
	scene.add(ground);
	e = enemy;


	// // create a point light
	pointLight =
	  new THREE.PointLight(0xF8D898);

	// set its position
	pointLight.position.x = -1000;
	pointLight.position.y = 0;
	pointLight.position.z = 1000;
	pointLight.intensity = 2.5;
	pointLight.distance = 10000;
	// add to the scene
	scene.add(pointLight);

	// add a spot light
	// this is important for casting shadows
	// MAGIC SHADOW CREATOR DELUXE EDITION with Lights PackTM DLC
	renderer.shadowMapEnabled = true;
}

function draw()
{
	// draw THREE.JS scene
	renderer.render(scene, camera);
	// loop draw function call
	time++;
	requestAnimationFrame(draw);
	if(enemy.length == 0){
		 document.getElementById("winnerBoard").innerHTML = "Refresh to play again";

	}else{
	playerMovement();

  fireBullet();

	fireEnemyBullet();
	detectCollisions();
	if(time == 50){
		time = 0;
		enemyMovement();

	}
	bulletCollision();
	changeLevel();
}
}
function resetEnemies(){
	for(var i = 0; i < enemy.length; i++)
		scene.remove(enemy[i]);
	for(var i = 0; i < bullets.length; i++)
		scene.remove(bullets[i]);
	scene.remove(enemyBullet[0]);
	enemy = [];
	bullets = [];
	faceX = [];
	faceY = [];
	enemyBullet = [];

	var enemyMaterial =
		new THREE.MeshLambertMaterial(
		{
			    color: 0xE05A00
		});
	var enemy1 = new THREE.Mesh(

		new THREE.CubeGeometry(
		20,
		30,
		10,
		1,
		1,
		1 ),

		enemyMaterial);

	enemy1.position.x = -220;
	enemy1.position.y = -220;
	enemy1.position.z = 0;
	enemy1.castShadow = true;
	enemy1.receiveShadow = true;
	scene.add(enemy1);
	enemy.push(enemy1);
	var enemy2 = new THREE.Mesh(

		new THREE.CubeGeometry(
		20,
		30,
		10,
		1,
		1,
		1 ),

		enemyMaterial);

	enemy2.position.x = -50;
	enemy2.position.y = -150;
	enemy2.position.z = 0;
	enemy2.castShadow = true;
	enemy2.receiveShadow = true;
	scene.add(enemy2);
	enemy.push(enemy2);

	var enemy3 = new THREE.Mesh(

		new THREE.CubeGeometry(
		20,
		30,
		10,
		1,
		1,
		1 ),

		enemyMaterial);

	enemy3.position.x = 50;
	enemy3.position.y = 150;
	enemy3.position.z = 0;
	enemy3.castShadow = true;
	enemy3.receiveShadow = true;
	scene.add(enemy3);
	enemy.push(enemy3);

	var enemy4 = new THREE.Mesh(

		new THREE.CubeGeometry(
		20,
		30,
		10,
		1,
		1,
		1 ),

		enemyMaterial);

	enemy4.position.x = 350;
	enemy4.position.y = 0;
	enemy4.position.z = 0;
	enemy4.castShadow = true;
	enemy4.receiveShadow = true;
	scene.add(enemy4);
	enemy.push(enemy4);

	var enemy5 = new THREE.Mesh(

		new THREE.CubeGeometry(
		20,
		30,
		10,
		1,
		1,
		1 ),

		enemyMaterial);

	enemy5.position.x = -150;
	enemy5.position.y = 100;
	enemy5.position.z = 0;
	enemy5.castShadow = true;
	enemy5.receiveShadow = true;
	scene.add(enemy5);
	enemy.push(enemy5);

	var enemy6 = new THREE.Mesh(

		new THREE.CubeGeometry(
		20,
		30,
		10,
		1,
		1,
		1 ),

		enemyMaterial);

	enemy6.position.x = 340;
	enemy6.position.y = -250;
	enemy6.position.z = 0;
	enemy6.castShadow = true;
	enemy6.receiveShadow = true;
	scene.add(enemy6);
	enemy.push(enemy6);
}

// Handles CPU paddle movement and logic
function enemyMovement()
{

	for(var i = 0; i < enemy.length; i++) {
		dir = Math.floor(Math.random() * Math.floor(4));
		//console.log(dir);
		if(dir === 0){
			enemy[i].position.x += 10;
		}
		else if(dir === 1){
			enemy[i].position.x -= 10;
		}
		else if(dir === 2){
			enemy[i].position.y += 10;
		}
		else if (dir===3 ){
			enemy[i].position.y -= 10;
		}

			for(var index = 0; index < walls.length; index++){
				if(( (enemy[i].position.x) <= (walls[index].position.x + walls[index].geometry.parameters.width / 2) && (enemy[i].position.x ) >= (walls[ index ].position.x - walls[ index ].geometry.parameters.width / 2)) &&
						( (enemy[i].position.y ) <= (walls[ index ].position.y + walls[index].geometry.parameters.height / 2) && (enemy[i].position.y ) >= (walls[ index ].position.y - walls[ index ].geometry.parameters.height / 2)) &&
						( (enemy[i].position.z ) <= (walls[ index ].position.z + walls[index].geometry.parameters.width / 2) && (enemy[i].position.z ) >= (walls[ index ].position.z - walls[ index ].geometry.parameters.width / 2) )) {

							if(dir === 0){
								enemy[i].position.x -= 10;
							}
							else if(dir === 1){
								enemy[i].position.x += 10;
							}
							else if(dir === 2){
								enemy[i].position.y -= 10;
							}
							else if (dir === 3 ){
								enemy[i].position.y += 10;
							}
				}
			}


	}
}


// Handles player's paddle movement
 function playerMovement()
{
	// move left
	if (Key.isDown(Key.A))
	{
		if (player.position.x > -fieldWidth * 0.45)
		{
			playerDirX = -playerSpeed * 1;
			playerDirY = 0;
			faceDirX = -1;
			faceDirY = 0;
		}

	}
	// move right
	else if (Key.isDown(Key.D))
	{

		if (player.position.x < fieldWidth * 0.45)
		{
			playerDirX = playerSpeed * 1;
			playerDirY = 0;
			faceDirX = 1;
			faceDirY = 0;
		}

	}

	else if (Key.isDown(Key.W))
	{

		if (player.position.y < 330)
		{
			playerDirY = playerSpeed * 1;
			playerDirX = 0;
			faceDirY = 1;
			faceDirX = 0;
		}

	}
	else if (Key.isDown(Key.S))
	{

			playerDirY = -playerSpeed * 1;
			playerDirX = 0;
			faceDirY = -1;
			faceDirX = 0;


	}
	else if (Key.isDown(Key.SPACE))
	{

		if(fire === 0){
			//fire = 0;
			fire = 1;
			addBullet=	new THREE.Mesh(new THREE.SphereGeometry(5, 15, 15), new THREE.MeshLambertMaterial(
			{
			    color: 0x1D8ECE
			}));
			var listener2 = new THREE.AudioListener();
			camera.add( listener2 );
			var sound2 = new THREE.Audio( listener2);

			// load a sound and set it as the Audio object's buffer
			var audioLoader2 = new THREE.AudioLoader();

			audioLoader2.load( 'Shoot_00.mp3', function( buffer ) {
			sound2.setBuffer( buffer );
		//	sound2.setLoop( true );
			sound2.setVolume( 1.0 );
			sound2.play();
			});
			addBullet.position.x = player.position.x;
			addBullet.position.y = player.position.y;
			addBullet.position.z = 0;
			scene.add(addBullet);
			bullets.push(addBullet);
			faceX.push(faceDirX);
			faceY.push(faceDirY);
		}
	}

	else
	{
		// stop the paddle
		playerDirX = 0;
		playerDirY = 0;
		fire = 0;
	}
	player.position.x += playerDirX;
	player.position.y += playerDirY;

}


function detectCollisions() {
  // Get the user's current collision area.
  var bounds = {
    xMin: player.position.x - player.geometry.parameters.width / 2,
    xMax: player.position.x + player.geometry.parameters.width / 2,
    yMin: player.position.y - player.geometry.parameters.height / 2,
    yMax: player.position.y + player.geometry.parameters.height / 2,
    zMin: player.position.z - player.geometry.parameters.width / 2,
    zMax: player.position.z + player.geometry.parameters.width / 2,
  };

for ( var index = 0; index < walls.length; index ++ ) {

      if (( bounds.xMin <= (walls[index].position.x + walls[index].geometry.parameters.width / 2) && bounds.xMax >= (walls[ index ].position.x - walls[ index ].geometry.parameters.width / 2)) &&
         ( bounds.yMin <= (walls[ index ].position.y + walls[index].geometry.parameters.height / 2) && bounds.yMax >= (walls[ index ].position.y - walls[ index ].geometry.parameters.height / 2)) &&
         ( bounds.zMin <= (walls[ index ].position.z + walls[index].geometry.parameters.width / 2) && bounds.zMax >= (walls[ index ].position.z - walls[ index ].geometry.parameters.width / 2) )) {

 		resetPlayer();
      }
  }

	for ( var index = 0; index < enemy.length; index ++ ) {

	      if (( bounds.xMin <= (enemy[index].position.x + enemy[index].geometry.parameters.width / 2) && bounds.xMax >= (enemy[ index ].position.x - enemy[ index ].geometry.parameters.width / 2)) &&
	         ( bounds.yMin <= (enemy[ index ].position.y + enemy[index].geometry.parameters.height / 2) && bounds.yMax >= (enemy[ index ].position.y - enemy[ index ].geometry.parameters.height / 2)) &&
	         ( bounds.zMin <= (enemy[ index ].position.z + enemy[index].geometry.parameters.width / 2) && bounds.zMax >= (enemy[ index ].position.z - enemy[ index ].geometry.parameters.width / 2) )) {

	 		resetPlayer();
	      }
	  }
//console.log(enemyBullet[0].position.x);
		if(enemyBullet.length>0){
					if (( bounds.xMin <= (enemyBullet[0].position.x) && bounds.xMax >= (enemyBullet[0].position.x )) &&
						 ( bounds.yMin <= (enemyBullet[0].position.y ) && bounds.yMax >= (enemyBullet[0].position.y )) &&
						 ( bounds.zMin <= (enemyBullet[0].position.z ) && bounds.zMax >= (enemyBullet[0].position.z ))) {
						// We hit a solid object! Stop all movements.
					//  Game Over

						resetPlayer();
						scene.remove(enemyBullet[0]);
						enemyBullet.splice(0,1);

					}
				}
}

function fireBullet(){

		for (var i = 0; i<bullets.length; i++){
		//	console.log(0, bullets[0].position.x, bullets[0].position.y);

			bullets[i].position.x +=1.4*faceX[i];
			bullets[i].position.y +=1.4*faceY[i];
		}
}

function fireEnemyBullet(){
	addEnemyBullet=	new THREE.Mesh(new THREE.SphereGeometry(5, 15, 15), new THREE.MeshLambertMaterial(
	{
			color: 0xA9A9A9
	}));
	var randomEnemy = Math.floor(Math.random() * Math.floor(enemy.length));
	if(enemy.length >0){
	addEnemyBullet.position.x = enemy[randomEnemy].position.x;
	addEnemyBullet.position.y = enemy[randomEnemy].position.y;
	addEnemyBullet.position.z = 0;
}
	if(enemyBullet.length==0)
{
	var listener2 = new THREE.AudioListener();
	camera.add( listener2 );
	var sound2 = new THREE.Audio( listener2);

	// load a sound and set it as the Audio object's buffer
	var audioLoader2 = new THREE.AudioLoader();

	audioLoader2.load( 'Shoot_01.mp3', function( buffer ) {
	sound2.setBuffer( buffer );
	//	sound2.setLoop( true );
	sound2.setVolume( 1.0 );
	sound2.play();
	});
	scene.add(addEnemyBullet);
		enemyBullet.push(addEnemyBullet);
		var direc = Math.floor(Math.random() * Math.floor(4));
		if(direc == 0){
			enemyFaceX = 1;
			enemyFaceY = 0;
		}
		else if(direc == 1){
			enemyFaceX = -1;
			enemyFaceY = 0;
		}
		else if(direc == 2){
			enemyFaceX = 0;
			enemyFaceY = 1;
		}
		else if(direc == 3){
			enemyFaceX = 0;
			enemyFaceY = -1;
		}

	}
	enemyBullet[0].position.x +=1.4*enemyFaceX;
	enemyBullet[0].position.y +=1.4*enemyFaceY;
}
function bulletCollision(){
	for ( var index = 0; index < walls.length; index ++ ) {
		if(enemyBullet.length > 0){
				if (( (enemyBullet[0].position.x) <= (walls[index].position.x + walls[index].geometry.parameters.width / 2) && (enemyBullet[0].position.x ) >= (walls[ index ].position.x - walls[ index ].geometry.parameters.width / 2)) &&
		 				( (enemyBullet[0].position.y ) <= (walls[ index ].position.y + walls[index].geometry.parameters.height / 2) && (enemyBullet[0].position.y ) >= (walls[ index ].position.y - walls[ index ].geometry.parameters.height / 2)) &&
		 				( (enemyBullet[0].position.z ) <= (walls[ index ].position.z + walls[index].geometry.parameters.width / 2) && (enemyBullet[0].position.z ) >= (walls[ index ].position.z - walls[ index ].geometry.parameters.width / 2) )) {


								scene.remove(enemyBullet[0]);
								enemyBullet.splice(0,1);
								var listener2 = new THREE.AudioListener();
								camera.add( listener2 );
								var sound2 = new THREE.Audio( listener2);

								// load a sound and set it as the Audio object's buffer
								var audioLoader2 = new THREE.AudioLoader();

								audioLoader2.load( 'death.wav', function( buffer ) {
								sound2.setBuffer( buffer );
							//	sound2.setLoop( true );
								sound2.setVolume( 1.0 );
								sound2.play();
								});
				}

			}
		}
		if(enemyBullet.length >0){
		if ((enemyBullet[0].position.x) <= -500  || (enemyBullet[0].position.x) >= 500 ||
				 (enemyBullet[0].position.y ) <= -500 || (enemyBullet[0].position.y ) >= 500 )
				{
					scene.remove(enemyBullet[0]);
					enemyBullet.splice(0,1);
					var listener2 = new THREE.AudioListener();
					camera.add( listener2 );
					var sound2 = new THREE.Audio( listener2);

					// load a sound and set it as the Audio object's buffer
					var audioLoader2 = new THREE.AudioLoader();

					audioLoader2.load( 'death.wav', function( buffer ) {
					sound2.setBuffer( buffer );
				//	sound2.setLoop( true );
					sound2.setVolume( 1.0 );
					sound2.play();
					});
				}
			}
		for ( var index = 0; index < walls.length; index ++ ) {
			if(enemyBullet.length > 0){
					if (( (enemyBullet[0].position.x) <= (walls[index].position.x + walls[index].geometry.parameters.width / 2) && (enemyBullet[0].position.x ) >= (walls[ index ].position.x - walls[ index ].geometry.parameters.width / 2)) &&
			 				( (enemyBullet[0].position.y ) <= (walls[ index ].position.y + walls[index].geometry.parameters.height / 2) && (enemyBullet[0].position.y ) >= (walls[ index ].position.y - walls[ index ].geometry.parameters.height / 2)) &&
			 				( (enemyBullet[0].position.z ) <= (walls[ index ].position.z + walls[index].geometry.parameters.width / 2) && (enemyBullet[0].position.z ) >= (walls[ index ].position.z - walls[ index ].geometry.parameters.width / 2) )) {


									scene.remove(enemyBullet[0]);
									enemyBullet.splice(0,1);
									var listener2 = new THREE.AudioListener();
									camera.add( listener2 );
									var sound2 = new THREE.Audio( listener2);

									// load a sound and set it as the Audio object's buffer
									var audioLoader2 = new THREE.AudioLoader();

									audioLoader2.load( 'death.wav', function( buffer ) {
									sound2.setBuffer( buffer );
								//	sound2.setLoop( true );
									sound2.setVolume( 1.0 );
									sound2.play();
									});
					}
				}

				for ( var i = 0; i < bullets.length; i ++ ) {

							if (( (bullets[i].position.x) <= (walls[index].position.x + walls[index].geometry.parameters.width / 2) && (bullets[i].position.x ) >= (walls[ index ].position.x - walls[ index ].geometry.parameters.width / 2)) &&
					 				( (bullets[i].position.y ) <= (walls[ index ].position.y + walls[index].geometry.parameters.height / 2) && (bullets[i].position.y ) >= (walls[ index ].position.y - walls[ index ].geometry.parameters.height / 2)) &&
					 				( (bullets[i].position.z ) <= (walls[ index ].position.z + walls[index].geometry.parameters.width / 2) && (bullets[i].position.z ) >= (walls[ index ].position.z - walls[ index ].geometry.parameters.width / 2) )) {


											scene.remove(bullets[i]);

											bullets.splice(i,1);
											faceX.splice(i,1);
											faceY.splice(i,1);
											var listener2 = new THREE.AudioListener();
											camera.add( listener2 );
											var sound2 = new THREE.Audio( listener2);

											// load a sound and set it as the Audio object's buffer
											var audioLoader2 = new THREE.AudioLoader();

											audioLoader2.load( 'death.wav', function( buffer ) {
											sound2.setBuffer( buffer );
										//	sound2.setLoop( true );
											sound2.setVolume( 1.0 );
											sound2.play();
											});

							}

					}
			}

			for ( var i = 0; i < bullets.length; i ++ ) {
				for(var index = 0; index< enemy.length; index++){
						if (( (bullets[i].position.x) <= (enemy[index].position.x + enemy[index].geometry.parameters.width / 2) && (bullets[i].position.x ) >= (enemy[ index ].position.x - enemy[ index ].geometry.parameters.width / 2)) &&
								( (bullets[i].position.y ) <= (enemy[ index ].position.y + enemy[index].geometry.parameters.height / 2) && (bullets[i].position.y ) >= (enemy[ index ].position.y - enemy[ index ].geometry.parameters.height / 2)) &&
								( (bullets[i].position.z ) <= (enemy[ index ].position.z + enemy[index].geometry.parameters.width / 2) && (bullets[i].position.z ) >= (enemy[ index ].position.z - enemy[ index ].geometry.parameters.width / 2) )) {


										scene.remove(bullets[i]);
										bullets.splice(i, 1);
										faceX.splice(i, 1);
										faceY.splice(i, 1);
										scene.remove(enemy[index]);
										enemy.splice(index, 1);
										var listener2 = new THREE.AudioListener();
										camera.add( listener2 );
										var sound2 = new THREE.Audio( listener2);

										// load a sound and set it as the Audio object's buffer
										var audioLoader2 = new THREE.AudioLoader();

										audioLoader2.load( 'Explosion_03.mp3', function( buffer ) {
										sound2.setBuffer( buffer );
									//	sound2.setLoop( true );
										sound2.setVolume( 1.0 );
										sound2.play();
										});
										score1 += 10;
										document.getElementById("scores").innerHTML ="Score: "+ score1;
										break;

						}
				 }
			}
	}
 function resetPlayer()
 {
	 var listener2 = new THREE.AudioListener();
	 camera.add( listener2 );
	 var sound2 = new THREE.Audio( listener2);

	 // load a sound and set it as the Audio object's buffer
	 var audioLoader2 = new THREE.AudioLoader();

	 audioLoader2.load( 'round_end.wav', function( buffer ) {
	 sound2.setBuffer( buffer );
	 //	sound2.setLoop( true );
	 sound2.setVolume( 1.0 );
	 sound2.play();
	 });
	 player.position.x = -330;
	 player.position.z = 0;
	 player.position.y = 0;
	 score1  = 0;
	 document.getElementById("scores").innerHTML ="Score: "+ score1;
	 resetEnemies();

}

function changeLevel(){


	if(player.position.y <=-350){
		resetEnemies();
		var listener2 = new THREE.AudioListener();
		camera.add( listener2 );
		var sound2 = new THREE.Audio( listener2);

		// load a sound and set it as the Audio object's buffer
		var audioLoader2 = new THREE.AudioLoader();

		audioLoader2.load( 'round_end.wav', function( buffer ) {
		sound2.setBuffer( buffer );
	//	sound2.setLoop( true );
		sound2.setVolume( 1.0 );
		sound2.play();
		});
		var wallMaterial =
			new THREE.MeshLambertMaterial(
			{
				color: 0x7c40ff
			});

			for(var i = 0; i < walls.length; i++){

				scene.remove(walls[i]);

			}
			walls.splice(0,walls.length);
		player.position.y = 400;
		var topWall = new THREE.Mesh(

		  new THREE.CubeGeometry(
		  335,
		  30,
		  30,
		  1,
		  1,
		  1 ),

		  wallMaterial);

		topWall.position.x = -280;
		topWall.position.y = 335;
		topWall.position.z = 0;
		topWall.castShadow = true;
		topWall.receiveShadow = true;
		scene.add(topWall);
		walls.push(topWall);
		var sideWall1 = new THREE.Mesh(

		  new THREE.CubeGeometry(
		  30,
		  700,
		  30,
		  1,
		  1,
		  1 ),

		  wallMaterial);

		sideWall1.position.x = -436;
		sideWall1.position.y = 0;
		sideWall1.position.z = 0;
		sideWall1.castShadow = true;
		sideWall1.receiveShadow = true;
		scene.add(sideWall1);
		walls.push(sideWall1);

		var sideWall2 = new THREE.Mesh(

		  new THREE.CubeGeometry(
		  30,
		  700,
		  30,
		  1,
		  1,
		  1 ),

		  wallMaterial);

		sideWall2.position.x = 436;
		sideWall2.position.y = 0;
		sideWall2.position.z = 0;
		sideWall2.castShadow = true;
		sideWall2.receiveShadow = true;
		scene.add(sideWall2);
		walls.push(sideWall2);
		var sideWall3 = new THREE.Mesh(

			new THREE.CubeGeometry(
			400,
			30,
			30,
			1,
			1,
			1 ),

			wallMaterial);

		sideWall3.position.x = 0;
		sideWall3.position.y = 200;
		sideWall3.position.z = 0;
		sideWall3.castShadow = true;
		sideWall3.receiveShadow = true;
		scene.add(sideWall3);
		walls.push(sideWall3);
		var sideWall4 = new THREE.Mesh(

			new THREE.CubeGeometry(
			400,
			30,
			30,
			1,
			1,
			1 ),

			wallMaterial);

		sideWall4.position.x = 0;
		sideWall4.position.y = -200;
		sideWall4.position.z = 0;
		sideWall4.castShadow = true;
		sideWall4.receiveShadow = true;
		scene.add(sideWall4);
		walls.push(sideWall4);
		var sideWall5 = new THREE.Mesh(

			new THREE.CubeGeometry(
			30,
			300,
			30,
			1,
			1,
			1 ),

			wallMaterial);

		sideWall5.position.x = 0;
		sideWall5.position.y = 0;
		sideWall5.position.z = 0;
		sideWall5.castShadow = true;
		sideWall5.receiveShadow = true;
		scene.add(sideWall5);
		walls.push(sideWall5);
		var sideWall6 = new THREE.Mesh(

			new THREE.CubeGeometry(
			900,
			30,
			30,
			1,
			1,
			1 ),

			wallMaterial);

		sideWall6.position.x = 0;
		sideWall6.position.y = -335;
		sideWall6.position.z = 0;
		sideWall6.castShadow = true;
		sideWall6.receiveShadow = true;
		scene.add(sideWall6);
		walls.push(sideWall6);
		var sideWall7 = new THREE.Mesh(

			new THREE.CubeGeometry(
			300,
			30,
			30,
			1,
			1,
			1 ),

			wallMaterial);

		sideWall7.position.x = 280;
		sideWall7.position.y = 335;
		sideWall7.position.z = 0;
		sideWall7.castShadow = true;
		sideWall7.receiveShadow = true;
		scene.add(sideWall7);
		walls.push(sideWall7);

	}
}
