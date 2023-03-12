
## Input
```javascript input
class C {
  private c: number = 42;

  private m() {
    this.c = 12;
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
  "9-35-PropertyDeclaration": {
    "applicationResult": "applied"
  },
  "35-73-MethodDeclaration": {
    "applicationResult": "rejected/conflict"
  }
}
```

## Expected Output
```javascript expected output
class C {
  #c: number = 42;

  private m() {
    this.#c = 12;
  }
}
```
