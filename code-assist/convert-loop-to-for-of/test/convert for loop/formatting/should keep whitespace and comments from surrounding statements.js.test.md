
## Input
```javascript input
// comment 1a
console.log("1"); // comment 1b

const n = elements.length;
for (let i = 0; i < n; i++) {
  const element = elements[i];
  console.log(element);
}

// comment 1c
console.log("1");

// comment 1d
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

for (const element of elements) {
  console.log(element);
}

// comment 1c
console.log("1");

// comment 1d
```
