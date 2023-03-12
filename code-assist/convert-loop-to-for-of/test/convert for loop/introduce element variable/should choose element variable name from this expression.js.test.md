
## Input
```javascript input
class C {
  aMethod() {
    for (let i = 0; i < this.items.length; i++) {
      doSomething(this.items[i]);
    }
  }
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
class C {
  aMethod() {
    for (const item of this.items) {
      doSomething(item);
    }
  }
}
```
