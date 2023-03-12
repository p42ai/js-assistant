
## Input
```javascript input
const [ something, somethingElse, aVariable ] = anObject;
doSomething(aVariable);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "34-34"
}
```

## Expected Output
```javascript expected output
const [ something, somethingElse, ] = anObject;
doSomething(anObject[2]);
```
