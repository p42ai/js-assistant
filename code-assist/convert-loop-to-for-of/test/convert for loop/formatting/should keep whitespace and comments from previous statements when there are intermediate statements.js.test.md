
## Input
```javascript input
// comment 1a
console.log("1"); // comment 1b

const n = elements.length;
console.log("2"); // comment 2
for (let i = 0; i < n; i++) {
  const element = elements[i];
  console.log(element);
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
// comment 1a
console.log("1"); // comment 1b

console.log("2"); // comment 2
for (const element of elements) {
  console.log(element);
}
```
