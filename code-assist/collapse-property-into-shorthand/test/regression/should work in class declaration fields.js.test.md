## Input

```javascript input
export class C extends C1 implements I1, I2 {
  x = { f: f };
  #y = { g: g };
  private z = { h: h };
  static a: string = { i: i };
}
```

## Configuration

```json configuration
{
  "extension": "js"
}
```

## Expected Output

```javascript expected output
export class C extends C1 implements I1, I2 {
  x = { f };
  #y = { g };
  private z = { h };
  static a: string = { i };
}
```
