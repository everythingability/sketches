//Credit: http://symmetrijks.nl/ Brilliant!

let supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
let ratio, ratioScreen, availableWidth, availableHeight;
let x, y;
let w = 1200, w_init = 1200;
let margin = 30;
let menuWidth = 50;
let w_min = 70;
let h;
let A = 0;
let relativew, relativeh;
let overBox = false;
let locked = false;
let isover = false;
let isblurred = false;
let isPanelOpen = false;
let resizeInWait = false;
let erase = false;
let safety = 0;

let painting, detail;

let currentPainting;
let img, img_list = ['friesian cow black and white jpg_4','friesian cow black and white jpg_3','friesian cow black and white jpg_8','friesian cow black and white jpg_14'];
let title_list = ['The Milkmaid','The Night Watch','The Threatened Swan','Self-portrait']
let painter_list = ['Johannes Vermeer','Rembrandt van Rijn','Jan Asselijn','Vincent van Gogh'];
let titleFontSize_list = [80,62,49,92];

let symmetrijks_logo;

if (supportsTouch) {
  jQuery.getScript( "hammer.min.js");
}

function preload() {
  currentPainting = floor(random(img_list.length));
  if (supportsTouch) {
    img = loadImage('assets/mobile/' + img_list[currentPainting] + '_mobile.jpg');
  } else {
    img = loadImage('assets/' + img_list[currentPainting] + '.jpg');
  }
  robotoBold = loadFont('assets/Roboto-Bold.ttf');
  robotoReg = loadFont('assets/Roboto-Regular.ttf');
  theShader = loadShader('assets/kalei.vert.txt', 'assets/kalei.frag.txt');
  symmetrijks_logo = loadImage('img/logo_h.svg');
}

function setup() {
  if (windowWidth < 900) {
    margin = 15;
  }

  ratio = img.height/img.width;
  if (windowWidth > windowHeight) {
    availableWidth = 0.5*(windowWidth - menuWidth) - margin;
    availableHeight = windowHeight - 2*margin;
  } else {
    availableWidth = windowWidth - menuWidth - 2*margin;
    availableHeight = 0.5*windowHeight - margin;
  }
  ratioScreen = availableHeight/availableWidth;

  can = createCanvas();
  can.hide();

  if (ratioScreen > ratio) {
    detail = createGraphics(availableWidth, availableWidth*ratio,WEBGL);
  } else {
    detail = createGraphics(availableHeight/ratio, availableHeight,WEBGL);
  }

  detail.class('detail');
  detail.show();


  relativew = max(0.2*detail.width,w_min);
  w = 2*relativew*img.width/detail.width;
  relativeh = relativew*ratio;
  h = w*ratio;

  painting = createGraphics(detail.width, detail.height,P2D);
  painting.noFill();
  painting.stroke(255);
  painting.strokeWeight(2);
  painting.image(img,0,0,detail.width,detail.height);
  painting.elt.addEventListener('dblclick', function(e){e.stopPropagation();resetFrame()});
  painting.show();

  x = detail.width/2 - relativew/2;
  y = detail.height/2 - relativeh/2;

  main = createDiv();
  main.class('main');
  if (windowWidth > windowHeight) {
    main.addClass('horizontal');
  } else {
    main.addClass('vertical');
  }
  can.parent(main);
  painting.parent(main);
  detail.parent(main);

  frame = createDiv();
  frame.class('frame');
  frame.parent(main);
  frame.size(relativew, relativeh);
  frame.position(x-1, y-1);

  if (supportsTouch) {
    document.body.addEventListener('touchmove', function(event) {
        event.preventDefault();
      }, false);
    frame.style('transform-origin','center');
    mc = new Hammer(frame.elt, {transform_always_block: true});
    mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));
    mc.add( new Hammer.Rotate());
    mc.add( new Hammer.Pinch());
    mc.get('pinch').set({ enable: true });
    mc.get('rotate').set({ enable: true });
    makeItDraggable_touch();
    makeItRotableAndResizeable_touch();
  }

  loadingPainting = createDiv('Loading painting...');
  loadingPainting.hide();
  loadingPainting.id('loading');
  // loadingPainting.parent(main);

  if (!supportsTouch){
    resizebutton = createDiv('<svg version="1.1" id="Layer_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 448 512" style="enable-background:new 0 0 448 512;" xml:space="preserve"><path fill="currentColor" d="M235.3,292.7l25.4-25.4c6.2-6.2,16.4-6.2,22.6,0L376,360l31.1-33c15.1-15.1,40.9-4.4,40.9,17v112c0,13.3-10.7,24-24,24H312c-21.4,0-32.1-25.9-17-41l32.9-31l-92.7-92.7C229.1,309.1,229.1,298.9,235.3,292.7z M212.7,196.7c6.2,6.2,6.2,16.4,0,22.6l-25.4,25.4c-6.2,6.216.4,6.2-22.6,0L72,152l-31.1,33C25.8,200.1,0,189.4,0,168L0,56c0-13.3,10.7-24,24-24h112c21.4,0,32.1,25.9,17,41L120,104L212.7,196.7L212.7,196.7z"/></svg>');
    resizebutton.id('resize');
    resizebutton.class('framebuttons');
    resizebutton.parent(frame);

    rotatebutton = createDiv('<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sync-alt" class="svg-inline--fa fa-sync-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"></path></svg>');
    rotatebutton.id('rotate');
    rotatebutton.class('framebuttons');
    rotatebutton.parent(frame);

    pivot = createDiv();
    pivot.id('pivot');
    pivot.parent(frame);

    dragicon = createDiv('<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrows-alt" class="svg-inline--fa fa-arrows-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M352.201 425.775l-79.196 79.196c-9.373 9.373-24.568 9.373-33.941 0l-79.196-79.196c-15.119-15.119-4.411-40.971 16.971-40.97h51.162L228 284H127.196v51.162c0 21.382-25.851 32.09-40.971 16.971L7.029 272.937c-9.373-9.373-9.373-24.569 0-33.941L86.225 159.8c15.119-15.119 40.971-4.411 40.971 16.971V228H228V127.196h-51.23c-21.382 0-32.09-25.851-16.971-40.971l79.196-79.196c9.373-9.373 24.568-9.373 33.941 0l79.196 79.196c15.119 15.119 4.411 40.971-16.971 40.971h-51.162V228h100.804v-51.162c0-21.382 25.851-32.09 40.97-16.971l79.196 79.196c9.373 9.373 9.373 24.569 0 33.941L425.773 352.2c-15.119 15.119-40.971 4.411-40.97-16.971V284H284v100.804h51.23c21.382 0 32.09 25.851 16.971 40.971z"></path></svg>');
    dragicon.id('dragicon');
    dragicon.parent(frame);

    makeItHoverable();
    makeItDraggable();
    makeItResizeable();
    makeItRotable();
  }

  makeInterface();
  makePaintingList();
  makeInfoPanel();

  preloadImagesLow(img_list);

}

