game.CentipedePiece = (spec) => {
  const object = game.Object(spec);
  object.poisonedTimer = 1000;
  const parentUpdate = object.update;
  object.turningState = {
    turning: false,
    turnDirectionY: 1,
    objectStateBeforeTurn: null,
  };
  object.turn = () => {
    object.turningState.objectStateBeforeTurn = {dx: object.dx, dy: object.dy, x: object.x, y: object.y};
    object.turningState.turning = true;
    if (object.y >= game.height - object.height) {
      object.turningState.turnDirectionY = -1;
    }
    if (object.y <= 0) {
      object.turningState.turnDirectionY = 1;
    }
  };
  object.update = (elapsedTime) => {
    if (object.poisoned) {
      object.turningState.turning = false;
    }
    else if ((object.x+object.width > game.width || object.x < 0) && !object.turningState.turning) {
      object.x = Math.min(Math.max(object.x, 0), game.width - object.width);
      object.turn();
    }
    if (object.turningState.turning) {
      object.dx = 0;
      object.dy = Math.abs(object.turningState.objectStateBeforeTurn.dx) * object.turningState.turnDirectionY;
      object.rot = object.dy > 0 ? -90 : 90;
      if (Math.abs(object.turningState.objectStateBeforeTurn.y - object.y) >= object.height) {
        object.y = object.turningState.objectStateBeforeTurn.y + object.height * object.turningState.turnDirectionY;
        object.dx = -object.turningState.objectStateBeforeTurn.dx;
        object.rot = object.dx > 0 ? 180 : 0;
        object.dy = 0;
        object.turningState.turning = false;
      }
    }
    parentUpdate(elapsedTime);
    object.y = Math.min(Math.max(object.y, 0), game.height - object.height);
  };
  object.onMushroomCollision = (mushroom) => {
    if (mushroom.poisoned && object.dy === 0) {
      object.poison();
      return;
    }
    if (!object.turningState.turning) {
      if (mushroom.x < object.x && object.dx > 0) {
        return;
      }
      object.turn();
    }
  }
  return object;
}

game.Centipede = (spec) => {
  const segments = [
    ...Array(spec.segments).fill(0).map((_, i) => game.CentipedePiece({...spec, x: spec.startX - spec.width*(i+1), y: spec.startY, sprite: game.sprites.centipedeBody})),
    game.CentipedePiece({...spec, x: spec.startX, y: spec.startY, sprite: game.sprites.centipedeHead}),
  ];

  const update = (elapsedTime) => {
    segments.map((segment) => segment.update(elapsedTime));
  }

  const draw = (elapsedTime) => {
    segments.map((segment) => segment.draw(elapsedTime));
  }
  
  const intersects = (object) => {
    return segments.filter((segment) => segment.intersects(object)).length;
  }

  const onBulletCollision = (bullet) => {
    if (bullet.alive) {
      const segment = segments.find((segment) => segment.intersects(bullet));
      const segmentIndex = segments.indexOf(segment);

      const {mushX, mushY} = game.Mushroom.toMushCoords(segment);
      game.explosions.push(game.Explosion({...game.Mushroom.toGameCoords({mushX, mushY}), width: segment.width, height: segment.height, sprite: game.sprites.explosionSmall}));
      if (!game.mushrooms.find((mushroom) => mushroom.mushX === mushX && mushroom.mushY === mushY)) {
        game.mushrooms.push(game.Mushroom({mushX, mushY, ...game.mushroomDims}));
      }
      game.score += segment.sprite === game.sprites.centipedeHead ? 20 : 5;
      game.sounds.enemy_hit.load();
      game.sounds.enemy_hit.play();
      segments.splice(segmentIndex, 1);
    }
    bullet.alive = false;
  }

  const onMushroomCollision = (mushroom) => {
    segments.find((segment) => segment.intersects(mushroom)).onMushroomCollision(mushroom);
  }

  const onPlayerCollision = (player) => {
    player.kill();
  }

  const alive = () => segments.length ? true : false; 

  return {update, draw, segments, intersects, onBulletCollision, onMushroomCollision, onPlayerCollision, alive};
}