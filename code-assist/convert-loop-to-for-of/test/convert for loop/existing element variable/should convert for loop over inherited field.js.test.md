
## Input
```javascript input
class C {
  m() {
    for (let i = 0; i < this.values.length; i++) {
      const value = this.values[i];
      f(value);
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
  m() {
    for (const value of this.values) {
      f(value);
    }
  }
}
```
