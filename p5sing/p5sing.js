let bugs = [];
let deadBugs = [];
let score = 0;
let timer = 30;
let gameState = 'wait';
let alignMusic = true;
let startTime;

const GameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver: "GameOver"
};


// Squish Sound
let oscillator = new Tone.AMOscillator(100,'sine','sine').start()
let gain = new Tone.Gain().toDestination();
let panner = new Tone.Panner().connect(gain);
let squishSound = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.05,
  sustain: 0.05,
  release: 0.05
}).connect(panner);
oscillator.connect(squishSound);
let freqLFO = new Tone.LFO(1000,800,2000).start();
freqLFO.connect(oscillator.frequency); 
oscillator.volume.value = -30;





let synthA = new Tone.PolySynth().toDestination();
let synthB = new Tone.PolySynth().toDestination();

let melodypart2 = new Tone.Sequence((time, note) => {
  if(note != null) {
    synthA.triggerAttackRelease(note, '16n', time + 0.1);
  }
}, [null, 'C4', null, 'E4', null, 'A3',null, 'C4', null, 'F3', null, 'A3', null, 'G3', null, 'B3']);

let melodypart1 = new Tone.Sequence((time, note) => {
  if(note != null) {
    synthA.triggerAttackRelease(note, '8n', time);
  }
}, ['C4', null, 'E4', null, 'A3', null,'C4', null, 'F3', null, 'A3', null, 'G3', null, 'B3', null]);

let waitMusic = new Tone.Sequence((time, note) => {
  if(note != null) {
    synthB.triggerAttackRelease(note, '8n', time);
  }
}, ['C1', null, 'E1', null, 'A0', null,'C1', null, 'F0', null, 'A0', null, 'G0', null, 'B0', null]);

synthA.volume.value = -40;
synthB.volume.value = -20;

Tone.Transport.bpm.value = 120;
Tone.Transport.start();


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
  deadBug = loadImage("../Assets/deadbug.png");
  
}

function draw() {
  background(225);
  if(gameState == 'wait') {
    waitMusic.start();
    textSize(30);
    textAlign(CENTER, CENTER);
    text('Press space to start game!', 0, height/2, width);

    alignMusic = true;

  } else if(gameState == 'start') {
    textAlign(LEFT, TOP);
    text("Score: " + score, 10, 20, width);
    text("Time: " + timer, 400, 20, width);
    if(alignMusic) {
      waitMusic.stop();
      alignMusic = false;
    }
    waitMusic.start();
    melodypart1.start();
    melodypart2.start();
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
} else if(gameState == 'end') {

  Tone.Transport.bpm.value = 120;
  melodypart1.stop();
  melodypart2.stop();
  waitMusic.start();

  textSize(30);
  textAlign(CENTER, CENTER);
  text('Game Over', 0, height/2 - 90, width);
  text('Score: ' + score, 0, height/2 - 30, width);
  

  text('Press space to start new game!', 0, height/2 + 60, width);

  alignMusic = true;
}

}

function keyPressed() {
  if(keyCode == 32 && gameState == 'wait') {
    startTime = millis();
    gameState = 'start';
  } else if (keyCode == 32 && gameState == 'end') {

    for(let p = 0; p < numEnemies; p++) {
      array[p] = new Character(bug, random(50, window.innerWidth-50), random(50, window.innerHeight - 50), random(2, 5), random(startDirection));
    }

    bugWave = 1;
    score = 0;
    startTime = millis();
    gameState = 'start';
  }
}


function mousePressed() {
  if(gameState == 'start') {
  for (let i =0; i < bugs.length; i++) {
    if (bugs[i].isClicked(mouseX, mouseY)) {
      deadBugs.push(bugs[i]);
      bugs.splice(i, 1);
      squishSound.triggerAttackRelease('8n');
      score++;
      Tone.Transport.bpm.value++;
    }
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
