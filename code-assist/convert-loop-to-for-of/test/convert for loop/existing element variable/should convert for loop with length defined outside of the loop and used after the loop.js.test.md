
## Input
```javascript input
const n = elements.length;

for (let i = 0; i < n; i++) {
  const element = elements[i];
  console.log(element);
}

console.log(n);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
```json expected matches
{
  "26-114-ForStatement": {
    "suggestion": {
      "description": "You can convert the for loop into a 'for…of' loop.",
      "highlightRanges": ["6-25", "28-55", "66-87"]
    }
  }
}
```

## Expected Output
```javascript expected output
const n = elements.length;

for (const element of elements) {
  console.log(element);
}

console.log(n);
```
