// var xoff = 0;
var inc = 0.01;
var start = 0;
function setup() {
    createCanvas(400, 400);
}


function draw() {
    background(51);
    stroke(255);
    noFill();
    beginShape();
    var xoff = start;
    for (var x = 0; x < width; x++) {
        stroke(255);
        // var n = map(noise(xoff), 0, 1, 0, height);
        // var s = map(sin(xoff), -1, 1, -50, 50);
        // var y = s + n;


        // var y = random(height);
        var y = noise(xoff) * height;
        vertex(x, y);
        
        xoff += inc;
        
    }
    endShape();

    start += inc;









    // var x = map(noise(xoff), 0, 1, 0, width);
    // var y = map(noise(xoff+10000), 0, 1, 0, height);
    
    // xoff += 0.01;

    // ellipse(x, y, 24, 24);
    

}