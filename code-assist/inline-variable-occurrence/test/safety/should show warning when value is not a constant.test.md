
## Input
```javascript input
const aVariable = calculate();
doSomething1(aVariable);
doSomething2(aVariable);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "69-69"
}
```

## Expected Matches
```json expected matches
{
  "69-78-Identifier": {
    "safety": {
      "level": "WARNING",
      "message": "variable could have been modified"
    }
  }
}
```

## Expected Output
```javascript expected output
const aVariable = calculate();
doSomething1(aVariable);
doSomething2(calculate());
```
