game.Explosion = (spec) => {
  const object = game.Object(spec);
  let explosionTime = 0;
  const parentUpdate = object.update;
  object.update = (elapsedTime) => {
    parentUpdate(elapsedTime);
    explosionTime += elapsedTime;

    if (explosionTime > (object.sprite.numFrames * object.sprite.timePerFrame)) {
      object.alive = false;
    }
  }
  return object;
}