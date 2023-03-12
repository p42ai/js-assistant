
## Input
```javascript input
const aProperty = f();
const x = <JsxElement aProperty={aProperty} />;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "6-6"
}
```

## Expected Output
```javascript expected output
const x = <JsxElement aProperty={f()} />;
```
