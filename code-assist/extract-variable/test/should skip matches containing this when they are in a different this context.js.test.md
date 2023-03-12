
## Input
```javascript input
class aClass {
  aMethod() {
    const example = this.aProperty;

    function innerFunction() {
      f2(this.aProperty); // potentially different this
    }
  }
};
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "49-63"
}
```

## Expected Output
```javascript expected output
class aClass {
  aMethod() {
    const aProperty = this.aProperty;
    const example = aProperty;

    function innerFunction() {
      f2(this.aProperty); // potentially different this
    }
  }
};
```
