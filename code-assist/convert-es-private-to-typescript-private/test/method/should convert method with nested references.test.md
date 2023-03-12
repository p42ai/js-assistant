
## Input
```javascript input
class C {
  #m() {
    doSomething();
  }

  m2() {
    this.#m(() => {
      this.#m();
    });
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
  private m() {
    doSomething();
  }

  m2() {
    this.m(() => {
      this.m();
    });
  }
}
```
