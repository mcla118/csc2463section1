// define a variable for the pin connected to the LED
int ledPin = 13;

void setup() {
    // initialize the LED pin as an output pin.
    pinMode(ledPin, OUTPUT);
}

void loop() {
   delay(1000);
    // turn the LED on by sending HIGH voltage
    digitalWrite(ledPin, HIGH);
    // Add a one-second (1,000 millisecond) delay
    delay(1000);
    // turn the LED off by sending LOW voltage
    digitalWrite(ledPin, LOW);
    // Add a one-second delay
    delay(1000);
}
