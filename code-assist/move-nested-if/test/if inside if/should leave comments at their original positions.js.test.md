
## Reason
* Moving the outer comment that might be for the whole if statement inside can lead to incorrect comment positioning.
* Moving the inner comment outside breaks the inverting of the operation.
* Best if comment changes are left to the user.

## Input
```javascript input
anotherStatement();

// commentA-1
// commentA-2
if (conditionA) {
    // commentB-1
    // commentB-2
    if (conditionB) {
        doSomething();
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
anotherStatement();

// commentA-1
// commentA-2
if (conditionB) {
    // commentB-1
    // commentB-2
    if (conditionA) {
        doSomething();
    }
}
```
