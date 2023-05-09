let port;
let writer, reader;
let sliderR,sliderG,sliderB; 

let colorValue = 200;
const encoder = new TextEncoder();
const decorder = new TextDecoder();

function setup() {
  createCanvas(windowWidth, windowHeight);
 
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
   
    


    //color slides
    sliderR = createSlider(0, 255, 127);
    sliderR.position(width/4,150);
    sliderR.style('width', width/2+"px"); 
   
    sliderG = createSlider(0, 255, 127);
    sliderG.position(width/4,250);
    sliderG.style('width', width/2+"px"); 
    
    sliderB = createSlider(0, 255, 127);
    sliderB.position(width/4,350);
    sliderB.style('width', width/2+"px");
  }
}


function draw() {
  //change background color
  colorMode(HSB);
  background(colorValue, 204, 100);
  backgroundBox = rect(width/4-10, 90, width/2+20,300);
  //text titles for sliders
  textR = text("Red: "+sliderR.value(), width/2,120);
  textG = text("Green: "+sliderG.value(), width/2,220);
  textB = text(("Blue: "+sliderB.value()), width/2,320);

  
  if (reader) {
    serialRead();
  }
  if(writer && frameCount%5===0){
    writer.write(encoder.encode(sliderR.value()+","+sliderG.value()+","+sliderB.value()+"\n"));
  }
  
}

async function serialRead() {
  while(true) {
    const { value, done } = await reader.read();
    if (done) {
      reader.releaseLock();
      break;
    }
    
    sensorData = JSON.parse(value);
    colorValue = int(value/3);
    console.log(colorValue);
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