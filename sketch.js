// make an array of objects = [];
let initialX = 0;
let video;
let poseNet;
let poses = [];
let warrior;
let counter = 0;
let personSprite;
// let waterSprites = [];

function preload(){
  warrior = loadImage('/warrior.png');
  sea_radish = loadImage('/sea_radish.png');
  lady = loadImage('/lady.png');
  demon = loadImage('/demon.png');
  man = loadImage('/man.png');
  creature = loadImage('/creature.png');
  bluedevil = loadImage('/bluedevil.png');
  baldie = loadImage('/baldie.png');
  octopus = loadImage('/octopus.png');

}
function setup() {
  createCanvas(windowWidth, windowHeight);
  world.gravity.y = 2;

  initialX = windowWidth/2;

  video = createCapture(VIDEO);
  video.size(width, height);


   // Create a new poseNet method with a single detection
   poseNet = ml5.poseNet(video, modelReady);
   // This sets up an event that fills the global variable "poses"
   // with an array every time new poses are detected
   poseNet.on('pose', function(results) {
     poses = results;
   });
   // Hide the video element, and just show the canvas
   video.hide();

  personSprite = new Sprite();
  personSprite.collider = 'static';
  personSprite.color= 'rgba(0,0,0,0)';
  personSprite.stroke= 'rgba(0,0,0,0)';
}

function modelReady() {
  console.log('modelReady');
  // select('#status').html('Model Loaded');
}

function draw() {
  background(0);
  //reverses the opposite mirror effect so it moves like a real mirror reflection
  translate(width,0);
  scale (-1,1);
  //must come before image
  image(video, 0, 0, width, height);
  // filter(INVERT);



  counter++;
  if (counter % 20 == 0){
    // for (let i = 0; i < waterSprites.length; i++){
    //   waterSprites[i].drawSprite();
  // warrior = drawSprite(initialX+10, -30,'warrior.png',.06,10);
  // bluedevil = drawSprite(initialX-40, -30,'bluedevil.png',.04,10);
  // baldie = drawSprite(initialX - 60, -30, 'baldie.png', .04 ,10);
  // sea_radish = drawSprite(initialX - 10, -30, 'sea_radish.png', .07, 3);
  // demon = drawSprite(initialX - 35, -30, 'demon.png', .06, 10);
  // man = drawSprite(initialX + 50, -30, 'man.png', .08, 10);
  // creature = drawSprite(initialX + 75, -30, 'creature.png', .05, 10);
  // octopus = drawSprite(initialX+20,-30, 'octopus.png', .12, 10);
 drawSprite(initialX+10, -30,'warrior.png',.06,10);
 drawSprite(initialX-40, -30,'bluedevil.png',.04,10);
 drawSprite(initialX - 60, -30, 'baldie.png', .04 ,10);
 drawSprite(initialX - 10, -30, 'sea_radish.png', .07, 3);
  drawSprite(initialX - 35, -30, 'demon.png', .06, 10);
  drawSprite(initialX + 50, -30, 'man.png', .08, 10);
  drawSprite(initialX + 75, -30, 'creature.png', .05, 10);
  drawSprite(initialX+20,-30, 'octopus.png', .12, 10);
    // }  
}


  drawKeypoints();

//      // lady = new Sprite(230, -30);
//     lady.img = 'lady.png';
//     lady.scale = .05;
//   lady.diameter = 1;
}

// class waterSprite {
//   constructor(){
//     this.x
//     this.y
//   }
// }

function drawSprite(x,y,name,scale,diameter){
  let sprite = new Sprite(x, y);
  sprite.img = name;
  sprite.scale = scale;
  sprite.diameter = diameter;
  return sprite;
}

function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    let nose = pose.nose;
    let eye = pose.leftEye;
    let leftEar = pose.leftEar;
    let rightEar = pose.rightEar;

    if (nose.confidence > .5 && eye.confidence > .5){
    // ellipse(nose.x, nose.y, 10);
    personSprite.x = nose.x;
    let hairline = nose.y - ((nose.y-eye.y)*3);
    personSprite.y = nose.y-(nose.y-eye.y);
    //personSprite.height = (nose.y-eye.y)*7;
    personSprite.diameter = (nose.y-eye.y)*5;
    }
    if (leftEar.confidence > .5 && rightEar.confidence > .5){
        personSprite.width = leftEar.x-rightEar.x;
    }
  }
}


