game.keyboard = game.input.Keyboard();
const handleInput = game.keyboard.update;  

const initialize = () => {
  game.score = 0;
  game.totalTime = 0;

  game.lastTimeStamp = performance.now();

  game.player = game.Player({x: game.width/2 - 20, y: game.height-40, width: 40, height: 40, sprite: game.sprites.ship});

  game.bullets = [];
  game.mushroomDims = {width: 40, height: 40};
  game.mushrooms = game.Mushroom.generateMushrooms(game.mushroomDims);
  game.centipedes = game.Centipede.initializeCentipedes(5+game.level*3);
};

const update = (elapsedTime) => {
  game.totalTime += elapsedTime;  

  game.mushrooms.map((mushroom) => game.getMushroomCollidableObjects().filter((object) => object.intersects(mushroom))).map((objects, i) => {
    objects.map((object => object.onMushroomCollision ? object.onMushroomCollision(game.mushrooms[i]) : null));
  });
  game.bullets.map((bullet) => game.getBulletCollidableObjects().filter((object) => object.intersects(bullet))).map((objects, i) => {
    if (objects.length > 0) {
      game.bullets[i].alive = false;
    }
    objects.map((object) => object.onBulletCollision ? object.onBulletCollision() : null)
  })

  game.bullets = game.bullets.filter((bullet) => bullet.alive);
  game.mushrooms = game.mushrooms.filter((mushroom) => mushroom.state > 0);
  game.centipedes = game.centipedes.filter((centipede) => centipede.alive);
  game.getObjects().map((object) => object.update(elapsedTime));
};

const render = (elapsedTime) => {
  game.graphics.clear();
  game.getObjects().map((object) => object.draw(elapsedTime));

  document.getElementById("hud").innerHTML = `Score: ${game.score} ${game.player.poisoned ? "<span style='color:green'>POISONED<span>" : ""}`;
};

const gameLoop = (time) => {
  const elapsedTime = time - game.lastTimeStamp;
  game.lastTimeStamp = time;

  handleInput(elapsedTime);
  update(elapsedTime);
  render(elapsedTime);

  if (!game.stopped) {
    requestAnimationFrame(gameLoop);
  }
};

initialize();
menu.reRegisterKeys();
requestAnimationFrame(gameLoop);