let sound1 = new Tone.Player('../sounds/cowbell.mp3');


let sounds = new Tone.Players({
  'cowbell': '../sounds/cowbell.mp3',
  'high_hat': '../sounds/high_hat.mp3',
  'bass': '../sounds/bass.mp3',
  'snare': '../sounds/snare.mp3'
});

let buttons = [];
let soundsConsectuve = ['bass', 'snare', 'high_hat', 'cowbell'];

var delay = new Tone.FeedbackDelay("8n", 0.5);
delay.delayTime.value = 0;
var gain = new Tone.Gain().toDestination();
gain.gain.value = 0;


sounds.connect(delay);
delay.connect(gain);
sounds.connect(gain);

let slider1;  // using p5.dom
// NexusUI elements
let nxSlider;
let nxDial;
let nxButtons= [];

function preload() {
  // Sets up slider for delay
  nxSlider = new Nexus.Slider('#slider');

  //Sets up dial for gain
  nxDial = Nexus.Add.Dial('#dial',{
    'size': [100,100]
  });

  //Sets up row of buttons for sound options
  soundsConsectuve.forEach((sound,index) => {
    nxButtons[index] = Nexus.Add.TextButton('#instrument',{
      'size': [80,30],
      'state': false,
      'text': sound
    })
  })
}


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    // Links sounds
    sound1.toDestination();
    sounds.toDestination();

    // Canvas button 1
    buttons[0] = createButton('Bass');
    buttons[0].position(10, 400);
    buttons[0].size(200, 100);
    buttons[0].mousePressed( ()=>playSound('bass') );

    // Canvas button 2
    buttons[1] = createButton('Snare');
    buttons[1].position(220, 400);
    buttons[1].size(200, 100);
    buttons[1].mousePressed( ()=>playSound('snare') );

    // Canvas button 3
    buttons[2] = createButton('High Hat');
    buttons[2].position(10, 510);
    buttons[2].size(200, 100);
    buttons[2].mousePressed( ()=>playSound('high_hat') );

    // Canvas button 4
    buttons[3] = createButton('Cow Bell');
    buttons[3].position(220, 510);
    buttons[3].size(200, 100);
    buttons[3].mousePressed( ()=>playSound('cowbell') );

    // Slider change changes delay
    nxSlider.on('change', function (v){
      delay.delayTime.value = v;
    });
  
    //Dial change changes gain
    nxDial.on('change', (v)=>{
      console.log(v)
      gain.gain.value = v;
    });

    // Nexus buttons play sounds
    soundsConsectuve.forEach((sound,index) => {
      nxButtons[index].on('click', function (v){
        console.log(v);
        sounds.player(soundsConsectuve[index]).start();
      })
    });

  }

function draw() {
    background(255, 255, 255);
}

function keyPressed() {
  if(keyCode == '49') {
    sounds.player('cowbell').start();
  } else if(keyCode == '50') {
    sounds.player('high_hat').start();
  } else if(keyCode == '51') {
    sounds.player('bass').start();
  } else if(keyCode == '52') {
    sounds.player('snare').start();
  }
}

function playSound(whichSound) {
  if(whichSound == 'cowbell') {
    sounds.player('cowbell').start();
  } else if(whichSound == 'high_hat') {
    sounds.player('high_hat').start();
  } else if(whichSound == 'bass') {
    sounds.player('bass').start();
  } else if(whichSound == 'snare') {
    sounds.player('snare').start();
  }
}
