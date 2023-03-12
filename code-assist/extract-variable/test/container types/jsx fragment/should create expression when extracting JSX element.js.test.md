
## Input
```javascript input
const a = <> outer <div>inner</div></>;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "19-35"
}
```

## Expected Output
```javascript expected output
const newVariable = <div>inner</div>;
const a = <> outer {newVariable}</>;
```
