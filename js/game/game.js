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

game.getObjects = () => [game.player, ...game.bullets, ...game.mushrooms, ...game.centipedes];
game.getBulletCollidableObjects = () => [...game.mushrooms, ...game.centipedes];
game.getMushroomCollidableObjects = () => [game.player, ...game.centipedes];