**`let` and `const` are block-scope variable declarations that can replace 'var' declarations in many cases.**

`const` declares blocked-scoped variables that cannot be re-assigned. `let` declares block-scoped variables that can be changed.
They are available since ES6 and are preferred over function-scope, modifiable `var` declarations, because they make it easier to reason about the code.

When there are several variables declared in a statement, this refactoring does not change the declaration to prevent formatting breakages and linter issues.
