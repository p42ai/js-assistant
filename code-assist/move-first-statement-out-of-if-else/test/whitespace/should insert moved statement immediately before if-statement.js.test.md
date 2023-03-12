
## Input
```javascript input
const myVar = 123;

// a comment

if (x) {
  f1();
  f2a();
} else {
  f1();
  f2b();
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const myVar = 123;

// a comment

f1();
if (x) {
  f2a();
} else {
  f2b();
}
```
