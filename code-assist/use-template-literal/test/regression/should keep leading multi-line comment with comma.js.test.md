
## Input
```javascript input
q({
  /**
   * A,
   * B
   */
  svg() {
    return this._text;
  },

  f() {
    const a = "1" + "2";
  },

  g() {
    const b = "3" + "4";
  }
})
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
q({
  /**
   * A,
   * B
   */
  svg() {
    return this._text;
  },

  f() {
    const a = "12";
  },

  g() {
    const b = "34";
  }
})
```
