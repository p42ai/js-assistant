## Input

```javascript input
const x = (f({ a: a }))++;
const dummy = { b: b };
```

## Configuration

```json configuration
{
  "extension": "js"
}
```

## Expected Output

```javascript expected output
const x = (f({ a }))++;
const dummy = { b };
```
