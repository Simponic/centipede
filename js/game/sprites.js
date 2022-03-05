game.sprites = {
  centipedeHead: game.graphics.Sprite({
    sheetSrc: "assets/images/centipede-assets.png", 
    spriteX: 0,
    spriteY: 0,
    spriteWidth: 40,
    spriteHeight: 40,
    numFrames: 4,
    timePerFrame: 100,
  }),
  centipedeBody: game.graphics.Sprite({
    sheetSrc: "assets/images/centipede-assets.png", 
    spriteX: 0,
    spriteY: 80,
    spriteWidth: 40,
    spriteHeight: 40,
    numFrames: 4,
    timePerFrame: 100,
  }),
  spider: game.graphics.Sprite({
    sheetSrc: "assets/images/centipede-assets.png",
    spriteX: 0,
    spriteY: 160,
    spriteWidth: 80,
    spriteHeight: 40,
    numFrames: 8,
    timePerFrame: 100,
    cols: 4,
    rows: 2,
  }),
  flea: game.graphics.Sprite({
    sheetSrc: "assets/images/centipede-assets.png",
    spriteX: 320,
    spriteY: 160,
    spriteWidth: 45,
    spriteHeight: 40,
    numFrames: 4,
    timePerFrame: 500,
    cols: 2,
    rows: 2,
  }),
  scorpion: game.graphics.Sprite({
    sheetSrc: "assets/images/centipede-assets.png",
    spriteX: 0,
    spriteY: 280,
    spriteWidth: 80,
    spriteHeight: 40,
    numFrames: 4,
    timePerFrame: 500,
    cols: 4,
  }),
  ship: game.graphics.Sprite({
    sheetSrc: "assets/images/centipede-assets.png",
    spriteX: 0,
    spriteY: 400,
    spriteWidth: 40,
    spriteHeight: 40,
    numFrames: 1,
    timePerFrame: 0,
    cols: 1,
    rows: 1
  }),
  bullet: game.graphics.Sprite({
    drawFunction: (_elapsedTime, {x, y, rot, width, height}, context) => {
      context.save();
      context.translate(x+width/2, y+height/2);
      context.rotate(rot * Math.PI / 180);
      context.translate(-x-width/2, -y-height/2);
      const fillStyle = context.fillStyle;
      context.fillStyle = "#FF0000";
      context.fillRect(x, y, width, height);
      context.fillStyle = fillStyle;
      context.restore();
    }
  }),
  explosionBig: game.graphics.Sprite({
    sheetSrc: "assets/images/centipede-assets.png",
    spriteX: 0,
    spriteY: 320,
    numFrames: 8,
    spriteWidth: 80,
    spriteHeight: 40,
    cols: 4,
    rows: 2,
    timePerFrame: 500,
  }),
  explosionSmall: game.graphics.Sprite({
    sheetSrc: "assets/images/centipede-assets.png",
    spriteX: 320,
    spriteY: 320,
    numFrames: 6,
    spriteWidth: 40,
    spriteHeight: 40,
    cols: 3,
    rows: 2,
    timePerFrame: 500,
  }),
  poisonMushrooms: [...Array(4).keys()].map(i => 
    game.graphics.Sprite({
      sheetSrc: "assets/images/centipede-assets.png",
      spriteX: 320 + i*40,
      spriteY: 0,
      numFrames: 1,
      spriteWidth: 40,
      spriteHeight: 40,
      timePerFrame: 0,
    })
  ),
  regularMushrooms: [...Array(4).keys()].map(i => 
    game.graphics.Sprite({
      sheetSrc: "assets/images/centipede-assets.png",
      spriteX: 320 + i*40,
      spriteY: 40,
      numFrames: 1,
      spriteWidth: 40,
      spriteHeight: 40,
      timePerFrame: 0,
    })
  )
};