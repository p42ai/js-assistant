
## Input
```javascript input
if (x) {
  f2a();
  f1();
} else {
  f2b();
  f1();
}

// a comment

const myVar = 123;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
if (x) {
  f2a();
} else {
  f2b();
}
f1();

// a comment

const myVar = 123;
```
