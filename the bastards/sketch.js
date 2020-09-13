function setup() {
  // Use this slider to adjust how many clones to draw
  slider = createSlider(3, 12, 4, 1)

  // Create the main p5 canvas
  renderer = createCanvas(900, 700)
  $canvas = renderer.canvas
  canvasCtx = $canvas.getContext('2d')
  
  // Create a canvas that'll contain our segmentation
  $buffer = document.createElement('canvas')
  $buffer.style.display = 'none'
  bufferCtx = $buffer.getContext('2d')
  document.body.appendChild($buffer)
  
  // Configure Handsfree
  handsfree = new Handsfree({
    autostart: true,
    
    models: {
      head: {enabled: false},
      bodypix: {
        enabled: true,
        
        // Uncomment this if it runs slow for you
        // modelConfig: {
        //   architecture: 'MobileNetV1',
        //   outputStride: 8,
        //   multiplier: 0.75,
        //   quantBytes: 2
        // }
      }
    }
  })
  Handsfree.disableAll()

  $buffer.width = handsfree.debugger.video.width
  $buffer.height = handsfree.debugger.video.height
  widthHeightRatio = $buffer.width / $buffer.height
}

function draw() {
  background(245, 17, 200);
  
  // Just for convenience
  const model = handsfree.model
  const body = handsfree.body

  // Only paint when we have data
  if (body.data) {
    // Create a mask, with all non segmented pixels as magenta
    mask = model.bodypix.sdk.toMask(
      body.data,
      {r: 0, g: 0, b: 0, a: 0},      // foreground
      {r: 255, g: 0, b: 255, a: 255} // background
    )
    
    // Paint the mask into a buffer canvas
    model.bodypix.sdk.drawMask(
      $buffer,
      handsfree.debugger.video,
      mask,
      1, 0, 0
    )

    // Make all magenta pixels in the buffer mask transparent
    let imageData = bufferCtx.getImageData(0, 0, $buffer.width, $buffer.height)
    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 255 && imageData.data[i + 1] === 0 && imageData.data[i + 2] === 255) {
        imageData.data[i + 3] = 0
      }
    }
    bufferCtx.putImageData(imageData, 0, 0)

    // Dimensions of each mask
    w = $buffer.width / slider.value()
    h = w * widthHeightRatio

    // Paste the mask a bunch of times
    for (row = 0; row < slider.value() * 5; row++) {
      for (col = 0; col < slider.value(); col++) {
        // Stagger every other row
        x = col * w - (w / 2) * (row % 2)
        y = row * h / 3 - h / 2 * (1 + row / 10)

        canvasCtx.drawImage($buffer, x, y, w, h)
      }
    }
  }
}