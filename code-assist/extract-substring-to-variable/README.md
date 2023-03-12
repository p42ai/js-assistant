## Improvements
- Detailed safety evaluation when extracting with inner expressions
  - starts with head: safe
  - all previous expressions are side-effect free: safe
  - extracting constant expressions: safe
  - other: warn that execution order might be affected
- Reduce max label size when extracting (match message)

## Bugs
- Extraction attempts that break escape sequences (be it unicode escapes or template character escapes)
  - could auto-expand to cover escape sequences, or show safety warning, or not allow refactoring