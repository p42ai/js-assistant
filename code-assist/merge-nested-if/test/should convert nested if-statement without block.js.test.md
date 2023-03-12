
TODO better formatting of output (`{` should not be on additional line})
* tricky because whitespace gets extracted and reprinted in whitespace element

## Input
```javascript input
if (a == 2)
  if (b == 3) {
    f(a, b);
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
if (a == 2 && b == 3)
  {
  f(a, b);
}
```
