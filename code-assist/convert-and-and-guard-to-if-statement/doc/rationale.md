Using `&&` short-circuiting to prevent code from being executed can be hard to understand. This practice is common when expressions are required, e.g., inside JSX. However, for regular statements, there are alternatives that are easier to understand, especially for developers who are less familiar with or experienced in JavaScript.

When checking that the leading part of an expression is not nullish, [optional chaining](/documentation/code-assist/use-optional-chaining) is shorter and easier to understand: 
```javascript
anObject && anObject.f();
``` 
becomes 
```javascript
anObject?.f();
```

When testing a more general statement, an explicit `if` is often a more readable alternative: 
```javascript
condition && (myVariable = value);
```
becomes
```javascript
if (condition) myVariable = value;
```