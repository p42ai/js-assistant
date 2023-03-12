**`for...of` loops over iterable objects, for example arrays or strings.**

It is easier to read than indexed `for` loops and can replace them in many cases.

### Refactoring Example
Before:
```javascript
for (let i = 0; i < elements.length; i++) {
  const element = elements[i];
  console.log(element);
}
```

After:
```javascript
for (const element of elements) {
  console.log(element);
}
```
