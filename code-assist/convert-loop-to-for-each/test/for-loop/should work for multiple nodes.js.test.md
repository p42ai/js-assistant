
## Input
```javascript input
function f1() {
    var elements = [];
    var identifier;
    for (var i = 0; i < elements.length; i++) {
        identifier = elements[i].identifier;
    }
}
function f2() {
    var elements = [];
    var identifier;
    for (var i = 0; i < elements.length; i++) {
        identifier = elements[i].identifier;
    }
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
function f1() {
    var elements = [];
    var identifier;
    elements.forEach((element) => {
        identifier = element.identifier;
    });
}
function f2() {
    var elements = [];
    var identifier;
    elements.forEach((element) => {
        identifier = element.identifier;
    });
}
```
