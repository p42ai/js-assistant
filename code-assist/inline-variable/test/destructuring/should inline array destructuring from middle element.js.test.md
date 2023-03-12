
## Input
```javascript input
const [ something, aVariable, somethingElse ] = anObject;
doSomething(aVariable);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "19-19"
}
```

## Expected Output
```javascript expected output
const [ something, , somethingElse ] = anObject;
doSomething(anObject[1]);
```
