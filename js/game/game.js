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

game.getObjects = () => [game.player, ...game.bullets, ...game.mushrooms, game.centipede, ...game.explosions];
game.getBulletCollidableObjects = () => [...game.mushrooms, game.centipede];
game.getMushroomCollidableObjects = () => [game.player, game.centipede];