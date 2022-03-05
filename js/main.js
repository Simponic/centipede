game.main = (
  (graphics, input) => {
    "use strict";
    let lastTimeStamp = performance.now();

    let keyboard = input.Keyboard();
    const handleInput = keyboard.update;  

    const initialize = () => {
      game.player = game.playerObject({x: 100, y: 900, width: 50, height: 50, sprite: game.sprites.ship});
      keyboard.registerCommand("ArrowUp", game.player.moveUp);
      keyboard.registerCommand("ArrowDown", game.player.moveDown);
      keyboard.registerCommand("ArrowLeft", game.player.moveLeft);
      keyboard.registerCommand("ArrowRight", game.player.moveRight);
      game.objects = [
        game.player,
      ];
    };

    const update = (elapsedTime) => {
      game.objects.map((obj) => obj.update(elapsedTime));
      game.player.update(elapsedTime);
    };

    const render = (elapsedTime) => {
      graphics.clear();
      game.objects.map((obj) => obj.draw(elapsedTime));
    };

    let iters = 0;
    const gameLoop = (time) => {
      iters++;
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
  }
)(game.graphics, game.input);