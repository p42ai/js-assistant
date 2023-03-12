# Convert to .map()

## Improvements
* support functions with index variable
* replace `elements[i]` with introduced variable (reuse code from for..of/forEach conversion)
* highlighting + renaming
* safety analysis
  * could be safe if collection is array
  * flatMap: inner argument should be array
* recommendations
  * incl. highlighting
* use `.flatMap` when needed
  * for spread operator
    * need to check that argument is an array
    * warn otherwise
* automatic return <> continue conversion

## Bugs
* warn about async usage