// MAIN FUNCTION

function draw() {
  if (frameCount < 2 || locked) {
    let x_ = x;
    let y_ = y;

    if (supportsTouch){
      x_ += X_rot(A,relativew,relativeh);
      y_ += Y_rot(A,relativew,relativeh);
    }

    detail.shader(theShader);
    theShader.setUniform('tex0', img);
    theShader.setUniform('xpos',x_/detail.width);
    theShader.setUniform('ypos',y_/detail.height);
    theShader.setUniform('w',w/img.width);
    theShader.setUniform('ratio',ratio);
    theShader.setUniform('A',-A);
    detail.rect(0,0,detail.width,detail.height);
  }
  //theShader.setUniform('ratio',map(mouseX, 0, width, 0, 1.0));
  
}

// INTERFACE

function makeInterface() {
  interface = createDiv();
  interface.class('interface');

  logo = createImg("img/logo.svg","");
  logo.class('logo');
  logo.parent(interface);
  logo.elt.onclick = function(){showInfo(true)};

  paintingChoice = createButton('<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="image" class="svg-inline--fa fa-image fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg>');
  paintingChoice.parent(interface);
  paintingChoice.mousePressed(showPaintingList);
  paintingChoice.elt.title = "Choose a painting";

  saveButton = createButton('<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="save" class="svg-inline--fa fa-save fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"></path></svg>');
  saveButton.parent(interface);
  saveButton.mousePressed(savePic);
  saveButton.elt.title = "Save the result";

  infoButton = createButton('<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>');
  infoButton.parent(interface);
  infoButton.id("infoButton");
  infoButton.mousePressed(function(){showInfo(false)});
  infoButton.elt.title = "Get information on the painting";

  if (screenfull.enabled) {
    fullscreenbutton = createButton('<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="expand-arrows-alt" class="svg-inline--fa fa-expand-arrows-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 344v112a23.94 23.94 0 0 1-24 24H312c-21.39 0-32.09-25.9-17-41l36.2-36.2L224 295.6 116.77 402.9 153 439c15.09 15.1 4.39 41-17 41H24a23.94 23.94 0 0 1-24-24V344c0-21.4 25.89-32.1 41-17l36.19 36.2L184.46 256 77.18 148.7 41 185c-15.1 15.1-41 4.4-41-17V56a23.94 23.94 0 0 1 24-24h112c21.39 0 32.09 25.9 17 41l-36.2 36.2L224 216.4l107.23-107.3L295 73c-15.09-15.1-4.39-41 17-41h112a23.94 23.94 0 0 1 24 24v112c0 21.4-25.89 32.1-41 17l-36.19-36.2L263.54 256l107.28 107.3L407 327.1c15.1-15.2 41-4.5 41 16.9z"></path></svg>');
    fullscreenbutton.mousePressed(fullscreenToggle);
    fullscreenbutton.parent(interface);
    fullscreenbutton.elt.title = "Fullscreen mode ON/OFF";
  }

  closePanelButton = createButton('<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>');
  closePanelButton.id("closePanelButton");
  closePanelButton.elt.title = "Close the panel";
  closePanelButton.hide();

}

