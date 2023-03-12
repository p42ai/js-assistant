
Converting would changing the truthiness of the result when `a` is null.
Before, it would have been false, but converting it to optional chaining
would make it true.

## Input
```javascript input
a != undefined && a.b == null;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```