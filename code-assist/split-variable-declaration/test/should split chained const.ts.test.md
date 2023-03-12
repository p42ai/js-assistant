
## Input
```javascript input
const a: number = 1,
      b: string = '2',
      c: (() => void) = function f() { },
      d: number | null = null,
      e: any = {};
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
const a: number = 1;
const b: string = '2';
const c: (() => void) = function f() { };
const d: number | null = null;
const e: any = {};
```
