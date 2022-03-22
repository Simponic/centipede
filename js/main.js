let handleInput;
const initialize = () => {
  game.level = 1;
  game.score = 0;
  game.totalTime = 0;

  game.keyboard = game.input.Keyboard();
  handleInput = game.keyboard.update;  

  game.lastTimeStamp = performance.now();

  game.player = game.Player({x: game.width/2 - 20, y: game.height-40, width: 40, height: 40, sprite: game.sprites.ship});

  game.resetObjects();
};

const update = (elapsedTime) => {
  game.totalTime += elapsedTime;  

  game.mushrooms.map((mushroom) => game.getMushroomCollidableObjects().filter((object) => object.intersects(mushroom))).map((objects, i) => {
    objects.map((object => object.onMushroomCollision ? object.onMushroomCollision(game.mushrooms[i]) : null));
  });
  game.bullets.map((bullet) => game.getBulletCollidableObjects().filter((object) => object.intersects(bullet))).map((objects, i) => {
    objects.map((object) => object.onBulletCollision ? object.onBulletCollision(game.bullets[i]) : null)
  })
  game.getPlayerCollidableObjects().map((object) => object.intersects(game.player) ? object.onPlayerCollision(game.player) : null);

  game.bullets = game.bullets.filter((bullet) => bullet.alive);
  game.spiders = game.spiders.filter((spider) => spider.alive);
  game.explosions = game.explosions.filter((explosion) => explosion.alive);
  game.mushrooms = game.mushrooms.filter((mushroom) => mushroom.state > 0);
  game.scorpions = game.scorpions.filter((scorpion) => scorpion.x >= 0 && scorpion.x <= game.width - scorpion.width && scorpion.alive);
  game.fleas = game.fleas.filter((flea) => flea.y < game.height - flea.height && flea.alive);
  game.getObjects().map((object) => object.update(elapsedTime));

  if (Math.random() < 0.002 * game.level && game.spiders.length < game.level) {
    game.spiders.push(game.Spider({x: game.width/2, y: 0, width: 80, height: 40, rot: 0, dx: -0.2, dy: 0, sprite: game.sprites.spider}));  
  }
  if (Math.random() < 0.001 * game.level && game.fleas.length < game.level) {
    game.fleas.push(game.Flea({x: Math.floor(Math.random() * game.width / game.mushroomDims.width) * game.mushroomDims.width, y: 0, width: 40, height: 40, rot: 0, dx: 0, dy: 0.2, sprite: game.sprites.flea}));  
  }
  if (Math.random() < 0.001 * game.level && game.scorpions.length < game.level) {
    game.scorpions.push(game.Scorpion({y: Math.floor(Math.random() * game.height / game.mushroomDims.height) * game.mushroomDims.height, x: 0, width: 80, height: 40, rot: 0, dx: 0.2, dy: 0, sprite: game.sprites.scorpion}));  
  }

  if (!game.centipede.alive()) {
    game.resetObjects();
    game.level++;
    game.score += game.level*400;
  }
};

const render = (elapsedTime) => {
  game.graphics.clear();
  game.getObjects().map((object) => object.draw(elapsedTime));

  document.getElementById("hud").innerHTML = `Level: ${game.level} Lives: ${game.player.lives} Score: ${game.score} ${game.player.poisoned ? "<span style='color:green'>POISONED<span>" : ""}`;
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