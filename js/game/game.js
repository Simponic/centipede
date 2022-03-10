const game = {
  stopped: false,
  width: 1920,
  height: 1080,
  level: 1,
  maxPlayerHeight: 1080-400
};

game.resume = () => {
  game.stopped = false;
  requestAnimationFrame(gameLoop);
}