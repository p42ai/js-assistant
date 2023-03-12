
## Input
```javascript input
const { length: n } = elements;
for (let i = 0; i < n; i++) {
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
