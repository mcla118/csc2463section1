function setup() {
    createCanvas(400, 400);
    colorMode (HSB);
  }
  
  function draw() {
    background(0, 0, 100);

    // Drawing the blue circle
    push ();
    strokeWeight (0);
    fill (230, 70, 80, 0.5);
    circle (130,250,200);
    pop ();
    describe('blue transparent circle on left side of canvas');

    // Drawing the green circle
    push ();
    strokeWeight (0);
    fill (130,80,90, 0.5);
    circle (270,250,200);
    pop ();
    describe('green transparent circle on right side of canvas');

    // Drawing the red circle
    push ();
    strokeWeight (0);
    fill (400, 70, 90, 0.5);
    circle (200,135,200);
    pop ();
    describe('red transparent circle in the middle of canvas');
  }