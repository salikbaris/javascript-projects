// var xoff = 0;
var inc = 0.01;
var i = 0;
function setup() {
    createCanvas(600, 600);
    pixelDensity(1);
    noiseDetail(10);
}


function draw() {
    var yoff = i;
    loadPixels();
    for (var x = 0; x < width; x++) {
        var xoff = i;
        for (var y = 0; y < height; y++) {
            var index = (x + y * width) * 4;
            var r = noise(xoff, yoff) * 255;
            pixels[index] = r;
            pixels[index + 1] = r;
            pixels[index + 2] = r;
            pixels[index + 3] = 255;
            
            xoff += inc;
        }
        yoff += inc;
        
    }
    i += inc;
    updatePixels();
    noLoop();
}
