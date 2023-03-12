
## Input
```javascript input
class A {
  function f(): this {
    const x = { ...a && a.b };
  }
}

const y = a && a.b;
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
class A {
  function f(): this {
    const x = { ...a?.b };
  }
}

const y = a?.b;
```
