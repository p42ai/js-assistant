
## Input
```javascript input
import find = require('a-package');

if (iterResult.done) {
    iterResult;
    iterResult.value;
} else {
    iterResult;
    iterResult.value;
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
import find = require('a-package');

if (iterResult.done) {
    iterResult;
} else {
    iterResult;
}
iterResult.value;
```
