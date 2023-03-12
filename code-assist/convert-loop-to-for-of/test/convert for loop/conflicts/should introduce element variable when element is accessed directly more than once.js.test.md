
## Input
```javascript input
for (let i = 0; i < elements.length; i++) {
  for (let j = 0; j < elements[i].length; j++) {
    doSomething(elements[i][j]);
  }
}
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
  "0-131-ForStatement": {
    "applicationResult": "applied"
  },
  "43-129-ForStatement": {
    "applicationResult": "rejected/conflict"
  }
}
```

## Expected Output
```javascript expected output
for (const element of elements) {
  for (let j = 0; j < element.length; j++) {
    doSomething(element[j]);
  }
}
```
