song = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload() {
	song = loadSound("music.mp3");
}

function setup() {
	canvas = createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
	console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
	if (results.length > 0) {
		scoreLeftWrist = results[0].pose.keypoints[9].score;
		scoreRightWrist = results[0].pose.keypoints[10].score;
		//console.log("scoreLeftWrist = " + scoreLeftWrist);
		rightWristX = results[0].pose.rightWrist.x;
		rightWristY = results[0].pose.rightWrist.y;
		//console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

		leftWristX = results[0].pose.leftWrist.x;
		leftWristY = results[0].pose.leftWrist.y;
		//console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);	
	}
}

function draw() {
	image(video, 0, 0, 600, 500);
	fill("blue");
	stroke("black");

	if (scoreLeftWrist > 0.2) {
		circle(leftWristX, leftWristY, 20);
		numberLeft = Number(leftWristX);
		removeDecimals = floor(numberLeft);
		volume = removeDecimals / 500;
		document.getElementById("volume").innerHTML = "Volume = " + volume;
		song.setVolume(volume);
	}
	if (scoreRightWrist > 0.2) {
		circle(rightWristX, rightWristY, 20)
		if (rightWristY > 0 && rightWristY <= 100) {
			document.getElementById("speed").innerHTML = "Velocidade = 0.5x";
			song.rate(0.5);
		}
		else if (rightWristY > 100 && rightWristY <= 200) {
			document.getElementById("speed").innerHTML = "Velocidade = 1x";
			song.rate(1);
		}
		else if (rightWristY > 200 && rightWristY <= 300) {
			document.getElementById("speed").innerHTML = "Velocidade = 1.5x";
			song.rate(1.5);
		}
		else if (rightWristY > 300 && rightWristY <= 400) {
			document.getElementById("speed").innerHTML = "Velocidade = 2x";
			song.rate(2);
		}
		else if (rightWristY > 400 && rightWristY <= 500) {
			document.getElementById("speed").innerHTML = "Velocidade = 2.5x";
			song.rate(2.5);
		}
	}
}
function play() {
	song.play();
	song.setVolume(1);
	song.rate(1);
}