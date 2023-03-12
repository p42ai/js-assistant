
## Input
```javascript input
class C {
  private m() {
    doSomething();
  }

  m2() {
    this.m();

    const Inner = class {
      private m() {}
      m3() {
        this.m();
      }
    }
  }
}
```

## Configuration
```json configuration
{
  "extension": "ts",
  "selection": "12-12"
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

    const Inner = class {
      private m() {}
      m3() {
        this.m();
      }
    }
  }
}
```
