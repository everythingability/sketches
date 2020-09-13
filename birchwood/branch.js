function drawBranch(x, y,r, col) {
  f = 0;
  k = random(20, 100)
  f++;
  j = 380;
  print("branch:",x,y)
  push()
    translate(x,y)
    rotate(2-r)

    while (--j)
      if ((k = j - f) % 80 == 0) {
        push();
          scale(s = pow(1.1, j / 10), s / 2);
          randomSeed(k);
          translate(x, y)
          grow(7, col);
        pop();
      }
  pop()
  resetMatrix()
}

function grow(c, col)  {
  if (c) {
    stroke(col)
    line(0, 0, 0, d = -30);
    translate(0, d);
    for (i of [-1, 1]) {
      push();
        rotate(i * random(PI / 8));
        scale(random(0.6, 0.9));
        grow(c - 1, col);
      pop();
    }
  }
}