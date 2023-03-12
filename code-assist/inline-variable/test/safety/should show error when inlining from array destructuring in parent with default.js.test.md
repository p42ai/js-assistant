
## Input
```javascript input
const [ [ aVariable ] = [ "default" ] ] = anObject;
doSomething(aVariable);
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
  "9-19-BindingElement": {
    "safety": {
      "level": "ERROR",
      "message": "removes default application"
    }
  }
}
```

## Expected Output
```javascript expected output
doSomething(anObject[0][0]);
```
