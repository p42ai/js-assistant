The `anArray.map(aFunction)` function creates a new array that contains a transformed value for each original array element.
It can be used to replace patterns where a value is calculated for each array element and then pushed into a new array.

For example, 
```javascript
const values = [];
for (const element of elements) {
  values.push(f(element));
}
```
becomes
```javascript
const values = elements.map((element) => {
  return f(element);
});
```

When there is an inner spread expression, the refactoring converts to `anArray.flatMap`:
```javascript
const values = [];
for (const element of elements) {
  values.push(...element);
}
```
becomes
```javascript
const values = elements.flatMap((element) => {
  return element;
});
```

The refactoring works on regular `for` loops, `for..of` loops, and `.forEach` calls.