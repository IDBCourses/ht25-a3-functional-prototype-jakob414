/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// -Global Variables-

let rotation = 0.8;

// Initial stick position
let squareX = window.innerWidth * 0.5 - 75;
let squareY = window.innerHeight - 300 - 75;

// dom element to show elapsed time
const timerElement = document.getElementById("timer");

// Game constants
const centerAngle = 45;    // Neutral square angle
const size = 150;          // Square size
const gravity = 0.01;      // Gravity affecting tilt of square
const maxTiltRange = 98;   // Maximum tilt before game over
const tiltFriction = 0.98; // Reduces velocity over time


// Game state object
const game = {
  tilt: centerAngle,       // Current tilt of the square
  velocity: 0,             // Tilt velocity
  running: true,           // Is the game running?
  startTime: 0             // Time when game starts
  
}

// Key mapping for tilting left
const leftKeys = [
  {key: "d", force: - 0.3},
  {key: "s", force: - 0.6},
  {key: "a", force: - 0.9}
];

// Key mapping for tilting right
const rightKeys = [
 {key: "j", force:  0.3},
  {key: "k", force:  0.6},
  {key: "l", force:  0.9}
];

// - Event listeners -

// Listen for key presses to tilt the square
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  // Check left keys
 for (let i = 0; i < leftKeys.length; i++) {
  if (key === leftKeys[i].key) {
    game.velocity += leftKeys[i].force;
  }
 }

 // Check right keys
 for (let i = 0; i < rightKeys.length; i++) {
  if (key === rightKeys[i].key) {
    game.velocity += rightKeys[i].force;
  }
 }
});

// - Game loop - 
function loop() {
  //
squareX = window.innerWidth * 0.5 - 75;
squareY = window.innerHeight - 300 - 75;
if (!game.running) return;

const elapsed = (performance.now() - game.startTime) / 1000;
const currentGravity = gravity * (1 + elapsed * 0.1);
timerElement.textContent = `Time: ${elapsed.toFixed(1)}s`;

if (game.tilt > centerAngle) game.velocity += currentGravity;
else if (game.tilt < centerAngle) game. velocity -= currentGravity;

game.tilt += game.velocity;
game.velocity *= tiltFriction;

Util.setRotation(game.tilt);
Util.setPositionPixels(squareX, squareY);
Util.setSize(size);

if (game.tilt > centerAngle + maxTiltRange || game.tilt < centerAngle - maxTiltRange){
game.running = false;
Util.setColour(0, 100, 50, 1);
setTimeout(restartGame);
}
  window.requestAnimationFrame(loop);
}

function restartGame(){
  game.tilt = 45;
  game.velocity = 0;
  game.running = true;
  game.velocity = (Math.random() - 0.5) * 0.4;
  game.startTime = performance.now();
}

// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  // Put your event listener code here
  Util.setSize(size)
Util.setPositionPixels(squareX, squareY)
Util.setRotation(rotation)
game.velocity = (Math.random() - 0.5) * 0.4;
game.startTime = performance.now();

  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!
