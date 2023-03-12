# SimplifySwitch

## Improvements
* remove useless case blocks (at the end, just fallthrough)
* introduce block with label and change breaks to labelled breaks if there are inner breaks

## Known Bugs
* Leading comments might get removed.