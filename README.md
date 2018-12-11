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
  const gamepad = aviator.gamepads[0];
  const { right } = gamepad.sticks;
  const angle = Math.atan2(right.y, right.x);
  // BFG.shoot(angle);
  // if(hero.collisionWith(bullet))
  // gamepad.pulse({ duration: 500, strongMagnitude: 0.5, weakMagnitude: 0.5 });
  requestAnimationFrame(gameloop);
}
```
