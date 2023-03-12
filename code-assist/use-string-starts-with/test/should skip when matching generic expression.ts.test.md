
We don't know the length of the generic expression, even if we assume it's a string.
One option could be to make the change less save, or to add a check for the string
length when needed.

## Input
```javascript input
let s: string = '123';
const match = s[0] === x;
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```
