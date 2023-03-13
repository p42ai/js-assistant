## Guidelines for labels, descriptions and highlights
### Description
`You can VERB the OBJECT...`

The description should be as concrete as possible for the user to understand
what it does and its impact without executing it.

### Highlighting
Should show the object from the description without being overwhelming. 
The goal is for the user to understand the refactoring and refactoring impact quickly.

## Code Action Testing

### Typical Error scenarios
- Naming conflicts when introducing identifiers, e.g. variables
- Comment retention (comments get lost, duplicated, or moved)
- Side-effects, e.g. of getters (can even be single variables in global scope)
- `with` statement effects on variables (all bets are off inside `with`)
- eval, new Function, etc.
- Prototype chain modifications
- symbols, e.g. Symbol.toPrimitive, Symbol.iterator, etc.
- strict mode & modules
  - using reserved words when non-strict
- TypeScript type annotations
- TypeScript type narrowing issues, e.g. when converting `a && a.b` into `a?.b` inside an if condition, but inside the then block code relies on `a` not being null (which TS cannot infer in v4.6)
- Falsy vs nullish, null vs undefined
- return values of short circuiting evaluations
- parentheses issues when changing operator precedence, e.g. by removing operators, inlining expressions, or converting expressions
- yield inside generators functions and impact on dataflow/control flow

### Test approaches
- Run mass refactoring on definitely-typed repository.
