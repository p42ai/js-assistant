
## Input
```javascript input
let a = 123;
a **= x * y;
a *= x ** y;
a /= x + y;
a += x / y;
a ||= x ?? y;
a ??= x || y;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let a = 123;
a = a ** (x * y);
a = a * x ** y;
a = a / (x + y);
a = a + x / y;
a = a || (x ?? y);
a = a ?? x || y;
```
