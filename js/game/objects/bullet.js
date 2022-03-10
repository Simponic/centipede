game.Bullet = (spec) => {
  const object = game.Object(spec);
  const parentUpdate = object.update; 
  object.update = (elapsedTime) => {
    parentUpdate(elapsedTime);
    if (object.y < 0) {
      object.alive = false;
    }
  };
  return object;
}