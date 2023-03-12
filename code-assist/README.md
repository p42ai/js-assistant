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

## Debugging and Fixing AnalysisRunError TRANSFORM_ERROR Failures

1. Identify repository, file, and codemod from `AnalysisError` table:
   ```sql
   SELECT "AnalysisError".id,
      "AnalysisError".path,
      "AnalysisError".message,
      "Repository"."fullName",
      "Codemod"."bundleId"
   FROM "AnalysisError",
      "Analysis",
      "AnalysisConfiguration",
      "Repository",
      "Codemod"
   WHERE "AnalysisError".type = 'TRANSFORM_ERROR'
      AND "AnalysisError"."analysisId" = "Analysis".id
      AND "Analysis"."configurationId" = "AnalysisConfiguration".id
      AND "AnalysisConfiguration"."repositoryId" = "Repository".id
      AND "AnalysisConfiguration"."codemodId" = "Codemod".id;
   ```
1. Check how often the problem occurs in production (to get a baseline and see if it's a priority)
1. Clone the repository with the error locally, e.g.
   `git clone git@github.com:lgrammel/blanket.git`
1. Setup run config to run transformation against file
   - run config for easy debugging
   - right now file might need to be put into isolated directory
   - use JS transpiled sources when setting up run config
1. Run in debug mode and set breakpoint in error handler. Helpful techniques
   1. Identify potential candidates
   1. `if (x == null) debugger` can be helpful
   1. Remember to compile typescript when you change the code
   1. Load analyzed source code file and go from AST line number to source code snippet
1. Create regression test in transformation
1. Fix root cause
1. Deploy and run codemod in production
1. Verify in production DB that issue is gone (if not, rinse and repeat)
