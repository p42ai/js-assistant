
Note: Global variables can have side-effects even as stand-alone identifiers,
if they are defined as a property on the global this as follows:

Object.defineProperty(this, 'hello', { get() { console.log("World"); } });

## Input
```javascript input
f1();
a + b; // global
f2();
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
