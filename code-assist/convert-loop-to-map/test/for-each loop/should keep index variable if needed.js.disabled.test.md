
## Input
```javascript input
const values = [];
elements.forEach((element, i) => {
  const value = element * i;
  values.push(value);
}
```

## Expected Output
```javascript expected output
const values = elements.map((element, i) => {
  const value = element * i;
  return value;
});
```
