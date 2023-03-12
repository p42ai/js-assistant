
## Input
```javascript input
let a: number = 1,
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
let a: number = 1;
let b: string = '2';
let c: (() => void) = function f() { };
let d: number | null = null;
let e: any = {};
```
