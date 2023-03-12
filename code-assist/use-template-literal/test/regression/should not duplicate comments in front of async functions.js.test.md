
## Input
```javascript input
function f1() {}

/**
 * A
 */
async function f2() {
  const a = 'a' + 'b';
}

const a = 'a' + 'b';
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
function f1() {}

/**
 * A
 */
async function f2() {
  const a = 'ab';
}

const a = 'ab';
```
