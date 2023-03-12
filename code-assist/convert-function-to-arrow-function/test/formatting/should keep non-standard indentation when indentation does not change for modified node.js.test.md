
## Input
```javascript input
(() => {
X.a = function() {
      const a = "x";
};

X.b = function() {
      // dummy
};
})();
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
(() => {
X.a = () => {
      const a = "x";
};

X.b = () => {
      // dummy
};
})();
```
