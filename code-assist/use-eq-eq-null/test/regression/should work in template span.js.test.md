
## Input
```javascript input
f(`a${null === x || undefined === x}b`);

const q = a === null || a === undefined;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
f(`a${x == null}b`);

const q = a == null;
```
