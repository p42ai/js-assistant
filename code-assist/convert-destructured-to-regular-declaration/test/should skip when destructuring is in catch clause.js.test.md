
Note: catch clause cannot have an initializer, but this gets parsed anyways.

## Input
```javascript input
try {
  doSomething();
} catch ({ message } = anObject) {
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
