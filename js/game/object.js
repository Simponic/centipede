game.Object = (spec={x, y, dx, dy, rot, drot, width, height, sprite}) => {
  spec.dx = spec.dx ?? 0;
  spec.dy = spec.dy ?? 0;
  spec.rot = spec.rot ?? 0;
  spec.drot = spec.drot ?? 0;

  const update = (elapsedTime) => {
    spec.x += spec.dx*elapsedTime;
    spec.y += spec.dy*elapsedTime;
    spec.rot += spec.drot*elapsedTime;
  };

  const draw = (elapsedTime) => {
    spec.sprite.draw(elapsedTime, spec);
  };

  return { ...spec, update, draw };
};