function fullscreenToggle() {
  screenfull.toggle();
  resetCanvases(true);
}

/*
if (screenfull.enabled) {
	screenfull.onchange(function() {
    if (!screenfull.isFullscreen) {
      fullscreenbutton.html('<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="expand-arrows-alt" class="svg-inline--fa fa-expand-arrows-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 344v112a23.94 23.94 0 0 1-24 24H312c-21.39 0-32.09-25.9-17-41l36.2-36.2L224 295.6 116.77 402.9 153 439c15.09 15.1 4.39 41-17 41H24a23.94 23.94 0 0 1-24-24V344c0-21.4 25.89-32.1 41-17l36.19 36.2L184.46 256 77.18 148.7 41 185c-15.1 15.1-41 4.4-41-17V56a23.94 23.94 0 0 1 24-24h112c21.39 0 32.09 25.9 17 41l-36.2 36.2L224 216.4l107.23-107.3L295 73c-15.09-15.1-4.39-41 17-41h112a23.94 23.94 0 0 1 24 24v112c0 21.4-25.89 32.1-41 17l-36.19-36.2L263.54 256l107.28 107.3L407 327.1c15.1-15.2 41-4.5 41 16.9z"></path></svg>');
    } else {
      fullscreenbutton.html('<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="compress-arrows-alt" class="svg-inline--fa fa-compress-arrows-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M200 288H88c-21.4 0-32.1 25.8-17 41l32.9 31-99.2 99.3c-6.2 6.2-6.2 16.4 0 22.6l25.4 25.4c6.2 6.2 16.4 6.2 22.6 0L152 408l31.1 33c15.1 15.1 40.9 4.4 40.9-17V312c0-13.3-10.7-24-24-24zm112-64h112c21.4 0 32.1-25.9 17-41l-33-31 99.3-99.3c6.2-6.2 6.2-16.4 0-22.6L481.9 4.7c-6.2-6.2-16.4-6.2-22.6 0L360 104l-31.1-33C313.8 55.9 288 66.6 288 88v112c0 13.3 10.7 24 24 24zm96 136l33-31.1c15.1-15.1 4.4-40.9-17-40.9H312c-13.3 0-24 10.7-24 24v112c0 21.4 25.9 32.1 41 17l31-32.9 99.3 99.3c6.2 6.2 16.4 6.2 22.6 0l25.4-25.4c6.2-6.2 6.2-16.4 0-22.6L408 360zM183 71.1L152 104 52.7 4.7c-6.2-6.2-16.4-6.2-22.6 0L4.7 30.1c-6.2 6.2-6.2 16.4 0 22.6L104 152l-33 31.1C55.9 198.2 66.6 224 88 224h112c13.3 0 24-10.7 24-24V88c0-21.3-25.9-32-41-16.9z"></path></svg>');
    }
	});
};*/

// SAVE PICTURE

