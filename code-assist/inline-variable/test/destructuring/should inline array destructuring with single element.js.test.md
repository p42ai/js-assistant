
## Input
```javascript input
const [ aVariable ] = anObject;
doSomething(aVariable);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
doSomething(anObject[0]);
```
