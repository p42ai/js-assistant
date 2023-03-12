
## Input
```javascript input
type T = {
}

doSomething1();
doSomething2();
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "0-0"
}
```

## Expected Output
```javascript expected output
doSomething1();

type T = {
}
doSomething2();
```
