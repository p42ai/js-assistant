
## Input
```javascript input
function f() {
  return "3";
}

const a: Array<any> = [1, "2", 3];

a.indexOf(f()) !== -1;
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Matches
```json expected matches
{
  "66-89-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
function f() {
  return "3";
}

const a: Array<any> = [1, "2", 3];

a.includes(f());
```
