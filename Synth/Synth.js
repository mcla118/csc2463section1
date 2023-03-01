const synth = new Tone.AMSynth().toDestination();
const reverb = new Tone.JCReverb(0).toDestination();

//all letter keys make a sound
let notes = {
  
  // First Octave (Lowest)
  'q': 'C3',
  'w': 'D3',
  'e': 'E3',
  'r': 'F3',
  't': 'G3',
  'y': 'A3',
  'u': 'B3',
  'i': 'C4',

  // Second Octave (Mid)
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5',

  // Third Octave (Highest)
  'z': 'C5',
  'x': 'D5',
  'c': 'E5',
  'v': 'F5',
  'b': 'G5',
  'n': 'A5',
  'm': 'B5',
  ',': 'C6'
}


let song = ['C4', 'C4', 'E4', 'E4', 'A3', 'A3', 'C4', 'C4', 'F3', 'F3', 'A3', 'A3', 'G3', 'G3', 'B3', 'B3'];
let i = 0;
//setting up dials and base values
let reverbDial;
reverb.roomSize.value = 0;
let volumeDial;
synth.volume.value = -15;
let harmonicityDial;
synth.harmonicity.value = 1;

let buttons = [];

synth.connect(reverb);

function preload(){

  volumeDial = Nexus.Add.Dial('#dial',{
    'size': [100,100],
    'min' : -30,
    'max' : 0,
    'value' : -29
  });

  harmonicityDial = Nexus.Add.Dial('#dial2', {
    'size': [100,100],
    'min' : 0,
    'max' : 30,
    'value' : 1
  });

  reverbDial = Nexus.Add.Dial('#dial3',{
    'size': [100,100],
    'min' : 0,
    'max' : 1,
    'value' : 0.03
  });

  
  
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  volumeDial.on('change', (v)=>{
    synth.volume.value = v;
  });

  harmonicityDial.on('change', (v)=>{
    synth.harmonicity.value = v;
  });

  reverbDial.on('change', (v)=>{
    reverb.roomSize.value = v;
  });

  buttons[0] = createButton('q');
  buttons[0].position(window.innerWidth/2 - 200, 200);
  buttons[0].size(50 , 100);
  buttons[0].mousePressed( ()=>playSound('q') );

  buttons[1] = createButton('w');
  buttons[1].position(window.innerWidth/2 - 150, 200);
  buttons[1].size(50 , 100);
  buttons[1].mousePressed( ()=>playSound('w') );

  buttons[2] = createButton('e');
  buttons[2].position(window.innerWidth/2 - 100, 200);
  buttons[2].size(50 , 100);
  buttons[2].mousePressed( ()=>playSound('e') );

  buttons[3] = createButton('r');
  buttons[3].position(window.innerWidth/2 - 50, 200);
  buttons[3].size(50 , 100);
  buttons[3].mousePressed( ()=>playSound('r') );

  buttons[4] = createButton('t');
  buttons[4].position(window.innerWidth/2, 200);
  buttons[4].size(50 , 100);
  buttons[4].mousePressed( ()=>playSound('t') );

  buttons[5] = createButton('y');
  buttons[5].position(window.innerWidth/2 + 50, 200);
  buttons[5].size(50 , 100);
  buttons[5].mousePressed( ()=>playSound('y') );

  buttons[6] = createButton('u');
  buttons[6].position(window.innerWidth/2 + 100, 200);
  buttons[6].size(50 , 100);
  buttons[6].mousePressed( ()=>playSound('u') );

  buttons[7] = createButton('i');
  buttons[7].position(window.innerWidth/2 + 150, 200);
  buttons[7].size(50 , 100);
  buttons[7].mousePressed( ()=>playSound('i') );

  buttons[8] = createButton('a');
  buttons[8].position(window.innerWidth/2 - 200, 350);
  buttons[8].size(50 , 100);
  buttons[8].mousePressed( ()=>playSound('a') );

  buttons[9] = createButton('s');
  buttons[9].position(window.innerWidth/2 - 150, 350);
  buttons[9].size(50 , 100);
  buttons[9].mousePressed( ()=>playSound('s') );

  buttons[10] = createButton('d');
  buttons[10].position(window.innerWidth/2 - 100, 350);
  buttons[10].size(50 , 100);
  buttons[10].mousePressed( ()=>playSound('d') );

  buttons[11] = createButton('f');
  buttons[11].position(window.innerWidth/2 - 50, 350);
  buttons[11].size(50 , 100);
  buttons[11].mousePressed( ()=>playSound('f') );

  buttons[12] = createButton('g');
  buttons[12].position(window.innerWidth/2, 350);
  buttons[12].size(50 , 100);
  buttons[12].mousePressed( ()=>playSound('g') );

  buttons[13] = createButton('h');
  buttons[13].position(window.innerWidth/2 + 50, 350);
  buttons[13].size(50 , 100);
  buttons[13].mousePressed( ()=>playSound('h') );

  buttons[14] = createButton('j');
  buttons[14].position(window.innerWidth/2 + 100, 350);
  buttons[14].size(50 , 100);
  buttons[14].mousePressed( ()=>playSound('j') );

  buttons[15] = createButton('k');
  buttons[15].position(window.innerWidth/2 + 150, 350);
  buttons[15].size(50 , 100);
  buttons[15].mousePressed( ()=>playSound('k') );

  buttons[16] = createButton('z');
  buttons[16].position(window.innerWidth/2 - 200, 500);
  buttons[16].size(50 , 100);
  buttons[16].mousePressed( ()=>playSound('z') );

  buttons[17] = createButton('x');
  buttons[17].position(window.innerWidth/2 - 150, 500);
  buttons[17].size(50 , 100);
  buttons[17].mousePressed( ()=>playSound('x') );

  buttons[18] = createButton('c');
  buttons[18].position(window.innerWidth/2 - 100, 500);
  buttons[18].size(50 , 100);
  buttons[18].mousePressed( ()=>playSound('c') );

  buttons[19] = createButton('v');
  buttons[19].position(window.innerWidth/2 - 50, 500);
  buttons[19].size(50 , 100);
  buttons[19].mousePressed( ()=>playSound('v') );

  buttons[20] = createButton('b');
  buttons[20].position(window.innerWidth/2 , 500);
  buttons[20].size(50 , 100);
  buttons[20].mousePressed( ()=>playSound('b') );

  buttons[21] = createButton('n');
  buttons[21].position(window.innerWidth/2 + 50, 500);
  buttons[21].size(50 , 100);
  buttons[21].mousePressed( ()=>playSound('n') );

  buttons[22] = createButton('m');
  buttons[22].position(window.innerWidth/2 + 100, 500);
  buttons[22].size(50 , 100);
  buttons[22].mousePressed( ()=>playSound('m') );

  buttons[23] = createButton(',');
  buttons[23].position(window.innerWidth/2 + 150, 500);
  buttons[23].size(50 , 100);
  buttons[23].mousePressed( ()=>playSound(',') );

  textSize(20);
}

function draw() {
  background(255);
  text('Press space for a nice tune', window.innerWidth/2 - 125, 500);
}

function keyPressed() {
  let toPlay = notes[key.toLowerCase()];
  synth.triggerAttackRelease(toPlay, 0.25);

  if(key === ' ') {
    synth.triggerAttackRelease(song[i % 16], 0.25);
    i++;
  }
}

function playSound(noteKey) {
  let toPlay = notes[noteKey.toLowerCase()];
  synth.triggerAttackRelease(toPlay, 0.25);
}