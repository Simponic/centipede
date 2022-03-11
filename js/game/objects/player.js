game.Player = (spec) => {
  const object = game.Object(spec);
  object.poisonedTimer = 4000;
  object.elapsedPoisonedTimer = 0;
  object.poisoned = false;
  object.bulletTimer = spec.bulletTimer ?? 150;
  object.maxPlayerHeight = spec.maxPlayerHeight ?? game.height - object.height*6;
  object.elapsedBulletTimer = 0;

  const parentUpdate = object.update; 
  object.update = (elapsedTime) => {
    if (object.poisoned) {
      object.dy = 0.5;
      object.elapsedPoisonedTimer += elapsedTime;
      if (object.elapsedPoisonedTimer > object.poisonedTimer) {
        object.poisoned = false;
        object.elapsedPoisonedTimer = 0;
      }
    }
    parentUpdate(elapsedTime);
    object.x = Math.max(0, Math.min(object.x, game.width - object.width));
    object.y = Math.max(object.maxPlayerHeight, Math.min(object.y, game.height - object.height));
    object.dx = object.dy = 0;
    object.elapsedBulletTimer += elapsedTime;
  };
  object.poison = () => {
    object.poisoned = true;
    object.elapsedPoisonedTimer = 0;
  }
  object.moveUp = () => {
    object.dy = -0.75;
  }
  object.moveDown = () => {
    object.dy = 0.75;
  }
  object.moveLeft = () => {
    object.dx = -0.5;
  }
  object.moveRight = () => {
    object.dx = 0.5;
  }

  object.shoot = () => {
    if (object.elapsedBulletTimer > object.bulletTimer) {
      object.elapsedBulletTimer = 0;
      game.bullets.push(game.Bullet({x: object.x + object.width/2 - 5, y: object.y-object.height/2, dx: 0, dy: -1.5, width: 5, height: 50, sprite: game.sprites.bullet}));
      game.sounds.laser.load();
      game.sounds.laser.play();
    }
  }

  object.onMushroomCollision = (mushroom) => {
    if (mushroom.poisoned) {
      object.poison();
    }
  }

  return object;
}