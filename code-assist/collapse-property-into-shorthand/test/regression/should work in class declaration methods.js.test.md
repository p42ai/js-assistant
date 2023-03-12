## Input

```javascript input
export class C {
  a() {
    const x = { f: f };
  }
  b() {
    const y = { g: g };
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
export class C {
  a() {
    const x = { f };
  }
  b() {
    const y = { g };
  }
}
```
