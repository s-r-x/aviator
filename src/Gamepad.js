import { isFirefox, mapNumber } from './misc';

class Gamepad {
  constructor(gamepad) {
    this.original = gamepad;
    this.name = gamepad.id;
    this.index = gamepad.index;
    const { axes } = gamepad;
  }
  pulse() {}
}

class FirefoxGamepad extends Gamepad {
  constructor(gamepad) {
    super(gamepad);
    // firefox doesn't recognize x360 vibration
    this.vibration = gamepad.hapticActuators.length !== 0 ? gamepad.hapticActuators : null;
    const { axes, buttons } = gamepad;
    const b = buttons;
    const leftTrigger = axes[2], rightTrigger = axes[5];
    // TODO:: in firefox triggers initially set to 0, not -1
    this.triggers = {
      left: {
        isPressed: leftTrigger !== -1,
        value: mapNumber(leftTrigger, -1, 1, 0, 1),
      },
      right: {
        isPressed: rightTrigger !== -1,
        value: mapNumber(rightTrigger, -1, 1, 0, 1),
      },
    };
    this.sticks = {
      left: {
        x: axes[0],
        y: axes[1],
      },
      right: {
        x: axes[3],
        y: axes[4],
      },
    };
    this.buttons = {
      'a': { isPressed: b[0].pressed },
      'b': { isPressed: b[1].pressed },
      'x': { isPressed: b[2].pressed },
      'y': { isPressed: b[3].pressed },
      'lb': { isPressed : b[4].pressed },
      'rb': { isPressed: b[5].pressed },
      'back': { isPressed: b[6].pressed },
      'start': { isPressed: b[7].pressed },
      'left_stick': { isPressed: b[9].pressed },
      'right_stick': { isPressed: b[10].pressed },
      'top_arrow': { isPressed: axes[7] === -1 },
      'bottom_arrow': { isPressed: axes[7] === 1 },
      'left_arrow': { isPressed: axes[6] === -1 },
      'right_arrow': { isPressed: axes[6] === 1 },
      'home': { isPressed: b[8].pressed },
      'lt': { isPressed: leftTrigger !== -1 },
      'rt': { isPressed: rightTrigger !== -1 },
    }
  }
}

class ChromeGamepad extends Gamepad {
  constructor(gamepad) {
    super(gamepad);
    const { axes, buttons } = gamepad;
    const b = buttons;
    const vibration = gamepad.vibrationActuator;
    this.vibrationType = vibration && vibration.type;
    this.sticks = {
      left: {
        x: axes[0],
        y: axes[1],
      },
      right: {
        x: axes[2],
        y: axes[3],
      },
    };
    this.triggers = {
      left: {
        isPressed: b[6].pressed,
        value: b[6].value,
      },
      right: {
        isPressed: b[7].pressed,
        value: b[7].value,
      }
    }
    this.buttons = {
      'a': { isPressed: b[0].pressed },
      'b': { isPressed: b[1].pressed },
      'x': { isPressed: b[2].pressed },
      'y': { isPressed: b[3].pressed },
      'lb': { isPressed : b[4].pressed },
      'rb': { isPressed: b[5].pressed },
      'back': { isPressed: b[8].pressed },
      'start': { isPressed: b[9].pressed },
      'left_stick': { isPressed: b[10].pressed },
      'right_stick': { isPressed: b[11].pressed },
      'top_arrow': { isPressed: b[12].pressed },
      'bottom_arrow': { isPressed: b[13].pressed },
      'left_arrow': { isPressed: b[14].pressed },
      'right_arrow': { isPressed: b[15].pressed },
      'home': { isPressed: b[16].pressed },
      'lt': { isPressed: b[6].pressed },
      'rt': { isPressed: b[7].pressed },
    };
  }

  pulse(config) {
    config = { ...config, ...{ duration: 500, strongMagnitude: 0.5, weakMagnitude: 0.5 } };
    const { vibrationType } = this;
    if(vibrationType) {
      this.original.vibrationActuator.playEffect(vibrationType, config);  
    }
  }
}

export default isFirefox ? FirefoxGamepad : ChromeGamepad;
