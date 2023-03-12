
## Input
```javascript input
for (const a of [1, 2, 3]) {
    var conditionallyAssignedInLoop;
    if (sometimes()) {
        conditionallyAssignedInLoop = true;
    }
    console.log(conditionallyAssignedInLoop);
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
