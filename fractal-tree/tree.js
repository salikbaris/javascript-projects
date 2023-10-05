var angle = 0;
var slider;
function branch(L) {
    if(L < 1) return;
    line(0, 0, 0, -L);
    translate(0, -L,)
    push();
    rotate(angle);
    branch(L*0.67);
    pop();
    push();
    rotate(-angle);
    branch(L*0.67);
    pop();

}


function setup(){
    slider = createSlider(0, TWO_PI, PI/6, 0.01);
    // angleMode(DEGREES);
    createCanvas(800, 600);
}

function draw(){
    background(51);
    angle = slider.value();
    stroke(255);
    push();
    translate(width/2, height);
    branch(100);
}