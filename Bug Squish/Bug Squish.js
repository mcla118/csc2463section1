let bugs = [];
let deadBugs = [];
let score = 0;
let timer = 30;

const GameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver: "GameOver"
};

let game = { score: 0, maxScore: 0, maxTime: 10, elapsedTime: 0, totalSprites: 15, state: GameState.Start, targetSprite: 2 };


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
    imageMode(CENTER);
  for (let i = 0; i < 30; i++) {
    bugs.push(new Bug());
  }
}

function preload() {
  //Loads all sprite sheets
  bug = loadImage("../Assets/bug.png");
  deadBug = loadImage("../Assets/deadBug.png");
  
}

function draw() {
  background(225);
  textAlign(LEFT, TOP);
  text("Score: " + score, 10, 20, width);
  text("Time: " + timer, 400, 20, width);
  for (let i = 0; i < bugs.length; i++) {
    bugs[i].display();
    bugs[i].move();
  }
  for (let i = 0; i < deadBugs.length; i++) {
    deadBugs[i].display();
  }
  timer -= 0.05;
  if (timer <= 0) {
    noLoop();
    textSize (20);
    textAlign(CENTER);
    text("Game Over!", width / 2, height / 2);
  }
}

function mousePressed() {
  for (let i =0; i < bugs.length; i++) {
    if (bugs[i].isClicked(mouseX, mouseY)) {
      score++;
      deadBugs.push(bugs[i]);
      bugs.splice(i, 1);
    }
  }
}


class Bug {
 constructor() {
   this.x = random(width);
   this.y = random(height);
   this.size = 50;
   this.speed = 2;
   this.dead = false;
 }
 
 display() {
   if (!this.dead) {
     image(bug, this.x, this.y, this.size, this.size);
   } else {
     image(deadBug, this.x, this.y, this.size, this.size);
   }
 }
 
 move() {
   this.x += random(-this.speed, this.speed);
   this.y += random(-this.speed, this.speed);
 }
 
 isClicked(mx, my) {
   let d = dist(mx, my, this.x, this.y);
   if (d < this.size / 2) {
     this.dead = true; 
     return true;
   }
      // increment the speed only when the bug is clicked
     this.speed += .65;
   return false;
 }
}
