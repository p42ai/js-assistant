**Convert variable declarations with multiple variables into separate declarations that declare one variable each.**

For example,
```javascript
let a = 2, b;
```
is converted into
```javascript
let a = 2;
let b;
```