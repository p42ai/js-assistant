
## Input
```javascript input
class C {
  #m() {
    // already exists
  }

  private m() {
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