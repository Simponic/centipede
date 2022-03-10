lastTimeStamp = performance.now();

game.keyboard = game.input.Keyboard();
const handleInput = game.keyboard.update;  

const initialize = () => {
  game.Mushroom.initializeMushrooms({width: 40, height: 40});
  game.Mushroom.placeRandomMushrooms();

  game.player = game.Player({x: 100, y: 900, width: 40, height: 40, sprite: game.sprites.ship});
  game.bullets = [];

  menu.initialize(); 
  menu.reRegisterKeys();
};

const update = (elapsedTime) => {
  game.player.update(elapsedTime);
  game.bullets.map((bullet) => bullet.update(elapsedTime));
  game.bullets = game.bullets.filter((bullet) => bullet.alive);
};

const render = (elapsedTime) => {
  game.graphics.clear();
  game.bullets.map((bullet) => bullet.draw(elapsedTime));
  game.player.draw(elapsedTime);
  game.Mushroom.drawMushrooms();
};

const gameLoop = (time) => {
  const elapsedTime = time - lastTimeStamp;
  lastTimeStamp = time;

  handleInput(elapsedTime);
  update(elapsedTime);
  render(elapsedTime);

  if (!game.stopped) {
    requestAnimationFrame(gameLoop);
  }
};

initialize();
requestAnimationFrame(gameLoop);