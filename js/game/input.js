game.input = (() => {
  "use strict";
  const Keyboard = () => {
    const keys = {};
    const handlers = {};
    const keyPress = (event) => {
      keys[event.key] = event.timeStamp;
    };
    const keyRelease = (event) => {
      delete keys[event.key];
    };
    const registerCommand = (key, handler) => {
      handlers[key] = handler;
    };
    const update = (elapsedTime) => {
      for (let key in keys) {
        if (keys.hasOwnProperty(key)) {
          if (handlers[key]) {
            handlers[key](elapsedTime);
          }
        }
      }
    };
    window.addEventListener("keydown", keyPress);
    window.addEventListener("keyup", keyRelease);
    return {keys, handlers, registerCommand, update};
  }
  return { Keyboard };
})();