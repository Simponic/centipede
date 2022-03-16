game.graphics = (
  (context) => {
    context.imageSmoothingEnabled = false;
    const clear = () => {
      context.clearRect(0, 0, game.width, game.height);
    };
    
    const Sprite = ({sheetSrc, spriteX, spriteY, spriteWidth, spriteHeight, timePerFrame, cols, rows, numFrames, drawFunction}) => {
      timePerFrame = timePerFrame ?? 100;
      numFrames = numFrames ?? 1;
      cols = cols ?? numFrames;
      rows = rows ?? 1;

      let ready = false;

      let image;
      if (sheetSrc) {
        image = new Image();
        image.src = sheetSrc;
        image.onload = () => { ready = true; };
      }

      let currentFrame = 0;
      let lastTime = performance.now();

      let draw;
      if (!drawFunction) {
        draw = (_elapsedTime, {x, y, rot, width, height}) => {

          if (ready) {
            if (numFrames > 1) {
              if (performance.now()-lastTime > timePerFrame) {
                lastTime = performance.now();
                currentFrame = (currentFrame + 1) % numFrames;
              }
            }
            context.save();
            context.translate(x+width/2, y+height/2);
            context.rotate(rot * Math.PI / 180);
            context.translate(-x-width/2, -y-height/2);
            const row = currentFrame % rows;
            const col = Math.floor(currentFrame / rows);
            context.drawImage(image, spriteX+col*spriteWidth, spriteY+row*spriteHeight, spriteWidth, spriteHeight, x, y, width, height);
            context.restore();
          }
        };
      } else {
        draw = (elapsedTime, drawSpec) => drawFunction(elapsedTime, drawSpec, context);
      }
      return { draw, timePerFrame, numFrames };
    }

    return { clear, Sprite };
  }
)(document.getElementById("game-canvas").getContext("2d"));