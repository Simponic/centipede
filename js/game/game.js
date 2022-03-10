const game = {
  stopped: false,
  width: 1400,
  height: 1000,
  level: 1,
  maxPlayerHeight: 1000-40*6,
};

game.resume = () => {
  game.stopped = false;
  game.lastTimeStamp = performance.now();
  menu.reRegisterKeys();
  requestAnimationFrame(gameLoop);
}

game.getObjects = () => [game.player, ...game.bullets, ...game.mushrooms];
game.getBulletCollidableObjects = () => [...game.mushrooms];