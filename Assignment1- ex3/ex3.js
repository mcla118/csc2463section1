function setup() {
    createCanvas(400, 200);
  colorMode (HSB);
  }
  
  function draw() {
    background(0, 225, 0);

// Create the circle for the body of pacman
push ();
fill (60,100,100);
circle (110, 100, 165);
pop ();
describe('yellow circle on left side of canvas');

//Create the triangle that is the mouth of pacman
push ();
fill (0,100,0);
triangle (10, 20, 30, 180, 100, 100);
pop ();
describe('black trianlge on left side of canvas');


// Create the square of the body of the red character
fill (0, 255, 255);
rect (220,82, 158, 100);
describe('red rectangle on ride side of canvas');

//Create the circle of the body of the red character
push ();
strokeWeight (0);
fill (0, 255, 255);
arc (299, 90, 158, 160, 180, PI + QUARTER_PI, OPEN);
pop ();
describe('red arc on right-upper side of canvas');

// Outline of eyes
push ();
strokeWeight (0);
fill (0, 0, 100);
ellipse(260,90,50,50);
ellipse(340,90,50,50);
pop ();
describe('white circles on right side of canvas');

// Pupil of eyes
push ();
strokeWeight (0);
fill (230, 80, 90);
ellipse(260,90,30,30);
ellipse(340,90,30,30);
pop ();
describe('blue circles on right side of canvas');

  }
