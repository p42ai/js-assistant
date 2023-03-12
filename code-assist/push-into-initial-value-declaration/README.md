## Improvements
* safety analysis
  * safe: variable pushup w/o keywords
  * array and object destruction: potential side-effects
* suggestions (when safe)

## Bugs
Failed to push up `applicationResult`:
```typescript
const appliedCodeAssists = allCodeAssists.flatMap((codeAssists, index) => {
  const applicationResultsById = new Map<
    p42.CodeAssistApplicationResult["codeAssistId"],
    p42.CodeAssistApplicationResult["result"]
  >();

  for (const applicationResult of allApplicationResults[index]) {
    const { codeAssistId, result } = applicationResult;
    applicationResultsById.set(codeAssistId, result);
  }
});
```