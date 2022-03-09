game.mushrooms = [];
game.Mushroom = (spec) => {
  spec.state = spec.state ?? 4;
  spec.poisoned = spec.poisoned ?? false;
  const {mushX, mushY} = spec;
  if (spec.state) {
    const objectSpec = {...spec};
    objectSpec.x = mushX * objectSpec.width;
    objectSpec.y = mushY * objectSpec.height;
    const object = {...spec, ...game.Object(objectSpec)};
    object.draw = (elapsedTime) => {
      if (object.state) {
        object.sprite = object.poisoned ? game.sprites.poisonedMushrooms[object.state-1] : game.sprites.regularMushrooms[object.state-1];
        object.sprite.draw(elapsedTime, object);
      }
    }
    return object;
  }
  return null;
};

game.Mushroom.initializeMushrooms = (mushroomSpec) => {
  game.mushrooms = Array(game.height / mushroomSpec.height - 2).fill().map((_, y) => Array(game.width / mushroomSpec.width).fill().map((_, x) => {
    return game.Mushroom({mushX: x, mushY: y, state: 4, ...mushroomSpec});
  }));
}

game.Mushroom.placeRandomMushrooms = () => {
  game.mushrooms.map((y) => y.map((mushroom) => mushroom.state = Math.random() < Math.min(0.05*game.level, 0.9) ? 4 : 0));
}

game.Mushroom.drawMushrooms = (elapsedTime) => {
  game.mushrooms.map((y) => y.map((mushroom) => mushroom.draw(elapsedTime)));
}

game.Mushroom.gameCoordsToMushroomCoords = (x, y) => {
  return {x: Math.floor(x/game.mushrooms[0][0].width), y: Math.floor(y/game.mushrooms[0][0].height)};
}

game.Mushroom.mushroomCoordsToGameCoords = (x, y) => {
  return {x: x*game.mushrooms[0][0].width, y: y*game.mushrooms[0][0].height};
}
