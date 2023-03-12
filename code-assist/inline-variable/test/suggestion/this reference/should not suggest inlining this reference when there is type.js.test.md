
## Input
```javascript input
class C extends B {
  m() {
    const self: B = this;
    return function() {
      return self.m2();
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

## Expected Matches
```json expected matches
{
  "37-52-VariableDeclaration": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
class C extends B {
  m() {
    return function() {
      return this.m2();
    }
  }
}
```
