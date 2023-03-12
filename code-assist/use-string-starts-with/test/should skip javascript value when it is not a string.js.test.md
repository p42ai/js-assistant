
JavaScript does not allow for type detection. Once we have a JS type detection
mechanism, we could replace the pattern in cases where the confidence in having
a string type is high.

## Input
```javascript input
let s = [];
const match = s[0] === '/';
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
