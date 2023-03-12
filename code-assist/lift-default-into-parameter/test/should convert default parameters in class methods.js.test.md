
## Input
```javascript input
class C {
  m(a) {
    a = a || 2;
  }
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
class C {
  m(a = 2) {
  }
}
```
