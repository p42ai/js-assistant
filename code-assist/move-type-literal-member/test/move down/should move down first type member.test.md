
## Input
```javascript input
type aType = {
  property1: string;
  property2: number;
  property3: boolean;
};
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "17-17"
}
```

## Expected Output
```javascript expected output
type aType = {
  property2: number;
  property1: string;
  property3: boolean;
};
```
