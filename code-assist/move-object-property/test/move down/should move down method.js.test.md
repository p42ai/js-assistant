
## Input
```javascript input
const anObject = {
  property1: "value1",
  method() {
  },
  property2: "value2"
};
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "44-44",
  "transformationId": "down"
}
```

## Expected Output
```javascript expected output
const anObject = {
  property1: "value1",
  property2: "value2",
  method() {
  }
};
```
