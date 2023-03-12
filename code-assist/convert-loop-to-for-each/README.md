# Convert loop to .forEach

## Bugs
* `break`, `continue`, `return` statement in for...of loop are ignored (should not match)
* `async/await` in for...of loop
* for...of loop over something that has no `.forEach()` (or different semantics), i.e. not an array (could produce warning)