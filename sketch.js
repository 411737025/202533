let input;
let slider;
let button;
let select;
let iframe;
let offsets = [];
let interval;
let isJumping = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(10, 10);
  input.value('123');
  
  slider = createSlider(28, 52, 32);
  slider.position(input.x + input.width + 10, 10);
  
  select = createSelect();
  select.position(slider.x + slider.width + 10, 10);
  select.option('1');
  select.option('2');
  select.option('3');
  select.changed(handleSelectChange);
  
  button = createButton('Jump');
  button.position(select.x + select.width + 10, 10);
  button.mousePressed(toggleJumping);
  
  iframe = createElement('iframe');
  iframe.position(150, 150);
  iframe.size(windowWidth - 300, windowHeight - 300);
  iframe.hide();
  
  for (let i = 0; i < 100; i++) {
    offsets.push(random(-20, 20)); // Increase the jump range
  }
}

function draw() {
  background(220);
  fill(255);
  let txt = input.value().split('').join(' ');
  let textSizeValue = slider.value();
  textSize(textSizeValue);
  textAlign(CENTER, CENTER);
  
  let txtWidth = textWidth(txt);
  let y = 100;
  let lineHeight = textAscent() + textDescent() + 10;

  if (txtWidth > 0) {
    let repeatTxt = '';
    while (textWidth(repeatTxt) < width) {
      repeatTxt += txt + ' ';
    }
    for (let i = y, j = 0; i < height; i += lineHeight, j++) {
      text(repeatTxt, width / 2 + offsets[j % offsets.length], i);
    }
  }
}

function jumpText() {
  for (let i = 0; i < offsets.length; i++) {
    offsets[i] = random(-20, 20); // Increase the jump range
  }
}

function toggleJumping() {
  if (isJumping) {
    clearInterval(interval);
  } else {
    interval = setInterval(jumpText, 500); // Adjust the interval time as needed
  }
  isJumping = !isJumping;
}

function handleSelectChange() {
  let selectedValue = select.value();
  iframe.show();
  if (selectedValue === '1') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selectedValue === '2') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  } else if (selectedValue === '3') {
    iframe.attribute('src', 'https://hackmd.io/V7E_5VTtRLOpcx7A0JxzLQ');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth - 300, windowHeight - 300);
}
