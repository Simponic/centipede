game.Flea = (spec) => {
  const object = game.Object(spec);
  const parentUpdate = object.update; 
  object.mushroomCoords = game.Mushroom.toMushCoords(object);
  object.update = (elapsedTime) => {
    const newMushroomCoords = game.Mushroom.toMushCoords(object);
    if (newMushroomCoords.mushY !== object.mushroomCoords.mushY || newMushroomCoords.mushX !== object.mushroomCoords.mushX) {
      if (Math.random() < Math.min(0.15 + 0.05*game.level, 0.7)) {
        if (!game.mushrooms.find((mushroom) => mushroom.mushX === newMushroomCoords.mushX && mushroom.mushY === newMushroomCoords.mushY)) {
          game.mushrooms.push(game.Mushroom({...newMushroomCoords, ...game.mushroomDims}));
        }
      }
      object.mushroomCoords = newMushroomCoords;
    }
    parentUpdate(elapsedTime);
  };

  object.onMushroomCollision = (mushroom) => {
    if (mushroom.poisoned) {
      mushroom.state = 0;
      object.poison();
    }
  }

  object.explode = () => {
    game.explosions.push(game.Explosion({x: object.x, y: object.y, width: object.width, height: object.height, sprite: game.sprites.explosionSmall}));
    game.sounds.enemy_hit.load();
    game.sounds.enemy_hit.play();
  }  

  object.onBulletCollision = (bullet) => {
    game.score += 20;
    object.alive = false;
    object.explode();
  }

  object.onPlayerCollision = (player) => {
    object.alive = false;
    player.kill();
    object.explode();
  }

  object.onBulletCollision = (bullet) => {
    object.explode();
    object.alive = false;
  }

  return object;
}