
## Input
```javascript input
elements.forEach(function(element) {
  if (element !== "abc") {
    return element.doSomething();
  }

  console.log(element);
});
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
  "0-130-ExpressionStatement": {
    "safety": {
      "level": "WARNING",
      "message": "contains return statements with expressions"
    }
  }
}
```

## Expected Output
```javascript expected output
for (const element of elements) {
  if (element !== "abc") {
    continue;
  }

  console.log(element);
}
```