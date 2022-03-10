game.Player = (spec) => {
  const object = game.Object(spec);
  object.bulletTimer = spec.bulletTimer ?? 150;
  object.elapsedBulletTimer = 0;

  const parentUpdate = object.update; 
  object.update = (elapsedTime) => {
    parentUpdate(elapsedTime);
    object.x = Math.max(0, Math.min(object.x, game.width - object.width));
    object.y = Math.max(game.maxPlayerHeight, Math.min(object.y, game.height - object.height));
    object.dx = object.dy = 0;
    object.elapsedBulletTimer += elapsedTime;
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

  object.shoot = () => {
    if (object.elapsedBulletTimer > object.bulletTimer) {
      object.elapsedBulletTimer = 0;
      game.bullets.push(game.Bullet({x: object.x + object.width/2, y: object.y, dx: 0, dy: -1.5, width: 10, height: 40, sprite: game.sprites.bullet}));
    }
  }

  return object;
}