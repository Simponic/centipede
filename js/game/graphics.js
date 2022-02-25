game.graphics = (
  (context) => {
    const clear = () => {
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.rect(0, 0, game.width, game.height);
      context.fill();
      context.restore();
    };
    
    const Sprite = ({sheetSrc, spriteX, spriteY, spriteWidth, spriteHeight, timePerFrame, numFrames}) => {
      timePerFrame = timePerFrame ?? 100;
      numFrames = numFrames ?? 1;

      let ready = false;

      const image = new Image();
      image.src = sheetSrc;
      image.onload = () => { ready = true; };

      let currentFrame = 0;
      let currentTime = 0;
      const draw = (elapsedTime, {x, y, rot, width, height}) => {
        if (ready) {
          currentTime += elapsedTime;
          if (currentTime > timePerFrame) {
            currentTime = 0;
            currentFrame = (currentFrame + 1) % numFrames;
          }
          context.save();
          context.translate(x+width/2, y+height/2);
          context.rotate(rot * Math.PI / 180);
          context.translate(-x-width/2, -y-height/2);
          context.drawImage(image, spriteX+currentFrame*spriteWidth, spriteY, spriteWidth, spriteHeight, x, y, width, height);
          context.restore();
        }
      }
      return { draw };
    }

    return { clear, Sprite };
  }
)(document.getElementById("game-canvas").getContext("2d"));