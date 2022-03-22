game.Scorpion = (spec) => {
  const object = game.Object(spec);

  const parentUpdate = object.update; 
  object.update = (elapsedTime) => {
    parentUpdate(elapsedTime);
  };

  object.explode = () => {
    game.explosions.push(game.Explosion({x: object.x, y: object.y, width: object.width, height: object.height, sprite: game.sprites.explosionBig}));
    game.sounds.enemy_hit.load();
    game.sounds.enemy_hit.play();
  }  

  object.onBulletCollision = (bullet) => {
    game.score += 100;
    object.alive = false;
    object.explode();
  }

  object.onPlayerCollision = (player) => {
    object.alive = false;
    player.kill();
    object.explode();
  }

  object.onMushroomCollision = (mushroom) => {
    mushroom.poisoned = true;
  }

  return object;
}