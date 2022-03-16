game.CentipedePiece = (spec) => {
  const object = game.Object(spec);
  const parentUpdate = object.update;
  let oldMushroomPos = game.Mushroom.toMushCoords(object);
  object.turn = () => {
    if (object.dy === 0) {
      object.rot += 90;
    }
  }
  object.update = (elapsedTime) => {
    parentUpdate(elapsedTime);
    if (object.x > game.width + object.width) {
      object.alive = false;
    }
  };
  return object;
}

game.Centipede = (spec) => {
  const segments = [
    game.CentipedePiece({...spec, x: -160, y: 0, sprite: game.sprites.centipedeBody}),
    game.CentipedePiece({...spec, x: -120, y: 0, sprite: game.sprites.centipedeBody}),
    game.CentipedePiece({...spec, x: -80, y: 0, sprite: game.sprites.centipedeBody}),
    game.CentipedePiece({...spec, x: -40, y: 0, sprite: game.sprites.centipedeBody}),
    game.CentipedePiece({...spec, x: 0, y: 0, sprite: game.sprites.centipedeHead}),
  ];

  const update = (elapsedTime) => {
    segments.map((segment) => segment.update(elapsedTime));
  }

  const draw = (elapsedTime) => {
    segments.map((segment) => segment.draw(elapsedTime));
  }
  
  const intersects = (object) => {
    return segments.filter((segment) => segment.intersects(object)).length > 0;
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
      if (segmentIndex > 0) {
        segments[segmentIndex-1].sprite = game.sprites.centipedeHead;
      }
      segments.splice(segmentIndex, 1);
    }
    bullet.alive = false;
  }

  const onMushroomCollision = (mushroom) => {
    const segment = segments.find((segment) => segment.intersects(mushroom));
  }

  return {update, draw, segments, intersects, onBulletCollision, onMushroomCollision};
}