
## Input
```javascript input
const C = class {
  aField: number = 123;

  constructor(x: number);
  constructor(x: string); 
  constructor(x: any) {
  }
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
const C = class {
  aField: number;

  constructor(x: number);
  constructor(x: string); 
  constructor(x: any) {
    this.aField = 123;
  }
}
```
