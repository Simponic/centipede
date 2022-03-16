game.Mushroom = (spec) => {
  spec.state = spec.state ?? 4;
  spec.poisoned = spec.poisoned ?? false;
  const {mushX, mushY} = spec;
  const objectSpec = {...spec};
  objectSpec.x = mushX * objectSpec.width;
  objectSpec.y = mushY * objectSpec.height;
  const object = {...spec, ...game.Object(objectSpec)};
  object.onBulletCollision = (bullet) => {
    if (bullet.alive) {
      object.state--;
      game.score += 5;
      game.sounds.mushroom_hit.load();
      game.sounds.mushroom_hit.play();
    }
    bullet.alive = false;
  }; 
  object.draw = (elapsedTime) => {
    if (object.state) {
      object.sprite = object.poisoned ? game.sprites.poisonMushrooms[object.state-1] : game.sprites.regularMushrooms[object.state-1];
      object.sprite.draw(elapsedTime, object);
    }
  }
  return object;
};

game.Mushroom.toMushCoords = (coords) => {
  return {mushX: Math.ceil(coords.x / game.mushroomDims.width), mushY: Math.ceil(coords.y / game.mushroomDims.height)};
}

game.Mushroom.toGameCoords = (mushCoords) => {
  return {x: mushCoords.mushX * game.mushroomDims.width, y: mushCoords.mushY * game.mushroomDims.height};
}

game.Mushroom.generateMushrooms = (mushroomSpec) => {
  const mushPositions = new Set();
  for (let i = 0; i < Math.max(Math.random(), 0.05) * game.height / mushroomSpec.height * game.width / mushroomSpec.width * game.level * 0.5; i++) {
    mushPositions.add(JSON.stringify([Math.floor(Math.random() * game.width / mushroomSpec.width), Math.max(1, Math.floor(Math.random() * (game.height / mushroomSpec.height - 3)))]));
  }
  return Array.from(mushPositions).map((pos) => {
    const [mushX, mushY] = JSON.parse(pos);
    return game.Mushroom({...mushroomSpec, mushX, mushY});
  });
}
