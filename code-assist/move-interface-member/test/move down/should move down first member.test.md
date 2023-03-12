
## Input
```javascript input
interface anInterface {
  property1: string;
  property2: number;
  property3: boolean;
};
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "26-26"
}
```

## Expected Output
```javascript expected output
interface anInterface {
  property2: number;
  property1: string;
  property3: boolean;
};
```
