
## Input
```javascript input
class C {
  private m() {
    doSomething();
  }

  m2() {
    this.m();
  }
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Matches
```json expected matches
{
  "9-48-MethodDeclaration": {
    "safety": {
      "level": "WARNING",
      "message": "indirect access with overridden 'this' can break"
    }
  }
}
```

## Expected Output
```javascript expected output
class C {
  #m() {
    doSomething();
  }

  m2() {
    this.#m();
  }
}
```
