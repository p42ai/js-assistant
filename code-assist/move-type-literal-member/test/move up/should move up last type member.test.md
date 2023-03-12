
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
  "selection": "59-59"
}
```

## Expected Output
```javascript expected output
type aType = {
  property1: string;
  property3: boolean;
  property2: number;
};
```
