game.Object = (object) => {
  object.dx = object.dx ?? 0;
  object.dy = object.dy ?? 0;
  object.rot = object.rot ?? 0;
  object.drot = object.drot ?? 0;
  object.alive = object.alive ?? true;

  object.poisonedTimer = object.poisonedTimer ?? 4000;
  object.poisoned = false;
  object.elapsedPoisonedTimer = 0;
  object.poison = () => {
    object.poisoned = true;
    object.elapsedPoisonedTimer = 0;
  }

  object.intersects = (other) => {
    if (object.x + object.width <= other.x) {
      return false;
    }
    if (object.x >= other.x + other.width) {
      return false;
    }
    if (object.y + object.height <= other.y) {
      return false;
    }
    if (object.y >= other.y + other.height) {
      return false;
    }
    return true;
  }

  object.update = (elapsedTime) => {
    if (object.poisoned && object.y >= game.height - object.height) {
      object.elapsedPoisonedTimer += elapsedTime;
      if (object.elapsedPoisonedTimer > object.poisonedTimer) {
        object.poisoned = false;
        object.elapsedPoisonedTimer = 0;
      }
    }

    object.x += (object.poisoned ? 0 : object.dx)*elapsedTime;
    object.y += (object.poisoned ? 0.2 : object.dy)*elapsedTime;
    object.rot += object.drot*elapsedTime;
  };

  object.draw = (elapsedTime) => {
    object.sprite.draw(elapsedTime, object);
  };

  return object;
};
