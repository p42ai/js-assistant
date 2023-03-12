
## Input
```javascript input
class C {
}

export default C;
doSomething();
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "13-13",
  "transformationId": "down"
}
```

## Expected Output
```javascript expected output
class C {
}

doSomething();
export default C;
```
