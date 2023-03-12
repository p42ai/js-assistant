
&& has a higher precedence than ||.
Splitting on && in here would change the behavior.

## Input
```javascript input
if (a && b || c) {
    console.log("1");
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "6-6"
}
```
