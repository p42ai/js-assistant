
## Input
```javascript input
class A {
  static m1() {
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
  static m1() {
    const a;
    const b;
  }
}

const x;
const y;
```
