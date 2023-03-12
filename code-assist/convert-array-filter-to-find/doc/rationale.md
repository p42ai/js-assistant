`Array.find(…)` is more concise and meaningful, and it avoids allocating a temporary array.

If you are using TypeScript without checked index access (`--noUncheckedIndexedAccess`), switching to `.find` will help you identify and handle edge cases where the array does not contain a matching element and `.find` returns `undefined`.