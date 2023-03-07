let staticGIF;
let artGIF;
let fuzz = true;

// Synth for background music
let synth = new Tone.PolySynth().toDestination();
synth.set({ detune: -500 });
synth.volume.value = -8;

// Click transition noise
let oscillator = new Tone.AMOscillator(400,'sine','sine').start()
let gain = new Tone.Gain().toDestination();
let panner = new Tone.Panner().connect(gain);
let envelope = new Tone.AmplitudeEnvelope({
  attack: 0.3,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(panner);
oscillator.connect(envelope);
let freqLFO = new Tone.LFO(50,100,1000).start();
freqLFO.connect(oscillator.frequency); 

// Static effect
let static = new Tone.Noise('white').start();
let staticEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(gain);
let staticFilter = new Tone.Filter(900, 'lowpass').connect(staticEnv);
static.connect(staticFilter);
static.volume.value = -10;

// art effect
let art = new Tone.Noise('pink').start();
let artEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(gain);
let artFilter = new Tone.Filter(500, 'bandpass').connect(artEnv);
art.connect(artFilter);
art.volume.value = -20;

function preload()
{
  staticGIF = createImg('../Gifs/static.gif');
  artGIF = createImg('../Gifs/art.gif');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  textSize(20);
}

function draw() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  text('Click to make image clear', window.innerWidth/2, window.innerHeight/2 - 300);
  // Start everything
  push();
  noFill();
  stroke(100);
  strokeWeight(80);
  rect(window.innerWidth/2 - 300,window.innerHeight/2 - 160, 600, 321);
  strokeWeight(50);
  line(0, 0, window.innerWidth/2 - 300,window.innerHeight/2 - 160);
  line(window.innerWidth, 0, window.innerWidth/2 + 300,window.innerHeight/2 - 160)
  line(0, window.innerHeight, window.innerWidth/2 - 300,window.innerHeight/2 + 160);
  line(window.innerWidth, window.innerHeight, window.innerWidth/2 + 300,window.innerHeight/2 + 160);

  pop();
  Tone.start();
  artGIF.position(window.innerWidth/2 - 320,window.innerHeight/2 - 180);
  staticGIF.position(window.innerWidth/2 - 300,window.innerHeight/2 - 160);
  
  
  
  if(!fuzz)
  {
    // art picture
    // Visuals
    staticGIF.hide();
    artGIF.show();
    // Sounds
    staticEnv.triggerRelease();
    artEnv.triggerAttack();
    // Music
    if((frameCount % (60 * 5.25)) === 0)
    {
      synth.triggerAttackRelease(["B5", "D5", "F5"], 1.75);
      synth.triggerAttackRelease("B5", '8n', '+.25');
      synth.triggerAttackRelease("D5", '8n', '+0.5');
      synth.triggerAttackRelease("F5", '4n', '+0.75');
      synth.triggerAttackRelease("D5", '8n', '+1.25');
      synth.triggerAttackRelease("B5", '8n', '+1.5');
      synth.triggerAttackRelease(["D5", "F5", "A5"], 1.75, '+1.75');
      synth.triggerAttackRelease("D5", '8n', '+2');
      synth.triggerAttackRelease("F5", '8n', '+2.25');
      synth.triggerAttackRelease("A5", '4n', '+2.5');
      synth.triggerAttackRelease("F5", '8n', '+3');
      synth.triggerAttackRelease("D5", '8n', '+3.25');
      synth.triggerAttackRelease(["C5", "E5", "G5"], 1.75, '+3.5');
      synth.triggerAttackRelease("C5", '8n', '+3.75');
      synth.triggerAttackRelease("E5", '8n', '+4');
      synth.triggerAttackRelease("G5", '4n', '+4.25');
      synth.triggerAttackRelease("E5", '8n', '+4.75');
      synth.triggerAttackRelease("C5", '8n', '+5');
    }
  } else {
    // Static scene
    // Visuals
    artGIF.hide();
    staticGIF.show();
    // Sounds
    artEnv.triggerRelease();
    staticEnv.triggerAttack();
    // Music
    if((frameCount % (60 * 12)) === 0)
    {
      synth.triggerAttackRelease(["C4", "E4", "A4"], '1n');
      synth.triggerAttackRelease(["C4", "E4", "B4"], '1n', '+4');
      synth.triggerAttackRelease(["C4", "E4", "C4"], '1n', '+8');

    }
  }
}

// Switch context static -> art -> static
function mousePressed() {
  envelope.triggerAttackRelease('8n');
  fuzz = !fuzz;
  frameCount = 0;
}