function savePic() {

  // let saveWidth = 1200;
  let saveWidth = detail.width;
  let saveHeight = saveWidth*ratio;
  let thumbnailHeight = 0.25*saveWidth;
  let thumbnailWidth = thumbnailHeight/ratio;
  let fontRatio = saveWidth/700;
  let big_margin = saveWidth/20;
  let small_margin = big_margin/2;
  let logoWidth = 0.27*saveWidth;
  let logoHeight = logoWidth*9/75;

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  var hour = String(today.getHours()).padStart(2, '0');
  var min = String(today.getMinutes()).padStart(2, '0');
  var sec = String(today.getSeconds()).padStart(2, '0');
  today = dd + mm + yyyy + '_' + hour + min + sec;

  let x_ = x;
  let y_ = y;

  if (supportsTouch){
    x_ += X_rot(A,relativew,relativeh);
    y_ += Y_rot(A,relativew,relativeh);
  }

  let finalW = saveWidth+ 2*big_margin;
  let finalH = saveHeight + 2*big_margin + small_margin + thumbnailHeight;

  let savecanvas = createGraphics(finalW,finalH,WEBGL);
  savecanvas.setAttributes('premultipliedAlpha', true);
  savecanvas.translate(-savecanvas.width/2,-savecanvas.height/2);
  savecanvas.background(255);
  savecanvas.fill(0);
  savecanvas.textFont(robotoBold);
  savecanvas.textAlign(LEFT,BOTTOM);
  savecanvas.textSize(floor(fontRatio*titleFontSize_list[currentPainting]));
  painting.push();
  painting.strokeWeight(painting.height/60);
  painting.translate(x_,y_);
  painting.rotate(A);
  painting.rect(0,0,relativew,relativeh);
  painting.pop();
  savecanvas.image(painting,big_margin,big_margin,thumbnailWidth,thumbnailHeight);
  /*savecanvas.text(title_list[currentPainting], thumbnailWidth + big_margin + small_margin, thumbnailHeight + small_margin/2);
  savecanvas.textFont(robotoReg);
  savecanvas.textSize(floor(fontRatio*25));
  savecanvas.text(painter_list[currentPainting], thumbnailWidth + + big_margin + small_margin,thumbnailHeight + big_margin);
   */
  savecanvas.image(detail,big_margin,thumbnailHeight + big_margin + small_margin,saveWidth,saveHeight);
 
  savecanvas.save('kaleidoscope_' + today + '.jpg');
  //savecanvas.remove();
  //save(painting, 'kaleidoscope_' + today + '.jpg')
  painting.image(img,0,0,detail.width,detail.height);
}

// CHECK BOUNDARIES
// of detail frame so that it stays within the painting
// extra work with touch where the rotation is made with respect to center and not top-left corner

function X_rot(A,w,h){
  return(0.5*w*(1 - cos(A)) + 0.5*h*sin(A));
}

function Y_rot(A,w,h){
  return(-0.5*w*sin(A) + 0.5*h*(1 - cos(A)));
}

function checkBoundary(x_,y_){
  return (
     x_ > safety  &&
     x_ < detail.width - safety &&
     y_ > safety &&
     y_ < detail.height - safety
   )
}

function checkBoundaries(x_,y_,A,w) {
  let h = w*ratio;
  let x = x_, y = y_;
  if (supportsTouch){
    x += X_rot(A,w,h);
    y += Y_rot(A,w,h);
  }
  return(
    checkBoundary(x,y) &&
    checkBoundary(x + w*cos(A),y + w*sin(A)) &&
    checkBoundary(x + w*cos(A) - h*sin(A),y + w*sin(A) + h*cos(A)) &&
    checkBoundary(x - h*sin(A),y + h*cos(A) )
  )
}

// RESET FRAME & CANVASES

function resetFrame() {
  locked = true;
  A = 0;
  relativew = max(0.2*detail.width,w_min);
  w = 2*relativew*img.width/detail.width;
  relativeh = relativew*ratio;
  h = w*ratio;
  x = detail.width/2 - relativew/2;
  y = detail.height/2 - relativeh/2;
  frame.style('transform', 'rotate(0)' );
  frame.size(relativew, relativeh);
  frame.position(x-1, y-1);
  setTimeout(function(){locked = false},200);
}


var doit;
window.onresize = function() {
  if (!isPanelOpen) {
    clearTimeout(doit);
    doit = setTimeout(function(){resetCanvases(true);}, 100);
  } else {
    resizeInWait = true;
  }
};

