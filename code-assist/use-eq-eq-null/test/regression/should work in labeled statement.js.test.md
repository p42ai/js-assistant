
## Input
```javascript input
label: f(`a${null === x || undefined === x}b`);

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
label: f(`a${x == null}b`);

const q = a == null;
```
