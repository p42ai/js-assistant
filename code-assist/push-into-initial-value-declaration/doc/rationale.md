The refactoring helps remove unnecessary indirection. It is particularly useful for pushing destructuring into parameters and catch clauses:

```javascript
function f(aParameter) {
  const { variable1, variable2 } = aParameter;
  doSomething(variable1, variable2);
}
```
becomes
```javascript
function f({ variable1, variable2 }) {
  doSomething(variable1, variable2);
}
```