game.Object = (spec={x, y, dx, dy, rot, drot, width, height, sprite}) => {
  spec.dx = spec.dx ?? 0;
  spec.dy = spec.dy ?? 0;
  spec.rot = spec.rot ?? 0;
  spec.drot = spec.drot ?? 0;
  spec.alive = spec.alive ?? true;
  
  spec.intersects = (other) => {
    return !(spec.x + spec.width < other.x || spec.x > other.x + other.width || spec.y + spec.height < other.y || spec.y > other.y + other.height);
  }

  spec.update = (elapsedTime) => {
    spec.x += spec.dx*elapsedTime;
    spec.y += spec.dy*elapsedTime;
    spec.rot += spec.drot*elapsedTime;
  };

  spec.draw = (elapsedTime) => {
    spec.sprite.draw(elapsedTime, spec);
  };

  return spec;
};
