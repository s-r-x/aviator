import Gamepad from './Gamepad';

const gamepadGetter = navigator.getGamepads || navigator.webkitGetGamepads || null;

// http://www.third-helix.com/2013/04/12/doing-thumbstick-dead-zones-right.html
const normalizeStickValue = (stick, deadzone) => {
  const mag = Math.sqrt(stick.x * stick.x + stick.y * stick.y);
  if(mag < deadzone) {
    stick.x = 0;
    stick.y = 0;
  }
};

const defaultConfig = {
  listenButtonEvents: false,
  normalizeSticksDeadzone: true,
  sticksDeadZone: 0.2,
};

export default class Aviator {
  constructor(config) {
    this.config = { ...defaultConfig, ...config };

    this.connectListener = this.connectListener.bind(this);
    this.disconnectListener = this.disconnectListener.bind(this);
    this.checkLoop = this.checkLoop.bind(this);

    window.addEventListener('gamepadconnected', this.connectListener);
    window.addEventListener('gamepaddisconnected', this.disconnectListener);
    this.gamepadsSnapshot = [];
    this.req = null;
    if(this.config.listenButtonEvents) {
      requestAnimationFrame(this.checkLoop);
    }
    this.listeners = {
      'buttonUp': [],
      'buttonDown': [],
      'connect': [],
      'disconnect': [],
    };
  }
  listen(event, callback) {
    if(!this.config.listenForEvents) {
    }
    this.listeners[event].push(callback);      
  }
  checkLoop() {
    const gamepads = this.gamepads;      
    if(gamepads.length === 0) {
      return requestAnimationFrame(this.checkLoop);
    }
    if(!this.gamepadsSnapshot || this.gamepadsSnapshot.length === 0) {
      this.gamepadsSnapshot = gamepads;
      return requestAnimationFrame(this.checkLoop);
    }
    const snapshot = this.gamepadsSnapshot;
    gamepads.forEach((gamepad, i) => {
      if(!snapshot[i]) {
        return;
      }
      const prevGamepad = snapshot[i];
      const { buttons } = gamepad;
      const prevButtons = prevGamepad.buttons;
      for(let button in buttons) {
        const { isPressed } = buttons[button];    
        const isPrevPressed = prevButtons[button].isPressed;
        if(isPressed && !isPrevPressed) {
          this.listeners.buttonDown.forEach(listener => listener(button, gamepad));
        }
        else if(!isPressed && isPrevPressed) {
          this.listeners.buttonUp.forEach(listener => listener(button, gamepad));
        }
      }
    });
    this.gamepadsSnapshot = gamepads;
    requestAnimationFrame(this.checkLoop);
  }
  connectListener(e) {
    const gamepad = new Gamepad(e.gamepad);
    this.listeners.connect.forEach(listener => listener(gamepad, e));
  }
  disconnectListener(e) {
    const gamepad = new Gamepad(e.gamepad);
    this.listeners.disconnect.forEach(listener => listener(gamepad, e));
  }

  get gamepads() {
    if(!gamepadGetter) {
      return [];
    }
    const gamepads = gamepadGetter.call(navigator);
    let acc = [];
    for(let i = 0; i < gamepads.length; i++) {
      let gamepad = gamepads[i];
      if(!gamepad) {
        continue;
      }
      gamepad = new Gamepad(gamepad);
      if(this.config.normalizeSticksDeadzone) {
        const { deadzone } = this.config;
        const { left, right } = gamepad.sticks;
        normalizeStickValue(left, deadzone);
        normalizeStickValue(right, deadzone);
      }
      acc.push(gamepad);
    }
    return acc;
  }

  get isSupports() {
    return Boolean(gamepadGetter);
  }
}

