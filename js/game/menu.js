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

menu.escapeEventListener = (e) => {
  if (e.key == "Escape") {
    menu.setState('main');
    menu.draw();
  }
}

menu.reRegisterKeys = () => {
  Object.keys(game.keyboard.handlers).map(key => game.keyboard.unregisterCommand(key));
  game.keyboard.registerCommand(menu.controls.moveUp, game.player.moveUp);
  game.keyboard.registerCommand(menu.controls.moveDown, game.player.moveDown);
  game.keyboard.registerCommand(menu.controls.moveLeft, game.player.moveLeft);
  game.keyboard.registerCommand(menu.controls.moveRight, game.player.moveRight);
  game.keyboard.registerCommand(menu.controls.shoot, game.player.shoot);
  game.keyboard.registerCommand("Escape", () => { 
    menu.draw();
    game.stopped = true;
    window.addEventListener("keydown", menu.escapeEventListener);
  });
  localStorage.setItem("controls", JSON.stringify(menu.controls));
}

menu.hide = () => {
  const menuElement = document.getElementById("menu"); 
  menuElement.style.display = "none";
  menu.reRegisterKeys();
  window.removeEventListener("keydown", menu.escapeEventListener);
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
      <div class='menu-button' onclick='menu.setState("credits")'>Credits</div>
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
  } else if (menu.state == "credits") {
    menuElement.innerHTML += `
      <div>
        <p>
          Sounds from <a href="https://opengameart.org/content/laser-fire">dklon</a>
          <br>
          Sprites from <a href="https://www.pngkit.com/view/u2w7r5u2e6u2a9r5_general-sprites-centipede-arcade-game-sprites/">PNGKit</a>
          <br>
          Some code from <a href="https://www.usu.edu/directory/?person=56DB0BFCCAEECEC8D5">Dr. Mathias</a>
          <br>
          Developed by Logan Hunt
      </div>
    `
  }

  menuElement.innerHTML += "<div class='menu-button' onclick='menu.hide()'>Resume Game</div>"
  if (menu.state !== "main") {
    menuElement.innerHTML += "<div class='menu-button' onclick='menu.setState(\"main\")'>Back</div>"
  }
}

menu.initialize();