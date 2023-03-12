
## Input
```javascript input
class C {
  #m() {
    doSomething();
  }

  m2() {
    this.#m();
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
  "9-41-MethodDeclaration": {
    "safety": {
      "level": "INFORMATION",
      "message": "will be accessible at runtime"
    }
  }
}
```

## Expected Output
```javascript expected output
class C {
  private m() {
    doSomething();
  }

  m2() {
    this.m();
  }
}
```
