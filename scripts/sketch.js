var middle;

var img = [];
var pastImg = [];

const items = ["MODDEY", "PEN", "THIE", "KAYT", "GLEASHTAN"];
var runningItems = [];
var remainingItems = [];
var targetItem;
var correctImg;

var ranItem;

var buttonStart;
var buttonHeight = 70;
var buttonSpace = 25;
var scoreY;
var scoreEllY;

var ans1;
var ans2;
var ans3;

var ansAct = [true, true, true];

var correctPos;
var answered = false;
var ansTime = 0;
var correct = false;

var ranAns = [];
let correctAns;
var ranInc;

var score = 0;
var bank = 3;
var gameOver = false;
var jeantDyMie;

var c1;
var c2;
var c3;

function preload () {
	img[0] = loadImage('assets/moddey.png');
	img[1] = loadImage('assets/pen.png');
	img[2] = loadImage('assets/thie.png');
	img[3] = loadImage('assets/kayt.png');
	img[4] = loadImage('assets/gleashtan.png');

	jeantDyMie = loadImage('assets/jeantDyMie.png');

	aBeeZee = loadFont('assets/ABeeZee-Regular.ttf');
}

function setup() {

	if (displayWidth <= 480) cnv = createCanvas(displayWidth, displayHeight);
	else cnv = createCanvas(320, displayHeight);
	middle = (displayWidth - width) / 2;
	cnv.position(middle);

	buttonStart = cnv.height * 0.528;
	scoreY = cnv.height * 0.045;
	scoreEllY = scoreY + 15;

	c1 = color(25, 153, 242);
	c2 = color(75, 165, 1);
	c3 = color(230, 102, 13);

	remainingItems = [...items];
	remainingImgs = [...img];

	setAnswer();
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function draw () {

	background(255);

	if (!gameOver) {

		noStroke();
		textSize(40);
		textAlign(CENTER);
		text("CRE SHOH?", cnv.width * 0.5, cnv.height*0.088);
		imageMode(CENTER);
		image(correctImg, cnv.width * 0.5, cnv.height*0.308);

		// stroke(0);
		// strokeWeight(2);
		// noFill();
		// ellipse(cnv.width * 0.5, height-scoreEllY, 75, 50);

		// noStroke();
		// fill(0);
		// text(score, cnv.width * 0.5, cnv.height-scoreY);

		if (answered && ansTime < 50) ansTime++;
		else if (answered && ansTime >= 50) buttonChange();
	}

	else {
		image(jeantDyMie, cnv.width * 0.5, cnv.height * 0.25);
		text(score + "/" + items.length * 3, cnv.width * 0.5, cnv.height * 0.45)
		if (score > 9) text("Jeant dy mie!", cnv.width * 0.5, cnv.height * 0.525);
		else text("Prow reesht!", cnv.width * 0.5, cnv.height * 0.55);
	}

}

function setAnswer () {

	correctAns = "";
	ranAns = [];
	bank = 3;
	ansAct = [true, true, true];

	ranItem = Math.floor(random(0, remainingItems.length));
	correctAns = remainingItems.splice(ranItem, 1).toString();
	correctImg = img[items.indexOf(correctAns)];

	runningItems = [...items];
	targetItem = runningItems.indexOf(correctAns);
	runningItems.splice(targetItem, 1);

	ranInc = Math.floor(random(0, runningItems.length));
	ranAns[0] = runningItems.splice(ranInc, 1).toString();
	ranInc = Math.floor(random(0, runningItems.length));
	ranAns[1] = runningItems.splice(ranInc, 1).toString();
	ranInc = Math.floor(random(0, runningItems.length));
	ranAns[2] = runningItems.splice(ranInc, 1).toString();

	correctPos = Math.floor(random(1, 4));

	correctPos == 1 ? ans1 = createButton(correctAns) : ans1 = createButton(ranAns[0]);
	ans1.size(240, buttonHeight);
	ans1.position(displayWidth * 0.5 - 120, buttonStart);
	ans1.style("background", c1);
	ans1.style("color", "white");
	ans1.style("font-size", "24px");
	ans1.style("border", "none");
	ans1.mousePressed(function() { checkAnswer(1); });

	correctPos == 2 ? ans2 = createButton(correctAns) : ans2 = createButton(ranAns[1]);;
	ans2.size(240, buttonHeight);
	ans2.position(displayWidth * 0.5 - 120, buttonStart + buttonHeight + buttonSpace);
	ans2.style("background", c1);
	ans2.style("color", "white");
	ans2.style("font-size", "24px");
	ans2.style("border", "none");
	ans2.mousePressed(function() { checkAnswer(2); });

	correctPos == 3 ? ans3 = createButton(correctAns) : ans3 = createButton(ranAns[2]);;
	ans3.size(240, buttonHeight);
	ans3.position(displayWidth * 0.5 - 120, buttonStart + buttonHeight * 2 + buttonSpace * 2);
	ans3.style("background", c1);
	ans3.style("color", "white");
	ans3.style("font-size", "24px");
	ans3.style("border", "none");
	ans3.mousePressed(function() { checkAnswer(3); });

}

function checkAnswer (butNo) {

	if (correctPos == butNo && !answered) correctAnswer(butNo);
	else if (correctPos != butNo && !answered) wrongAnswer(butNo);

}

function correctAnswer (butNo) {

	answered = true;
	correct = true;

	if (butNo == 1) ans1.style("background", c2);
	if (butNo == 2) ans2.style("background", c2);
	if (butNo == 3) ans3.style("background", c2);

}

function wrongAnswer (butNo) {

	answered = true;

	if (ansAct[butNo - 1] == true) bank--;

	if (butNo == 1) {
		ans1.style("background", c3);
		ansAct[0] = false;
	}
	if (butNo == 2) {
		ans2.style("background", c3);
		ansAct[1] = false;
	}
	if (butNo == 3) {
		ans3.style("background", c3);
		ansAct[2] = false;
	}

}

function buttonChange () {

	answered = false;
	ansTime = 0;

	if (correct) {

		correct = false;

		ans1.remove();
		ans2.remove();
		ans3.remove();

		score += bank;

		if (remainingItems.length > 0) setAnswer();
		else finishGame();

	}

}

function finishGame () {

	fill(0);
	console.log("here")
	gameOver = true;

	let retry = createButton("RETRY");
	retry.size(240, buttonHeight);
	retry.position(displayWidth * 0.5 - 120, buttonStart + buttonSpace * 4 );
	retry.style("background", c1);
	retry.style("color", "white");
	retry.style("font-size", "24px");
	retry.style("border", "none");
	retry.mousePressed(restartGame);

}

function restartGame () {

	location.reload();

}
