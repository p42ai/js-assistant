
## Input
```javascript input
const a = (
  <>
    <>
      <element attr="value" attr2="v2" />
      <element attr="value" attr2="v2" />
    </>  
  </>
);
```

## Configuration
```json configuration
{
  "extension": "tsx"
}
```

## Expected Output
```javascript expected output
const a = (
  <>
    <element attr="value" attr2="v2" />
    <element attr="value" attr2="v2" />
  </>
);
```
