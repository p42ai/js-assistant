When a variable is initialized with a second variable, and that second variable is only used in that initialization, you can use the variable instead of the second variable and remove the indirection.

For example, here `variable` can be pushed in the definition of `secondVariable`:
```javascript
const secondVariable = someSource();
const variable = secondVariable;
```
becomes
```javascript
const variable = someSource();
```