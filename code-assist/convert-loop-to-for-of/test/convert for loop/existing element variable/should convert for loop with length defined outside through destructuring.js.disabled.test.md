
## Input
```javascript input
const { length } = elements;
for (let i = 0; i < length; i++) {
  const element = elements[i];
  console.log(element);
}
```

## Expected Output
```javascript expected output
for (const element of elements) {
  console.log(element);
}
```
