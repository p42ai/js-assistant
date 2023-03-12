The "Remove unnecessary conditional expression" refactoring replaces a conditional expression (ternary) in two situations:

1. When the ternary returns `true` when truthy and `false` when falsy.
   ```javascript
   aCondition ? true : false
   // changes into:
   aCondition
   ```

1. When the ternary returns the same value, regardless of whether the condition is truthy or falsy:
   ```javascript
   aCondition ? aValue : aValue
   // changes into:
   aValue
   ```