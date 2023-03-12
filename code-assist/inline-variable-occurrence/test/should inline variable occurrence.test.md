
## Input
```javascript input
const aVariable = "value";
doSomething(aVariable);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "39-39"
}
```

## Expected Output
```javascript expected output
const aVariable = "value";
doSomething("value");
```
