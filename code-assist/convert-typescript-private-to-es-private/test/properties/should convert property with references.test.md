
## Input
```javascript input
class C {
  private c: number = 42;

  m() {
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

## Expected Output
```javascript expected output
class C {
  #c: number = 42;

  m() {
    this.#c = 12;
  }
}
```
