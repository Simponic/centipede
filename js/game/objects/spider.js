game.Spider = (spec) => {
  const object = game.Object(spec);

  const parentUpdate = object.update; 
  
  object.randomizeVel = () => {
    object.dx = Math.min(Math.random(), 0.25 + 0.05*game.level) * (Math.random() > 0.5 ? 1 : -1);
    object.dy = Math.min(Math.random(), 0.25 + 0.05*game.level) * (Math.random() > 0.5 ? 1 : -1);
  }

  object.update = (elapsedTime) => {
    if (Math.random() < 0.01*game.level) {
      object.randomizeVel();
    }
    if (object.x < 0 || object.x > game.width - object.width) {
      object.dx = -object.dx;
    }
    if (object.y < 0 || object.y > game.height - object.height) {
      object.dy = -object.dy;
    }
    object.x = Math.max(0, Math.min(game.width - object.width, object.x));
    object.y = Math.max(0, Math.min(game.height - object.height, object.y));
    parentUpdate(elapsedTime);
  };

  object.explode = () => {
    game.explosions.push(game.Explosion({x: object.x, y: object.y, width: object.width, height: object.height, sprite: game.sprites.explosionBig}));
    game.sounds.enemy_hit.load();
    game.sounds.enemy_hit.play();
  }  

  object.onBulletCollision = (bullet) => {
    game.score += 150;
    object.alive = false;
    object.explode();
  }

  object.onPlayerCollision = (player) => {
    object.alive = false;
    player.kill();
    object.explode();
  }

  return object;
}