function keyPressed() {
  if (!isblurred) {
    if (keyCode === ENTER) {
      savePic();
    } else if (keyCode === LEFT_ARROW) {
      prevPainting();
    } else if (keyCode === RIGHT_ARROW) {
      nextPainting();
    }
  } else {
    if (keyCode === ESCAPE) {
      infoPanel.hide();
      paintingList.hide();
      jQuery("#menuInfoBottom").hide();
      infoPanel.html(" ");
      closePanelButton.hide();
      closePanelButton.mousePressed(null);
      showMain();
    }
  }

  return false; // prevent default
}

function resetCanvases(keepFrame) {

  locked = true;
  if (keepFrame){
    var prev_detail_width = detail.width, prev_detail_height = detail.height;
    var prev_frame_width = relativew, prev_frame_height = relativeh;
    var prev_dx = x;
    var prev_dy = y;
  }

  if (windowWidth < 900) {
    margin = 15;
  } else {
    margin = 30;
  }

  if (windowWidth > windowHeight) {
    availableWidth = 0.5*(windowWidth - menuWidth) - margin;
    availableHeight = windowHeight - 2*margin;
  } else {
    availableWidth = windowWidth - menuWidth - 2*margin;
    availableHeight = 0.5*windowHeight - margin;
  }
  ratioScreen = availableHeight/availableWidth;

  if (ratioScreen > ratio) {
    detail.resizeCanvas(availableWidth, availableWidth*ratio,WEBGL);
  } else {
    detail.resizeCanvas(availableHeight/ratio, availableHeight,WEBGL);
  }

  main.removeClass('horizontal');
  main.removeClass('vertical');
  if (windowWidth > windowHeight) {
    main.addClass('horizontal');
  } else {
    main.addClass('vertical');
  }

  if (keepFrame) {
    var zoom = detail.width/prev_detail_width;
    x = prev_dx*zoom;
    y = prev_dy*zoom;
    relativew = 0.5*w*detail.width/img.width;
    relativeh = relativew*ratio;
    h = w*ratio;
    frame.size(relativew, relativeh);
    frame.position(x-1, y-1);
  } else {
    resetFrame();
  }

  painting.resizeCanvas(detail.width, detail.height,P2D);
  painting.image(img,0,0,detail.width,detail.height);

  setTimeout(function(){locked = false},200);
}

// HANDLE CHANGE OF PAINTING

function mod(n, m) {
  return (((n % m) + m) % m);
}

function nextPainting(){
  currentPainting = mod(currentPainting+1,img_list.length);
  changeToPainting(currentPainting);
}

function prevPainting(){
  currentPainting = mod(currentPainting-1,img_list.length);
  changeToPainting(currentPainting);
}

function changeToPainting(painting_number) {
  var loadingTimeout = setTimeout(function(){jQuery("#loading").fadeIn()},300);
  main.style('opacity',0);
  let imagePath;
  if (supportsTouch) {
    imagePath = 'assets/mobile/' + img_list[currentPainting] + '_mobile.jpg';
  } else {
    imagePath = 'assets/' + img_list[currentPainting] + '.jpg';
  }
  img = loadImage(imagePath, function() {
    locked = true;
    ratio = img.height/img.width;
    resetCanvases(false);
    clearTimeout(loadingTimeout);
    main.style('opacity',1);
    loadingPainting.hide();
    setTimeout(function(){ locked = false; }, 100);
  });

}

// MAIN HIDE/SHOW

var doItBlur;
function hideMain() {
  isPanelOpen = true;
  clearTimeout(doItBlur);
  main.style('filter','blur(50px)');
  interface.style('opacity',0);
  isblurred = true;
}

function showMain() {
  main.style('filter','blur(0)');
  doItBlur = setTimeout(function(){main.style('filter','unset');},1000);
  interface.style('opacity',1);
  isblurred = false;
  isPanelOpen = false;
  if (resizeInWait) {
    resetCanvases(true);
  }
}

// PAINTING LIST

