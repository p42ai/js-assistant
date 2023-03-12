# Replace with existing variable

## Improvements

### Suggest for constant expressions that are safe to replace
* highlighting expression and original variable (reverse order for auto-scrolling)
* add to GitHub
* needs performance testing

### Support modified variables where the current value is clear, e.g.
```javascript
let aVariable = "aValue";
aVariable = "anotherValue";
doSomething("anotherValue");
```

### Support variables from destructuring
```javascript
const { aValue } = anObject;
doSomething(anObject.aValue);
```

### Safety evaluations
- `this` and `arguments`
- object creation
- use in hoisted function
- other from inline/extract

## Bugs

### Function hoisting can lead to invalid replacement
Ideally show warning.

```javascript
f();
var a = "123";
function f() {
    console.log("123"); // replacing with a would lead to 'undefined' output
}
```