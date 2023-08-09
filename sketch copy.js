// make an array of objects = [];
let initialX;
let bodypix;
let video;
let segmentation;
let warrior;
let bluedevil;
let baldie;
let sea_radish;
let counter = 0;
let personSprite;

const options = {
  outputStride: 8, // 8, 16, or 32, default is 16
  segmentationThreshold: 0.3, // 0 - 1, defaults to 0.5
};

function preload(){
  warrior = loadImage('/warrior.png');
  sea_radish = loadImage('/sea_radish.png');
  lady = loadImage('/lady.png');
  demon = loadImage('/demon.png');
  man = loadImage('/man.png');
  creature = loadImage('/creature.png');
  bluedevil = loadImage('/bluedevil.png');
  baldie = loadImage('/baldie.png');

  bodypix = ml5.bodyPix(options);
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  world.gravity.y = 2;
	// spriteBox = new Sprite();
  // spriteBox.x = windowWidth/2;
  // spriteBox.y = windowHeight/2;
	// spriteBox.color= 'rgb(0,0,0)';
	// spriteBox.width = windowWidth/6;
	// spriteBox.height = windowHeight/6;
  // spriteBox.collider = 'static';

  initialX = windowWidth/2;

  video = createCapture(VIDEO, videoReady);
  video.size(width, height);

  personSprite = new Sprite();
  personSprite.width = windowWidth/6;
	personSprite.height = windowHeight/6;
  personSprite.collider = 'static';
}

function videoReady() {
  bodypix.segment(video, gotResults);
}

function draw() {
  background(0);
  counter++;
  console.log(counter);
  if (counter % 20 == 0){
  warrior = drawSprite(initialX, -30,'warrior.png', .06, 10);
  bluedevil = drawSprite(initialX - 40, -30,'bluedevil.png',.04, 10);
  }

  //       warrior = new Sprite(initialX, -30);
  //   warrior.img = 'warrior.png';
  //   warrior.scale = .06;
  // warrior.diameter = 10;
//   bluedevil = new Sprite(initialX-40, -30);
//     bluedevil.img = 'bluedevil.png';
//     bluedevil.scale = .04;
//   bluedevil.diameter = 10;
//           baldie = new Sprite(initialX-60, -30);
//     baldie.img = 'baldie.png';
//     baldie.scale = .04;
//   baldie.diameter = 10;
//           sea_radish = new Sprite(initialX-10, -30);
//     sea_radish.img = 'sea_radish.png';
//     sea_radish.scale = .07;
//   sea_radish.diameter = 3;
//          demon = new Sprite(initialX-35, -30);
//     demon.img = 'demon.png';
//     demon.scale = .06;
//   demon.diameter = 10;
//      // lady = new Sprite(230, -30);
//     lady.img = 'lady.png';
//     lady.scale = .05;
//   lady.diameter = 1;
//     man = new Sprite(initialX+50, -30);
//     man.img = 'man.png';
//     man.scale = .08;
//   man.diameter = 10;
//       creature = new Sprite(initialX+75, -30);
//     creature.img = 'creature.png';
//     creature.scale = .05;
//  creature.diameter = 10;

  if (segmentation) {
    image(segmentation.backgroundMask, 0, 0, width, height);
  }
}


function drawSprite(x,y,name,scale,diameter){
  let sprite = new Sprite(x, y);
  sprite.img = name;
  sprite.scale = scale;
  sprite.diameter = diameter;
  return sprite;
}


function gotResults(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  segmentation = result;
  bodypix.segment(video, gotResults);
}
