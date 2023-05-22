let mic;
let sound;
let button;

function mousePressed() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function setup() {

    // Create a start button
    button = createButton('Start3 Audio');
    button.mousePressed(() => {
        if (getAudioContext().state !== 'running') {
            getAudioContext().resume();
        }

        // Create a new audio in
        // create a new Amplitude analyzer

        mic = new p5.AudioIn();
        mic.start();

        sound = new p5.Amplitude();
        sound.setInput(mic);

        fft = new p5.FFT();
        fft.setInput(mic);



        fullscreen(true);

        setTimeout(() => {
            createCanvas(windowWidth, windowHeight);
            colorMode(RGB);
        }, 500)

        // Remove the start button
        button.remove();
    });
}

// input:
const inputResponseLevel = 1
const inputResponseFrequency = 60
const power = 5

// grid:
const gridSize = 12

// noise:
const noiseDensity = 0.3
const noiseSpeedFactor = 0.01

let frame = 0
function draw() {
  noStroke();

  if(!sound) return


  background('rgba(0,0,0,0.3)');

  fft.analyze();
  level = fft.getEnergy(inputResponseFrequency) / 255 * inputResponseLevel
  level = Math.pow(level, power);




  // Determine the size of the grid
  let gridWidth = width / gridSize;
  let gridHeight = height / gridSize;

  const ratio = gridHeight / gridWidth * 1.5

  // Draw a 4x4 grid of ellipses
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {

      // Incorporate Perlin noise into the diameter of the ellipse
      let noiseFactor = noise(i * noiseDensity + frame * noiseSpeedFactor, j * noiseDensity + noiseSpeedFactor);


      let size = map(level * noiseFactor,
        0, 1, 0, gridHeight
      )

      let x = gridWidth / 2 + i * gridWidth;
      let y = gridHeight / 2 + j * gridHeight;

      // fill(color(255, 255, 255, diam * 100))
      fill(color(255, 255, 255, 255))

      rectMode(CENTER)
      rect(x, y, size / ratio, size);
    }
  }

  frame ++
}
