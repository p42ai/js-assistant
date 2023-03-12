
## Input
```javascript input
class A {
  constructor() {
    const a, b;
  }
}

const x, y;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
class A {
  constructor() {
    const a;
    const b;
  }
}

const x;
const y;
```
