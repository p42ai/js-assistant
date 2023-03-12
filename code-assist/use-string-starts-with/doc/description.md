**String.prototype.startsWith() checks if a string starts with another string.**

This refactoring replaces index-based single-character comparison with `startsWidth`,
e.g. `s[0] === '/'` becomes `s.startsWith('/')`.
