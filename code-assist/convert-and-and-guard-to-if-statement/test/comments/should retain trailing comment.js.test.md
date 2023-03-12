## Input

```javascript input
a && (b = c); // comment
```

## Configuration

```json configuration
{
  "extension": "js"
}
```

## Expected Output

```javascript expected output
if (a) b = c; // comment
```