function makePaintingList() {
  paintingList = createDiv();
  paintingList.id('paintingList');
  paintingList.class('panel');
  paintingList.hide();

  for (let k = 0; k < img_list.length; k++) {
    eval('painting_' + k  + ' = createDiv();');
    eval('painting_' + k  + '.parent(paintingList);');
    eval('painting_' + k  + '.class("paintingCard");');

    switchToPaintingk = function(){
      currentPainting = k;
      changeToPainting(k);
      hidePaintingList();
    };

    eval('painting_' + k  + '_thumbnail = createDiv();');
    eval('painting_' + k  + '_thumbnail.parent(painting_' + k +');');
    eval('painting_' + k  + '_thumbnail.class("circle-container");');
    eval('painting_' + k  + '_thumbnail.elt.onclick = function(){currentPainting = k; hidePaintingList(); changeToPainting(k);}; ');

    eval('painting_' + k  + '_img = createImg("assets/thumbnail/' + img_list[k] + '_thumbnail.jpg","");');
    eval('painting_' + k  + '_img.parent(painting_' + k +'_thumbnail);');

    eval('painting_' + k  + '_overlay = createDiv();');
    eval('painting_' + k  + '_overlay.parent(painting_' + k +'_thumbnail);');
    eval('painting_' + k  + '_overlay.class("circle-overlay");');


    eval('painting_' + k  + '_title = createDiv("' + title_list[k] + '");');
    eval('painting_' + k  + '_title.parent(painting_' + k +');');
    eval('painting_' + k  + '_title.class("painting_title");');

    eval('painting_' + k  + '_painter = createDiv("' + painter_list[k] + '");');
    eval('painting_' + k  + '_painter.parent(painting_' + k +');');
    eval('painting_' + k  + '_painter.class("painting_painter");');

  }
}

function showPaintingList() {
  hideMain();
  jQuery("#paintingList").fadeIn();
  closePanelButton.show();
  closePanelButton.mousePressed(hidePaintingList);
}

function hidePaintingList() {
  // jQuery("#paintingList").fadeOut();
  paintingList.hide();
  closePanelButton.hide();
  closePanelButton.mousePressed(null);
  showMain();
}

// INFO PANEL

function makeInfoPanel() {
  infoPanel = createDiv();
  infoPanel.id('infoPanel');
  infoPanel.class('panel');
  infoPanel.hide();
  menuInfoBottom = createDiv();
  menuInfoBottom.id('menuInfoBottom');
  jQuery("#menuInfoBottom").load( "info/menu.html" );
  menuInfoBottom.hide();
}

function showInfo(isMainInfo) {
  if (isMainInfo){
    jQuery("#menuInfoBottom").addClass('onmain');
    // jQuery("#about").hide();
    jQuery("#infoPanel").load( "info/main.html" );
  } else {
    jQuery("#menuInfoBottom").removeClass('onmain');
    // jQuery("#about").show();
    jQuery("#infoPanel").load( "info/" + img_list[currentPainting] + ".html" );
  }
  hideMain();
  jQuery("#infoPanel").fadeIn();
  jQuery("#menuInfoBottom").fadeIn();
  closePanelButton.show();
  closePanelButton.mousePressed(hideInfo);
}

function hideInfo() {
  jQuery("#infoPanel").fadeOut();
  jQuery("#menuInfoBottom").fadeOut();
  infoPanel.html(" ");
  closePanelButton.hide();
  closePanelButton.mousePressed(null);
  showMain();
}

function preloadImagesLow(array) {
    if (!preloadImagesLow.list) {
        preloadImagesLow.list = [];
    }
    var list = preloadImagesLow.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = "assets/low/" + array[i] + "_low.jpg" ;
    }
}

// FRAME INTERACTIONS
// when touch is supported

if (supportsTouch) {
  function makeItDraggable_touch(){
    mc.on("pan", handleDrag);

    var lastPosX = 0;
    var lastPosY = 0;
    var isDragging = false;

    function handleDrag(ev) {

      var elem = ev.target;

      if ( ! isDragging ) {
        isDragging = true;
        locked = true;
        lastPosX = elem.offsetLeft;
        lastPosY = elem.offsetTop;
      }

      var posX = ev.deltaX + lastPosX;
      var posY = ev.deltaY + lastPosY;

      if (checkBoundaries(posX,posY,A,relativew)){
        x = posX;
        y = posY;
        elem.style.left = (posX - 1) + "px";
        elem.style.top = (posY - 1) + "px";
      }


      if (ev.isFinal) {
        isDragging = false;
        locked = false;
      }
    }
  }

  function makeItRotableAndResizeable_touch(){

    var lastRotation, startRotation;
    var adjustScale = 1;
    var currentScale = 1;
    var maxzoom = 0.005

    mc.on('rotatemove pinchmove', function(e) {
      var diff = startRotation - e.rotation*Math.PI/180;
      currentScale = adjustScale * min(max(1 - maxzoom,e.scale),1 + maxzoom);
      if (checkBoundaries(x,y,lastRotation - diff,relativew)) {
        A = lastRotation - diff;
        relativew = max(currentScale*relativew,w_min);
        relativeh = relativew*ratio;
        w = 2*relativew*img.width/detail.width;
        h = w*ratio;
        frame.size(relativew, relativeh);
        frame.style('transform', 'rotate(' + A*180/Math.PI +'deg)' );
      }
    });

    mc.on('rotatestart pinchstart', function(e) {
      locked = true;
      lastRotation = A;
      startRotation = e.rotation*Math.PI/180;
      });

      mc.on('rotateend pinchend', function(e) {
      locked = false;
      lastRotation = A;
    });

  }

}

