# aviator

```
npm i aviator.js
```

```javascript
import Aviator from 'aviator.js';

const aviator = new Aviator({
  listenButtonEvents: true,
  normalizeSticksDeadzone: true,
  sticksDeadzone: 0.2,
});

aviator.listen('connect', (gamepad, originalEvent) => {
console.log(gamepad.triggers, gamepad.sticks, gamepad.buttons);
console.log(gamepad.index, gamepad.name, gamepad.original, aviator.gamepads);
gameloop();
});
aviator.listen('disconnect', (gamepad, originalEvent) => {});
// if listenButtonEvents is specified in the config
aviator.listen('buttonUp', (btn, gamepad) => {});
aviator.listen('buttonDown', (btn, gamepad) => {});

const gameloop = () => {
  const { right } = aviator.gamepads[0].sticks;
  const angle = Math.atan2(right.y, right.x);
  // BFG.shoot(angle);
  requestAnimationFrame(gameloop);
}
```
