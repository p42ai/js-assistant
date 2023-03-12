
## Input
```javascript input
class C {
  async #m() {
    doSomething();
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
  private async m() {
    doSomething();
  }
}
```
