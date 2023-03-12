
## Input
```javascript input
let a;
if (x.q == null) {
  a = 123;
} else {
  a = x.q;
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
  "6-58-IfStatement": {
    "safety": {
      "level": "WARNING",
      "message": "could change number of function or getter calls"
    }
  }
}
```

## Expected Output
```javascript expected output
let a;
a = x.q ?? 123;
```
