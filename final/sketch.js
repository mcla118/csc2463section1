/* 
Meredith Clark CSC 2463 Final Integration Project
Dr. Webb and Professor Nelson

"Kaleidoscope Keys" is a music maker that utilizes each key to make fun graphics with different sounds
Also utilizing Arduino by having a blinking LED

link to demo video: https://youtu.be/pWqWlZeKsSU
*/



let keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let colors = [];
let opacity = 0;
let fadeAmount = 10;
let index;
let port;
let writer, reader;
let inChar;


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();

   
  if ("serial" in navigator) {
    textAlign(CENTER,CENTER);
    textSize(25);
    
    let button = createButton("Connect");
    button.position(10,10);
    button.mousePressed(connect);
    button.style('width','100px');
    button.style('height','50px');
    button.style('font-size', '20px');
    button.style('background-color', 'black');
    button.style('color', 'white');
   
  }

  // Initialize the synth
  synth = new Tone.Synth().toDestination();

  // Generate random colors
  for (let i = 0; i < keys.length; i++) {
    colors.push(color(random(300), random(300), random(300)));
  }
}

function draw() {
  // Reduce the opacity of the shapes
  background(random(255), random(255), random(255), opacity);
  if (opacity > 0) {
    opacity -= fadeAmount;
  }
}

function heart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}


function keyPressed() {

  let index = keys.indexOf(key.toUpperCase());
  if (index !== -1) {
    // Play the corresponding note
    let note = Tone.Frequency(index + 24, "midi").toFrequency();
    synth.triggerAttackRelease(note, "8n");

    // Draw a random shape with a random color
    fill(colors[index]);

    let shape = floor(random(4));
    let size = random(40, 300);
    let x = random(width);
    let y = random(height);

    if (shape === 1) {
      ellipse(x, y, size, size);
    } else if (shape == 2) {
      rect(x, y, size, size);
    }
    else if (shape==3) {
      for (x = 0; x < width; x += 200) {
        for (y = 0; y < height; y += 200) {
          fill(310*x/width, 127, 255);
          heart(x+200/2, y+200/2, 200/2);
        }
      }
    }
    else {
      beginShape();
      for (let i = 0; i < 6; i++) {
        let angle = map(i, 0, 6, 0, TWO_PI);
        let px = x + cos(angle) * size / 2;
        let py = y + sin(angle) * size / 2;
        vertex(px, py);
      }
      endShape(CLOSE);
    }

  }
}

async function serialRead() {
  while(true) {
    const { value, done } = await reader.read();
    if (done) {
      reader.releaseLock();
      break;
    }
    
    if (inChar === 'LED on') {
      // turn on the LED connected to Arduino pin 13
      console.log('LED on');
      inChar = [1];
    }
  }
}

async function connect() {
  port = await navigator.serial.requestPort();

  await port.open({ baudRate: 9600 });

  writer = port.writable.getWriter();

  reader = port.readable
     .pipeThrough(new TextDecoderStream())
     .pipeThrough(new TransformStream(new LineBreakTransformer()))
     .getReader();
}

class LineBreakTransformer {
  constructor() {
    this.chunks = "";
  }

  transform(chunk, controller) {
    this.chunks += chunk;
    const lines = this.chunks.split("\n");
    this.chunks = lines.pop();
    lines.forEach((line) => controller.enqueue(line));
  }

  flush(controller) {
    controller.enqueue(this.chunks);
  }
}
