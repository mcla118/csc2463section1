function setup() {
    createCanvas(430, 430);
    colorMode (HSB);
  }
  
  function draw() {
    background(220,90, 55);

    strokeWeight (5);
    stroke (0, 0, 100);

    // Drawing the green circle
    push ();
    fill (110,80,60);
    circle (215,215,215);
    pop ();
    describe('green circle with a white outline in the middle of the canvas');


 // Drawing the star
 fill(360,90,90)
  
 beginShape();
 vertex(330,180)
 vertex(250,180)
 vertex(220,95)
 vertex(190,180)
 vertex(100,180)
 vertex(165,235)
 vertex(140,305)
 vertex(215,265)
 vertex(290,305)
 vertex(265,235)
 endShape(CLOSE);
 describe('red star with a white outline in the middle of the canvas');
}


