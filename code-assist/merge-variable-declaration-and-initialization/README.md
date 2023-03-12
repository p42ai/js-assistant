# Merge Variable Declaration and Initialization

## Improvements
* support longer-range split between init and declare (workaround: use move refactorings)
* support multi-declarations (workaround: split them)

## Bugs
* activation does not work on `var` / `let` (statement) - most likely a bug in the extension code