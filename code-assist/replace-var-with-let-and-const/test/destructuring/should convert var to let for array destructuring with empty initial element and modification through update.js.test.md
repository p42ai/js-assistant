
## Input
```javascript input
var [, destructuringA, destructuringB] = m();
destructuringA++
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let [, destructuringA, destructuringB] = m();
destructuringA++
```
