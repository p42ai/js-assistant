# Displays in the Visual Studio Code UI

## Editor
### Diagnostics
1. Shown as hint, info...
    1. Popover on hover
### Code action requests
1. Cursor move (`context.only === undefined`)
    1. Lightbulb menu indicator inside the editor
         1. blue when diagnostics are available
         1. yellow when quick fixes without diagnostics are available
    1. Quickfix context menu shortcut
1. Diagnostic popover quickfix (`context.only === ['quickfix]`)
1. Context menus and direct shortcuts (`context.only === ['refactor...']`)
    1. Refactoring context menu and more specific context menus
    1. Custom keyboard shortcuts (context menus, direct execution)

## Problems Panel
1. When the suggestion level is information, warning, or error. 
1. Quick fix actions are available.
1. Double-clicking selects the range of the diagnostic in the editor.

## Suggestion Sidepanel (P42)
1. Highlighting from the suggestion sidepanel. 
   1. Should be optimized for the user to understand the suggestion.

# Action Zones, Diagnostics, etc.

## Case: Add Numeric Separators
Matched element is a leaf node.

1. Diagnostic should be the whole element when it's a suggestion.
1. Quick fix should be available on the whole element when it's a suggestion.
1. Convert and refactor context menu entry should be available on the whole element.
   1. when diagnostic: preferred
1. Suggestion sidebar indicator should be the whole element.