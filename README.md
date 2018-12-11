<p align="center">
    <img alt="eminus logo" src="https://github.com/s-r-x/Eminus/blob/master/src/logo.svg" width="250">
    <p align="center">React range-slider component</p>
</p>
<p align="center">
    <img alt="eminus logo" src="https://github.com/s-r-x/Eminus/blob/master/hor.gif">
    <img alt="eminus logo" src="https://github.com/s-r-x/Eminus/blob/master/ver.gif">
</p>

```bash
$ npm install eminus
```
```jsx
import React from 'react'
import Eminus from 'eminus'
import 'eminus/dist/Eminus.css'

const Some = () => 
<Eminus
  size="small"
  theme="dark"
  disabled={false}
  min={0}
  max={100}
  step={5}
  showTooltip={true}
  tooltipLabel="mph"
  vertical={false}
  verticalHeight="250px"
  labels={[
    { position: 25, value: '25' },
    { position: 50, value: '50' },
  ]}
/>
```

### Available sizes:
* tiny
* small
* medium
* large
### Available themes:
* classic
* mint
* pastel
* material
* dark
* bloody
* haze
