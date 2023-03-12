#### Merging can change the variable declaration type to let or var
The declaration kind (`var`, `let`, or `const`) might need to be widened to merge two variable declarations.

For example, when one variable is declared with `var`, the merged declaration is a `var` declaration to prevent scope reductions.
Since `var` declarations are hoisted, this change can lead to variable name conflicts when a variable name is already in use in the function scope:
```javascript
function f(obj) {
    const a = "123"; // 'a' is already declared in the outer scope
    {
        var { b } = obj;
        const { a } = obj; // merging changes the declaration of the inner 'a' to var
    }
}
```

Similarly, the merged variable declaration is a `let` declaration when one variable is declared with `let`.
This change makes the variable that was previously a `const` modifiable.

#### Merging reduces the source expression evaluations
Before merging, the source expression that is being deconstructed is evaluated for each variable declaration.
E.g., in the following example `source.aMethod()` is called twice and could have side effects:
```javascript
const { a } = source.aMethod();
const { b } = source.aMethod();
```

After merging the source expression (on the right hand side of `=`) is only evaluated once:
```javascript
const { a, b } = source.aMethod();
```

#### Merging can require adding missing type information
When only one of the deconstruction statements has a type definition, that type definition will become the definition of the result. The missing elements that were previously inferred by TypeScript need to be added manually:

```typescript
const { a }: { a: string } = obj;
const { b } = obj; // inferred type information
```
becomes
```typescript
const { a, b }: { a: string } = obj; // misses type information for 'b'
```

#### Rest expression
Merging two object deconstruction expressions with rest parameters changes the content of the rest parameter:
```javascript
const { a, ...rest1 } = obj;
const { b, ...rest2 } = obj;
```

P42 does currently not support the merging of object deconstruction with rest expressions.