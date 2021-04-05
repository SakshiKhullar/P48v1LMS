var bunny, bunnyImg;
var edges;
var score=0;

var PLAY=1;
var END=0;
var gameState=PLAY;

var timer=60;
var backgroundImg;
var carrot,carrotImg;
var carrotgroup;

function preload() {
  bunnyImg=loadImage("bunny.png");
  carrotImg=loadImage("carrot.png");
  backgroundImg=loadImage("garden.png");
}

function setup() {
  //createCanvas(800, 600);
  createCanvas(windowWidth, windowHeight);
  bunny = createSprite(50,550);
  bunny.scale=0.15;
  bunny.addImage("bunny",bunnyImg);

  carrotgroup=new Group();

}

function draw() {
  background(backgroundImg);
  drawSprites();
  textSize(25);

  fill("white");
  text("TIME REMANING:"+Math.round(timer),width-300,30);
  text("SCORE: " + score,50,30);

  if(gameState===PLAY){
      timer=timer-0.05;
    
    
      edges=createEdgeSprites();
      bunny.collide(edges);
    
    if(keyDown("UP_ARROW")){
      bunny.velocityY=-5; 
    }
      if(keyDown("DOWN_ARROW")){
        bunny.velocityY=5; 
    }
      if(keyDown("LEFT_ARROW")){
        bunny.velocityX=-5; 
    }
      if(keyDown("RIGHT_ARROW")){
        bunny.velocityX=5; 
    }
    spawnCarrot();

    if(carrotgroup.isTouching(bunny)){
      carrotgroup.destroyEach(); 

      score++;
    }

    if(timer<0){
      gameState=END;   
    }

  }

  if(gameState===END){
    bunny.velocityX=0;
    bunny.velocityY=0;
    carrotgroup.destroyEach();
     
  }
 
  
 
}

function spawnCarrot() {

  if(frameCount % 70===0){  
    carrot =createSprite(random(50,width-100),200,5,5);
    carrot.scale=0.01
    carrot.addImage("carrot",carrotImg);
    carrot.y=random(50,height-100);
    carrot.lifetime=60;
    carrotgroup.add(carrot);
    
  }
}