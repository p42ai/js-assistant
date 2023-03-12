
## Input
```javascript input
var a: number = 1,
    b: string = '2',
    c: (() => void) = function fx() { },
    d: number | null = null,
    e: any = {},
    f: any;
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
var a: number = 1;
var b: string = '2';
var c: (() => void) = function fx() { };
var d: number | null = null;
var e: any = {};
var f: any;
```
