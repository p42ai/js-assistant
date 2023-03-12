**Template literals are string templates that can include variables and expressions.**
They can replace string concatenation and are often easier to read. Example: `` `Hello, ${name}!` ``

### Mechanics

This refactoring supports converting the first line of concatenated strings into template literals or shortened strings:

- concatenated string literals will be combined, e.g. `"a" + "b"` will become `"ab"`
- concatenated expressions and variables will be embedded in templates, e.g. `"a" + x + "b"` will become `` `a${x}b` ``
- unnecesary escaping of quotes is removed when string are combined or transformed into template literals
