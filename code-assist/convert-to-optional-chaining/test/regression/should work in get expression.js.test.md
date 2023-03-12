
## Input
```javascript input
class A {
  public get f(): string {
    return a && a.b;
  }
}

const x = a && a.b;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
class A {
  public get f(): string {
    return a?.b;
  }
}

const x = a?.b;
```
