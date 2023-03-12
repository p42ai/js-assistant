
## Input
```javascript input
const a = <div> outer <div>inner</div></div>;
const b = <div>inner</div>;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "22-38"
}
```

## Expected Output
```javascript expected output
const newVariable = <div>inner</div>;
const a = <div> outer {newVariable}</div>;
const b = newVariable;
```
