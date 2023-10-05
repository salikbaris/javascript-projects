let xx, xy, cx, cy;
let anglex;
let anglexoff;
let angley;
let angleyoff;
let phase;
let dtx;
let dty;
let circlesCountx;
let circlesCounty;
let valuesy = [];
let valuesx = [];
let factorx;
let factory;
let sliderx;
let sliderax;
let slidery;
let slideray;
let sliderfactorx;
let sliderfactory;
let sliderphase;
let rx;
let ry;
let restartButton;
function setup() {
  createCanvas(1920, 1080);
  // let r = rx * 4 / (n * factorx * PI);

  anglex = 0;
  angley = 0;
  dtx = 0.01;
  dty = 0.01;

  // circlesCountx = 2;
  // circlesCounty = 2;

  restartButton = createButton("Restart Drawing");
  restartButton.mouseClicked(restartDrawing);
  restartButton.position(width / 2 + (width + 80) / 5, height / 2 + (height + 120) / 4);

  sliderx = createSlider(2, 15, 3, 1);
  sliderx.position(width / 2 - (width - 30) / 7, height / 2 - (height + 20) / 11);

  sliderax = createSlider(0, TWO_PI, 0, 0);
  sliderax.position(width / 2 - (width - 30) / 7, height / 2 - 150);

  sliderfactorx = createSlider(3, 17, 3, 2);
  sliderfactorx.position(width / 2 - (width - 30) / 7, height / 2 - 50);

  slidery = createSlider(2, 15, 3, 1);
  slidery.position(width / 2 + (width + 80) / 5, height / 2 - (height + 120) / 6);

  slideray = createSlider(0, TWO_PI, 0, 0);
  slideray.position(width / 2 + (width + 80) / 5, height / 2 - 250);

  sliderfactory = createSlider(3, 17, 3, 2);
  sliderfactory.position(width / 2 + (width + 80) / 5, height / 2 - 150);

  sliderphase = createSlider(0, PI/2, 0, 0);
  sliderphase.position(width / 2 + (width + 80) / 5, height / 2 + (height + 120) / 4 - 50);
}

function draw() {
  colorMode(HSB);
  background(0);

  circlesCountx = sliderx.value();
  circlesCounty = slidery.value();

  factorx = sliderfactorx.value();
  factory = sliderfactory.value();
  phase = sliderphase.value();

  ry = 200 * factory / 3;
  rx = 200 * factorx / 3;

  noFill();
  push();
  translate(width / 2 - (width + 80) / 10, height / 2 + (height + 20) / 11);
  // circle(0, 0, 2 * r);
  xx = 0;
  xy = 0;

  anglexoff = sliderax.value();

  let rx_max = 0;
  for (let i = 0; i < circlesCountx; i++) {
    let prevx = xx;
    let prevy = xy;
    let n = 2 * i + 1;
    let r = rx * 4 / (n * factorx * PI);
    xx += r * cos(n * factorx * (anglex + anglexoff) + phase);
    xy += r * sin(n * factorx * (anglex + anglexoff) + phase);
    stroke(50);
    circle(prevx, prevy, 2 * r);
    stroke(255);
    line(prevx, prevy, xx, xy);
    rx_max += r;
  }
  pop();
  valuesy.unshift(xy);

  push();
  let yx = 0;
  let yy = 0;
  let ry_max = 0;

  angleyoff = slideray.value();

  translate(width / 2 + (width + 80) / 10, height / 2 - (height + 120) / 6)
  for (let i = 0; i < circlesCounty; i++) {
    let prevx = yx;
    let prevy = yy;
    let n = 2 * i + 1;
    let r = ry * 4 / (n * factory * PI);
    yx += r * cos(n * factory * (angley + angleyoff));
    yy += r * sin(n * factory * (angley + angleyoff));
    stroke(50);
    circle(prevx, prevy, 2 * r);
    stroke(255);
    line(prevx, prevy, yx, yy);
    ry_max += r;
  }
  pop();

  valuesx.unshift(yx);

  let rx_min = -rx_max;
  let ry_min = -ry_max;


  if (valuesy.length > 1000) {
    valuesy.pop();
    valuesx.pop();
  }

  push();
  translate(width / 2 + (width + 80) / 10, height / 2 + (height + 20) / 11);

  let huey = map(valuesx[0], rx_min, rx_max, 0, 360);
  let huex = map(valuesy[0], ry_min, ry_max, 0, 360);

  stroke(huex, 100, 100);
  line(xx - (width + 80) / 5, xy, valuesx[0], valuesy[0]);

  stroke(huey, 100, 100);
  line(yx, yy - (height + 120) / 4, valuesx[0], valuesy[0]);

  let hue = map(valuesx[0] + valuesy[0], -(rx_max + ry_max), rx_max + ry_max, 0, 360, true);
  stroke(hue, 100, 100);
  beginShape();
  for (let i = 0; i < valuesy.length; i++) {
    stroke(hue, 255, 255);
    vertex(valuesx[i], valuesy[i]);

  }
  endShape();
  pop();
  anglex += dtx;
  angley += dty;

}

function restartDrawing() {
  valuesx = [];
  valuesy = [];
}

