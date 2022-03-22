const game = {
  stopped: false,
  width: document.getElementById('game-canvas').width,
  height: document.getElementById('game-canvas').height,
  level: 1,
};

game.resume = () => {
  game.stopped = false;
  game.lastTimeStamp = performance.now();
  menu.reRegisterKeys();
  requestAnimationFrame(gameLoop);
}

game.resetObjects = () => {
  game.player.x = game.width/2;
  game.player.y = game.height/2;
  game.bullets = [];
  game.explosions = [];
  game.mushroomDims = {width: 40, height: 40};
  game.mushrooms = game.Mushroom.generateMushrooms(game.mushroomDims);
  game.centipede = game.Centipede({segments: Math.min(game.level*5 + 5, 15), startX: game.width/2, startY: 0, rot: 180, width: 40, height: 40, dx: 0.2, dy: 0});
  game.spiders = [];
  game.fleas = [];
  game.scorpions = [];
}

game.gameOver = () => {
  menu.showMenu();
  menu.setState('game-over');
  menu.addScore(game.score);

  menu.onHide = initialize;
}

game.getObjects = () => [game.player, ...game.bullets, ...game.mushrooms, ...game.spiders, ...game.fleas, ...game.scorpions, game.centipede, ...game.explosions];
game.getBulletCollidableObjects = () => [...game.mushrooms, ...game.spiders, ...game.fleas, ...game.scorpions, game.centipede];
game.getMushroomCollidableObjects = () => [game.player, ...game.scorpions, game.centipede];
game.getPlayerCollidableObjects = () => [...game.spiders, ...game.fleas, ...game.scorpions, game.centipede]