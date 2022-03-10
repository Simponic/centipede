const menu = {};
menu.initialize = () => {
  menu.scores = localStorage.getItem("scores") ? JSON.parse(localStorage.getItem("scores")) : [];
  menu.state = "main";

  menu.controls = localStorage.getItem("controls") ? JSON.parse(localStorage.getItem("controls")) : {
    "moveUp": "ArrowUp",
    "moveDown": "ArrowDown",
    "moveLeft": "ArrowLeft",
    "moveRight": "ArrowRight",
    "shoot": "Space",
  };
}

menu.setState = (state) => {
  menu.state = state;
  menu.draw();
}

menu.reRegisterKeys = () => {
  Object.keys(game.keyboard.handlers).map(key => game.keyboard.unregisterCommand(key));
  game.keyboard.registerCommand(menu.controls.moveUp, game.player.moveUp);
  game.keyboard.registerCommand(menu.controls.moveDown, game.player.moveDown);
  game.keyboard.registerCommand(menu.controls.moveLeft, game.player.moveLeft);
  game.keyboard.registerCommand(menu.controls.moveRight, game.player.moveRight);
  game.keyboard.registerCommand(menu.controls.shoot, game.player.shoot);
  game.keyboard.registerCommand("Escape", () => { menu.draw(); game.stopped = true;});
  localStorage.setItem("controls", JSON.stringify(menu.controls));
}

menu.hide = () => {
  const menuElement = document.getElementById("menu"); 
  menuElement.style.display = "none";
  menu.reRegisterKeys();
  game.resume();
}

menu.listenFor = (action, elementId) => {
  const element = document.getElementById(elementId);
  element.innerHTML = "Listening...";
  const handleKey = (event) => {
    window.removeEventListener("keydown", handleKey);
    if (event.key == "Escape") {
      element.innerHTML = menu.controls[action];
      return;
    }
    menu.controls[action] = event.key;
    element.innerHTML = event.key;
  }
  window.addEventListener("keydown", handleKey);
}

menu.draw = () => {
  const menuElement = document.getElementById("menu"); 
  menuElement.style.display = "block";
  menuElement.innerHTML = `<h1>Centipede</h1>`;
  if (menu.state == "main") {
    menuElement.innerHTML += `
      <div class='menu-button' onclick='menu.setState("controls")'>Change Controls</div>
    `;
  }
  else if (menu.state == "controls") {
    menuElement.innerHTML += `
      <div>
        <p>
          Move left: <button id="moveLeft" onclick='menu.listenFor("moveLeft", "moveLeft")'>${menu.controls.moveLeft}</button>
          <br>
          Move right: <button id="moveRight" onclick='menu.listenFor("moveRight", "moveRight")'>${menu.controls.moveRight}</button>
          <br>
          Move up: <button id="moveUp" onclick='menu.listenFor("moveUp", "moveUp")'>${menu.controls.moveUp}</button>
          <br>
          Move down: <button id="moveDown" onclick='menu.listenFor("moveDown", "moveDown")'>${menu.controls.moveDown}</button>
          <br>
          Shoot: <button id="shoot" onclick='menu.listenFor("shoot", "shoot")'>${menu.controls.shoot}</button>
        </p>
      </div>
    `
  }

  menuElement.innerHTML += "<div class='menu-button' onclick='menu.hide()'>Resume Game</div>"
  if (menu.state !== "main") {
    menuElement.innerHTML += "<div class='menu-button' onclick='menu.setState(\"main\")'>Back</div>"
  }
}

menu.initialize();