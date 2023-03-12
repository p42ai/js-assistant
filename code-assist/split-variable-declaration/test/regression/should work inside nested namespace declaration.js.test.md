
## Input
```javascript input
module ns {
  export module s1 {
    const a, b;
  }

  const x, y;
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
module ns {
  export module s1 {
    const a;
    const b;
  }

  const x;
  const y;
}
```
