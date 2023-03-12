
## Input
```javascript input
class C {
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

class C {
}
doSomething2();
```
