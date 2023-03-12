
## Input
```javascript input
class C {
  constructor(a) {
    a = a || 2;
    console.log(a);
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
  constructor(a = 2) {
    console.log(a);
  }
}
```
