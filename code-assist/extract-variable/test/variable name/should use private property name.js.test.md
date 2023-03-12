
## Input
```javascript input
class C {
  #aProperty;

  method() {
    doSomething(this.#aProperty);
  }
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "54-69"
}
```

## Expected Output
```javascript expected output
class C {
  #aProperty;

  method() {
    const aProperty = this.#aProperty;
    doSomething(aProperty);
  }
}
```
