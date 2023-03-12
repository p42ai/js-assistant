
## Input
```javascript input
const x = value;
let a;
if (x != null) {
  a = x;
} else {
  a = 123;
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
```json expected matches
{
  "23-71-IfStatement": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const x = value;
let a;
a = x ?? 123;
```
