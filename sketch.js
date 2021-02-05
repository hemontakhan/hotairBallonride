var bg,ballon,ballonImg;
var database,height;

function preload(){
 bg = loadImage("Hot Air Ballon-01.png");
 ballonImg = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");

}

function setup() {
  database = firebase.database()
  console.log(database);
  createCanvas(1800,600);

  ballon = createSprite(100, 500, 50, 50);
  ballon.addAnimation("running",ballonImg);
  ballon.scale = 0.45;

  var ballonPosition = database.ref('ballon/position');
  ballonPosition.on("value",readHeight,showError);
}

function draw() {
  background(bg);  

if(keyDown(LEFT_ARROW)){
    updateHeight(-2,0);
}
else if(keyDown(RIGHT_ARROW)){
    updateHeight(2,0);
}
else if(keyDown(UP_ARROW)){
    updateHeight(0,-2);
    ballon.scale = 0.25
}
else if(keyDown(DOWN_ARROW)){
   updateHeight(0,+2);
    ballon.scale = 0.45;
}
  drawSprites();

  textSize(20);
  fill("blue");
  stroke("yellow")
  text("**USE AROOW KEY TO ENJOY RIDE",50,50);
}

function updateHeight(x,y){
  database.ref('ballon/position').set({
    'x': height.x + x ,
    'y': height.y + y
  })

}

function readHeight(data){
height = data.val()
ballon.x = height.x;
ballon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}