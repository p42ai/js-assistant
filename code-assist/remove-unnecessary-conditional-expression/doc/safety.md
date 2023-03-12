#### Removes conversion to boolean
With an expression `aCondition ? true : false`, the result always has the primitive type boolean. However, the input `aCondition` could have any type, even if the truthiness is the same.

When conversion to boolean is needed, a more straightforward way for converting a value to boolean is `Boolean(aCondition)`.

#### Removes conditions with side-effects
The condition of a ternary expression `obj.method() ? value : value` could have side effects. When replacing the ternary with `value`, `obj.method()` is not executed any more. This change could impact the program behavior. 

In such cases,  clearer alternative is to call `obj.method()` beforehand, and then use `value`:
```javascript
const aVariable = obj.method() ? value : value;
// becomes
obj.method();
const aVariable = value;
```