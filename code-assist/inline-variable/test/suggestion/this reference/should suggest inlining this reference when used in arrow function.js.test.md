
## Input
```javascript input
class C extends B {
  m() {
    const self = this;
    return () => self.m2();
  }
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
```json expected matches
{
  "37-49-VariableDeclaration": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can inline 1 occurrence of 'self'."
    }
  }
}
```

## Expected Output
```javascript expected output
class C extends B {
  m() {
    return () => this.m2();
  }
}
```
