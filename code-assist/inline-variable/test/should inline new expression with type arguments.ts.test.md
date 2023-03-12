
## Input
```javascript input
const a = new A<B, C>("test");

f(a);
```

## Configuration
```json configuration
{
  "extension": "ts",
  "selection": "6-6"
}
```

## Expected Output
```javascript expected output

f(new A<B, C>("test"));
```
