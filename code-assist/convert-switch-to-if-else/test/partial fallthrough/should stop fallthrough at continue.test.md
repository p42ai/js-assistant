
## Input
```javascript input
for (const aVariable of anArray) {
  switch (aVariable) {
    case "0":
    case "1":
      doSomething1();
    case "2":
      doSomething2();
      continue;
    case "3":
      doSomething3();
  }
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
for (const aVariable of anArray) {
  if (aVariable === "0" || aVariable === "1") {
    doSomething1();
    doSomething2();
    continue;
  } else if (aVariable === "2") {
    doSomething2();
    continue;
  } else if (aVariable === "3") {
    doSomething3();
  }
}
```
