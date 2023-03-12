
TODO switch to safe once hoisting detection is in place

## Input
```javascript input
const aVariable = "constant";
doSomething("constant");
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
  "42-52-StringLiteral": {
    "safety": {
      "level": "UNKNOWN"
    }
  }
}
```

## Expected Output
```javascript expected output
const aVariable = "constant";
doSomething(aVariable);
```
