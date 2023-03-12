
## Input
```javascript input
class C {
    get a() {
        var x = 3, y = 2;
    }
}
var z;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
class C {
    get a() {
        const x = 3, y = 2;
    }
}
let z;
```
