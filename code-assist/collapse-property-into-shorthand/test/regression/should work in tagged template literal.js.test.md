## Input

```javascript input
tag`a${f({ a: a })}b`;
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
tag`a${f({ a })}b`;
const dummy = { b };
```