// FRAME INTERACTIONS
// when touch is not supported

if (!supportsTouch) {

  function activateFrame() {
    frame.addClass('locked');
    resizebutton.addClass('show');
    rotatebutton.addClass('show');
    dragicon.addClass('show');
  }

  function deactivateFrame() {
    if (!isover){
      frame.removeClass('locked');
      resizebutton.removeClass('show');
      rotatebutton.removeClass('show');
      dragicon.removeClass('show');
    }
  }

  function makeItHoverable() {
      frame.elt.onmouseover = function() {
        isover = true;
        if (!locked){
          activateFrame();
        }
      }

      frame.elt.onmouseleave = function() {
        isover = false;
        if (!locked){
          deactivateFrame();
        }
      }
  }

  function makeItDraggable(){
    let prevX;
    let prevY;

    frame.elt.onmousedown = function(e){
      locked = true;
      activateFrame();
      e.preventDefault();
      prevX = e.clientX;
      prevY = e.clientY;

      document.onmouseup = function(e){
        locked = false;
        deactivateFrame();
        document.onmouseup = null;
        document.onmousemove = null;
      }

      document.onmousemove = function(e){
        e.preventDefault();
          dX = e.clientX - prevX;
          dY = e.clientY - prevY;
          prevX = e.clientX;
          prevY = e.clientY;

          if (checkBoundaries(x + dX,y + dY,A,relativew)){
            x += dX;
            y += dY;
            frame.position(x-1, y-1);
          }
      };
    };
  }


  function makeItResizeable(){
    let prevX;
    let theta = atan2(detail.width,detail.height);
    let d = dist(0,0,relativew,relativeh);

    resizebutton.elt.onmousedown = function(e){
      locked = true;
      activateFrame();
      e.preventDefault();
      e.stopPropagation();
      prevX = e.clientX;
      prevY = e.clientY;


      document.onmouseup = function(e){
        locked = false;
        deactivateFrame();
        document.onmouseup = null;
        document.onmousemove = null;
      }

      document.onmousemove = function(e){
        e.preventDefault();
          dX = e.clientX - prevX;
          prevX = e.clientX;
          dY = e.clientY - prevY;
          prevY = e.clientY;
          if (checkBoundaries(x,y,A,relativew + dX*cos(A) + dY*sin(A))) {
            relativew += dX*cos(A) + dY*sin(A);
            relativew = max(relativew,w_min);
            relativeh = relativew*ratio;
            w = 2*relativew*img.width/detail.width;
            h = w*ratio;
            frame.size(relativew, relativeh);
          }
      };
    };
  }

  function makeItRotable(){
    let prevA;

    rotatebutton.elt.onmousedown = function(e){
      locked = true;
      pivot.addClass('show');
      activateFrame();
      e.preventDefault();
      e.stopPropagation();
      prevA = Math.atan2(e.clientY - y,e.clientX - x);

      document.onmouseup = function(e){
        locked = false;
        pivot.removeClass('show');
        deactivateFrame();
        document.onmouseup = null;
        document.onmousemove = null;
        frame.elt.onmouseover = function() {
            activateFrame();
          }
        }

      document.onmousemove = function(e){
        e.preventDefault();
          dA = Math.atan2(e.clientY - y,e.clientX - x) - prevA;
          prevA = Math.atan2(e.clientY - y,e.clientX - x);
          if (checkBoundaries(x,y,A+dA,relativew)) {
            A += dA;
            frame.style('transform', 'rotate(' + A*180/Math.PI +'deg)' );
          }
      };
    };
  }

}
