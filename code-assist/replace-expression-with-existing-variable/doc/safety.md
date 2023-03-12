#### Could change type
This refactoring can lead to type errors (not runtime errors) when the type on the declared variable is wider than the type of the replaced expression, and the replaced expression is used in ways that require the narrower type. Here is an example:
```javascript
function doSomething(aParameter: "123") {
  // ...
}

const aVariable: string = "123";
doSomething("123"); // replacing with aVariable changes type
```