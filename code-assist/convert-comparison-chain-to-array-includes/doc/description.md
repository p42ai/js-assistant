This refactoring replaces string comparison chains with an `array.includes()` call. It works for regular string comparisons with `|| ===` and for negated string comparisons with `&& !==`. When the string comparison is negated, the `.includes` call is prefixed with `!`.

## Example

```javascript
if (obj.property === "value1" 
    || obj.property === "value2" 
    || obj.property === "value3") {
    // ...
}
```
becomes
```javascript
if (["value1", "value2", "value3"].includes(obj.property)) {
    // ...
}
```

