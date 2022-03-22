const menu = {};
menu.initialize = () => {
  menu.scores = localStorage.getItem("scores") ? JSON.parse(localStorage.getItem("scores")) : [];
  menu.state = "main";

  menu.controls = localStorage.getItem("controls") ? JSON.parse(localStorage.getItem("controls")) : {
    "moveUp": "ArrowUp",
    "moveDown": "ArrowDown",
    "moveLeft": "ArrowLeft",
    "moveRight": "ArrowRight",
    "shoot": " ",
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

menu.showMenu = () => {
  menu.draw();
  game.stopped = true;
  window.addEventListener("keydown", menu.escapeEventListener);
}

menu.reRegisterKeys = () => {
  Object.keys(game.keyboard.handlers).map(key => game.keyboard.unregisterCommand(key));
  game.keyboard.registerCommand(menu.controls.moveUp, game.player.moveUp);
  game.keyboard.registerCommand(menu.controls.moveDown, game.player.moveDown);
  game.keyboard.registerCommand(menu.controls.moveLeft, game.player.moveLeft);
  game.keyboard.registerCommand(menu.controls.moveRight, game.player.moveRight);
  game.keyboard.registerCommand(menu.controls.shoot, game.player.shoot);
  game.keyboard.registerCommand("Escape", menu.showMenu);
  localStorage.setItem("controls", JSON.stringify(menu.controls));
}

menu.addScore = (score) => {
  menu.scores.push(score);
  menu.scores.sort((a, b) => b - a);
  localStorage.setItem("scores", JSON.stringify(menu.scores));
}

menu.hide = () => {
  const menuElement = document.getElementById("menu"); 
  menuElement.style.display = "none";
  menu.reRegisterKeys();
  window.removeEventListener("keydown", menu.escapeEventListener);
  if (menu.onHide) {
    menu.onHide();
    menu.onHide = null;
  }
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
      <div class='menu-button' onclick='menu.setState("scores")'>High Scores</div>
    `;
  }
  else if (menu.state == "controls") {
    menuElement.innerHTML += `
      <div>
        <p>
          Move left: <button id="moveLeft" onfocus='menu.listenFor("moveLeft", "moveLeft")'>${menu.controls.moveLeft}</button>
          <br>
          Move right: <button id="moveRight" onfocus='menu.listenFor("moveRight", "moveRight")'>${menu.controls.moveRight}</button>
          <br>
          Move up: <button id="moveUp" onfocus='menu.listenFor("moveUp", "moveUp")'>${menu.controls.moveUp}</button>
          <br>
          Move down: <button id="moveDown" onfocus='menu.listenFor("moveDown", "moveDown")'>${menu.controls.moveDown}</button>
          <br>
          Shoot: <button id="shoot" onfocus='menu.listenFor("shoot", "shoot")'>${menu.controls.shoot}</button>
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
        </p>
      </div>
    `
  } else if (menu.state == "scores") {
    menuElement.innerHTML += `
      <div>
        <p>
        ${menu.scores.map((score, index) => `${index + 1}: ${score}<br>`).join("")}
        </p>
      </div>
    `
  } else if (menu.state == "game-over") {
    menuElement.innerHTML += `
      <div>
        <p>
          Game Over
          <br>
          Your final score was: ${game.score}
      </div>
    `
  }

  menuElement.innerHTML += "<div class='menu-button' onclick='menu.hide()'>Resume Game</div>"
  if (menu.state !== "main") {
    menuElement.innerHTML += "<div class='menu-button' onclick='menu.setState(\"main\")'>Back</div>"
  }
}

menu.initialize();