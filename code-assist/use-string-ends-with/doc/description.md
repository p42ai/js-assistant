**String.prototype.endsWith() checks if a string ends with another string.**

This refactoring replaces index-based single-character comparison with `endsWidth`,
e.g. `s[s.length - 1] === '/'` becomes `s.endsWith('/')`.
