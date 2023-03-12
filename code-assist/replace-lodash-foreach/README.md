# Replace Lodash forEach

## `_.forEach` Semantics (Lodash 4)
- null-safe: checks for nullish collections (and returns the corresponding nullish value)
- distinguishes 3 cases:
  - Array (via `Array.isArray`)
  - Array-like (via `length` property)
  - Objects
- iteration order
  - `0...n-1` for Array and Array-like
  - undefined for objects
- breaks loop when iteratee function returns false
- function parameters:
  - 1st parameter is value
  - 2nd parameter is index/property name
  - 3rd parameter is original collection

## Improvements
- Support conversion for objects (with keys)
  - Support 2nd and 3rd param
- Warning when there is early exit (with `return false`) instead of excluding
  - Alternative: support conversion to `for..of`
- Ignore return statements in nested functions when determining if there is a return
- Converting to optional call `.?` can convert `null` to `undefined`. Warn if used.
- Support `arguments` object.

## Bugs
- Does not run on GitHub (needs to be activated & limited to Pro users)