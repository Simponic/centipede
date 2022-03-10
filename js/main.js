game.keyboard = game.input.Keyboard();
const handleInput = game.keyboard.update;  

const initialize = () => {
  game.score = 0;
  game.totalTime = 0;

  game.lastTimeStamp = performance.now();

  game.player = game.Player({x: game.width/2 - 20, y: game.height-40, width: 40, height: 40, sprite: game.sprites.ship});
  game.bullets = [];
  game.mushrooms = game.Mushroom.generateMushrooms({width: 40, height: 40});
};

const update = (elapsedTime) => {
  game.totalTime += elapsedTime;  

  game.player.update(elapsedTime);
  game.getObjects().map((object) => object.update(elapsedTime));
  game.bullets.map((bullet) => game.getBulletCollidableObjects().filter((object) => object.intersects(bullet))).map((objects, i) => {
    if (objects.length > 0) {
      game.bullets[i].alive = false;
    }
    objects.map((object) => object.onBulletHit ? object.onBulletHit() : null)
  })
  game.bullets = game.bullets.filter((bullet) => bullet.alive);
  game.mushrooms = game.mushrooms.filter((mushroom) => mushroom.state > 0);
};

const render = (elapsedTime) => {
  game.graphics.clear();
  game.getObjects().map((object) => object.draw(elapsedTime));

  document.getElementById("hud").innerHTML = `Score: ${game.score}`;
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