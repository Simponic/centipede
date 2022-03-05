game.playerObject = (spec) => {
  const object = game.Object(spec);
  const parentUpdate = object.update; 
  object.update = (elapsedTime) => {
    parentUpdate(elapsedTime);
    object.x = Math.max(0, Math.min(object.x, game.width - object.width));
    object.y = Math.max(game.height - 500, Math.min(object.y, game.height - object.height));
    object.dx = object.dy = 0;
  };

  object.moveUp = () => {
    object.dy = -1;
  }
  object.moveDown = () => {
    object.dy = 1;
  }
  object.moveLeft = () => {
    object.dx = -1;
  }
  object.moveRight = () => {
    object.dx = 1;
  }

  return object;
}