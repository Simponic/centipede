game.main = (
  (graphics, input) => {
    "use strict";
    let lastTimeStamp = performance.now();

    let keyboard = input.Keyboard();
    const handleInput = keyboard.update;  

    const initialize = () => {
      game.objects = [
        game.Object({x: 100, y: 100, dx: 0.5, dy: 0, width: 80, height: 80, rot: 0, drot: 0.5, sprite: game.sprites.centipedeHead}),
        game.Object({x: 300, y: 100, dx: 0, dy: 0, width: 160, height: 80, rot: 0, drot: 0, sprite: game.sprites.spider}),
        game.Object({x: 800, y: 100, dx: 0, dy: 0, width: 80, height: 80, rot: 0, drot: 0, sprite: game.sprites.flea}),
        game.Object({x: 800, y: 500, dx: 0, dy: 0, width: 160, height: 80, rot: 0, drot: 0, sprite: game.sprites.scorpion}),
      ];
    };

    const update = (elapsedTime) => {
      game.objects.map((obj) => obj.update(elapsedTime));
    };

    const render = (elapsedTime) => {
      graphics.clear();
      game.objects.map((obj) => obj.draw(elapsedTime));
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
  }
)(game.graphics, game.input);