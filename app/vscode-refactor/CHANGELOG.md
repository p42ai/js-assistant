# Changelog

## 2.10.0 - 2022-12-23

### Added
- You can reply to AI code summaries to get additional information. The Cloud AI feature needs to be enabled in the settings. Replies cost 1 AI credit.

### Changed
- Cleaned up visual appearance of the assistant panel.

## 2.9.1 - 2022-12-20

### Changed
- "Move constant to top-level scope" not recommended by default. It can be enabled in the settings.
- Added squiggly separator to diffs that have multiple hunks.

## 2.9.0 - 2022-12-18

### Added
- The assistant panel and the file scan view show a diff for the expanded suggestion.

## 2.8.1 - 2022-12-06

### Fixed
- The explanation card in the side panel did not automatically open when an explanation was computed. Fixed.

## 2.8.0 - 2022-12-05

### Added
- Experimental "explain" feature. You can enable it in the settings ("Cloud AI"). The code action will show up when you selected several statement or an expression. It is limited to 2048 characters. Please note that parts of your code will be send to the P42 AI server when you use it, and that AI generated content can be inaccurate.

## 2.7.0 - 2022-12-04

### Added
- Experimental "document method / function" feature. You can enable it in the settings ("Cloud AI"). The code action will show up for methods and functions. Please note that parts of your code will be send to the P42 AI server when you use it.

## 2.6.5 - 2022-12-02

### Fixed
- License commands did not work when extension was not activated already. Fixed.

## 2.6.4 - 2022-12-01

### Added
- "Enter License Key" and "Sync License" commands.

## 2.6.3 - 2022-11-29

### Fixed
- Context-specific commands were polluting the command palette. The commands have been removed from the palette. Thanks Steffen Holanger for the bug report!

## 2.6.2 - 2022-11-28

### Improved
- Experimental file dependency graph highlights circular dependencies.
- Better dark mode support in the experimental file dependency graph.
- File dependency graph considers re-export via `export *` as dependencies.

## 2.6.1 - 2022-11-27

### Changed
- "Convert named function declaration to variable declaration" menu entry changed to "Convert to 'const … = function(…)'".

## 2.6.0 - 2022-11-25

### Added
- You can open files from the experimental file dependency graph by double clicking a node.

## 2.5.0 - 2022-11-24

### Added
- "P42: Suggestion Safety" configuration setting. You can use it to disable unsafe suggestions. Thanks [@pdcmoreira](https://github.com/pdcmoreira) for the idea!

## 2.4.1 - 2022-11-18

### Fixed
- "Convert to for..of loop" was not working in some situations. Fixed.

## 2.4.0 - 2022-11-17

### Added
- Suggestion and mass refactoring support for the "Convert TypeScript private to #-private" refactoring.

### Fixed
- "Move constant to top-level scope" suggestions could not be applied. Fixed.
- "Extract React function component" did not work when union types were introduced. Fixed.
- "Move constant to top-level scope" was available for values that could be modified. Fixed.

## 2.3.0 - 2022-11-17

### Added
- "Convert #-private to TypeScript private" refactoring.

## 2.2.1 - 2022-11-16

### Added
- TypeScript 4.9 Support

## 2.2.0 - 2022-11-16

### Added
- Experimental "File Dependency Visualization". You can enable it in the settings. The action will show up in the context menu for folders. It is intended for `src` folders containing JavaScript and TypeScript sources.

## 2.1.1 - 2022-11-16

### Changed
- "Convert Type[] to Array\<Type\>" suggestions are off by default. They can be enabled in the settings.

### Fixed
- Line numbers in Assistant panel were 0-based. Fixed.

## 2.1.0 - 2022-11-15

### Added
- "Convert Type[] to Array\<Type\>" refactoring.

## 2.0.2 - 2022-11-15

### Fixed
- "Replace default value assignment expressions with default parameter values." not available as quick-fix under suggestion hint. Fixed.

## 2.0 - 2022-11-14
Thank you for choosing P42. Sadly, the freemium model of the P42 JS Assistant extension with a Free and a Pro plan has not been sustainable.

Therefore, **starting with version 2.0, the P42 JS Assistant extension requires a subscription**. The Free plan is no longer available.

If you want to keep using the free features without upgrading, you can continue to use the JS Assistant v1.165.2, which will remain available in the marketplace.

### Changed
- Turn off suggestions for "Merge if-statement into preceding if-statement" by default.

### Removed
- "Actions" view.

## 1.165.2 - 2022-11-13

### Added
- "Convert TypeScript private to #-private" refactoring (P42 Pro & Business).

## 1.165.1 - 2022-11-11

### Added
- Suggestions can be applied from the assistant panel without expanding them first.
- "Move constant to top level" refactoring is suggested (P42 Pro & Business).

## 1.165.0 - 2022-11-11

### Added 
- The assistant panel shows visible functions and methods and displays a large size indicator.

## 1.164.0 - 2022-11-09

### Added
- "File scan" editor view that can be opened from the suggestion panel.

### Changed
- Suggestion panel only shows suggestions for the currently visible editor lines. Use "Scan file" to open an editor with all suggestions.

## 1.163.3 - 2022-11-07

### Improved
- "Push down negation" suggestions.

### Fixed
- "Convert if-else to conditional expression" matched some incorrect patterns. Fixed. 

## 1.163.2 - 2022-11-07

### Fixed
- "Convert if-else to conditional expression" matched some incorrect patterns. Fixed. Thanks [@chandan192](https://github.com/chandan192) for the bug report!

## 1.163.0 - 2022-11-04

### Added
- "Merge if-statement into preceding if-statement" refactoring.

## 1.162.1 - 2022-11-04

### Improved
- "Convert if-else into conditional expression" supports additional cases. Thanks [@hediet](https://github.com/hediet) for the suggestion!

## 1.162.0 - 2022-10-30

### Added
- Suggestion badge on the suggestion view that shows the suggestion count. It can be configured in the settings. The suggestion view needs to be activated once after starting Visual Studio Code for the badge to appear.
- "Move interface member" code assist (P42 Pro & Business).

### Improved
- "Remove unnecessary conditional expression" and "Invert condition" suggestions.
- "Introduce early return / continue" suggestions (P42 Pro & Business).

## 1.161.0 - 2022-10-28

### Added
- "Move type member" code assist (P42 Pro & Business).

## 1.160.2 - 2022-10-27

### Changed
- More flexible selection matching.
- "Expand shorthand property" is available in the quickfix menu.
- "Select expression occurrences" and "Convert destructuring to regular variable declaration" are available in quick fix menu (P42 Pro & Business).

## 1.160.1 - 2022-10-27

### Improved
- "Convert to optional chaining" supports additional pattern.

## 1.160.0 - 2022-10-26

### Added
- "Simplify switch statement" code assist (P42 Pro & Business).

### Changed
- Renamed "Move destructured expression into separate statement" to "Extract destructured expression into separate variable declaration" code assist (P42 Pro & Business).

## 1.159.0 - 2022-10-25

### Added
- "Convert switch to if-else" code assist (P42 Pro & Business).

## 1.158.0 - 2022-10-25

### Changed
- Renamed extension.
- Bundled images for "Get Started" guide.

## 1.157.1 - 2022-10-22

### Changed
- "Move if-else-if branches" can be triggered with move shortcuts on the conditions of an if-else-if chain (P42 Pro & Business). Thanks [@hediet](https://github.com/hediet) for the suggestion!

## 1.157.0 - 2022-10-20

### Added
- Rename (✏️), Quick-Fix (🪄), Source Action (📄), and Refactor (🔧) touch bar buttons (Mac).

## 1.156.1 - 2022-10-20

### Improved
- Converting forEach loops for for-of converts return statements to continue statements.

## 1.156.0 - 2022-10-19

### Added
- "Add {…} to case" and "Remove {…} from case" refactoring that toggle braces on case clauses.

## 1.155.0 - 2022-10-18

### Added
- "Extract React Function Component" refactoring supports extracting components as arrow functions.

## 1.154.0 - 2022-10-18

### Added
- Configuration setting "Safety Analysis Visibility".

## 1.153.0 - 2022-10-17

### Changed
- Changed safety analysis emojis to 🟢 🔵 🟡 🔴.
- Enhanced "Get Started" guide.

## 1.152.8 - 2022-10-14

### Changed
- Hints for "Convert to destructuring assignment" are off by default.
- Changed safety analysis emojis to ✅ 🔵 🟡 🔴.

## 1.152.7 - 2022-10-13

### Added
- "Inline variable" suggestions when re-assigning identifier.

## 1.152.6 - 2022-10-10

### Changed
- "Surround with..." code assists are available as quick fix actions.

## 1.152.5 - 2022-10-07

### Fixed
- Actions view showed "Pro code" actions that could not be used. Fixed.

## 1.152.4 - 2022-10-04

### Changed
- Improved where "Split variable declaration and initialization" can be activated.
- Code action kind changed for "Replace assignment with return" code assist.

### Fixed
- Suggestion and license views were broken. Fixed.

## 1.152.3 - 2022-10-03

### Changed
- Updated activation ranges for "Add {}" and "Remove {}" code assists.
- Suggested code actions are shown as "Quickfix" in the quick fix context menu.

## 1.152.2 - 2022-10-03

### Changed
- Added "Configuration" and "Code Assist" pages to "Get Started" guide.
- "Get Started" guide cleanup.

## 1.152.1 - 2022-10-03

### Added
- "Code Assist Animation" configuration setting.

### Removed
- "Inapplicable Refactoring Visibility" configuration setting.

## 1.152.0 - 2022-10-03

### Changed
- "Inline" and "Extract" shortcuts performs actions immediately when possible.
- Improved where "Inline Variable" can be activated.
- Code action kind changed for "Invert condition" code assist.

### Removed
- "Convert…", "Extract…", "Inline…", "Inline", "Toggle {}", "Move Up", "Move Down", and "Move…" commands from the command palette.
- "Convert…", "Extract…", "Inline…", and "Move…" menu entries in the editor context menu.
- Keyboard shortcuts for "Convert", "Extract", "Inline", and "Move" context menus.
- Code action sections of the "Get Started" guide.

## 1.151.0 - 2022-09-27

### Changed
- P42 Pro licenses need to be active to use P42 Pro features. [Learn more](https://p42.ai/documentation/p42-for-vscode/license).

## 1.150.4 - 2022-09-21

### Fixed
- "Extract React function component" was not working with qualified name type arguments. Fixed.

## 1.150.3 - 2022-09-17

### Fixed
- "Convert let to const" was not working in for-in/for-of loops. Fixed. Thanks [@j4k0xb](https://github.com/j4k0xb) for the bug report!

## 1.150.1 - 2022-09-15

### Fixed
- Keyboard shortcut for "Toggle {}" was not shown in the command palette. Fixed.

## 1.150.0 - 2022-09-14

### Added
- "Actions" view that shows the available actions for the current cursor position or selection.

## 1.149.1 - 2022-09-09

### Fixed
- "Inline variable occurrence" (P42 Pro & Business) was available on variable declaration. Fixed.

## 1.149.0 - 2022-09-08

### Added
- "Inline variable occurrence" refactoring (P42 Pro & Business).

## 1.148.1 - 2022-09-08

### Improved
- "Move constant to top-level scope" (P42 Pro & Business) supports more patterns and moves the cursor / selection.

### Fixed
- "Extract React function component" did not work in cases where an arrow function was passed into the extract component. Fixed.

## 1.148.0 - 2022-09-07

### Added
- Keyboard shortcut to open the 'source action' context menu (Windows/Linux: `CTRL + ALT + S`, Mac: `CTRL + CMD + S`)
- All code action menus are available as commands and can be opened from the command palette as well. The code action keyboard shortcuts are mapped to commands.
- The "Inline", "Extract", "Convert", and "Move" context menus can be opened from the editor context menu.
- The "Get Started" guide contains a page that contains a keyboard shortcut overview.

### Changed
- The "Surround with try…catch", "Surround with if statement", and "Surround with <>…</>" code action kind has been changed to "refactor.surround.*". They show up in the refactor menu with other surround actions.

## 1.147.4 - 2022-09-07

### Fixed
- Changed "move up / move down" keyboard shortcuts on Windows and Linux to remove conflicts with default Visual Studio Code keyboard shortcuts. Move up is mapped to `Ctrl+Alt+U` and move down is mapped to `Ctrl+Alt+J` on Windows / Linux. Mac keyboard shortcuts have not changed. Thanks [@AndreaPontrandolfo](https://github.com/AndreaPontrandolfo) for the bug report!

## 1.147.2 - 2022-09-05

### Improved
- TypeScript 4.8 support.
- Better variable name suggestions when extracting variables.

### Fixed
- "Remove IIFE" was available on named function that refer to themselves. Fixed. Thanks [@AlexXanderGrib](https://github.com/AlexXanderGrib) for the bug report!

## 1.147.1 - 2022-09-02

### Improved
- "Remove braces from arrow function" is available as quick fix on the "return" keyword. Thanks [@hediet](https://github.com/hediet) for the suggestion!

### Changed
- Telemetry: record source of executed code assist (e.g., `quickFix`).

## 1.147.0 - 2022-09-02

### Improved
- Many move code assists support moving several selected code elements at once. Thanks [@hediet](https://github.com/hediet) for the suggestion!

## 1.146.5 - 2022-08-30

### Added
- Opt-in usage data collection (telemetry). [Learn more...](https://p42.ai/documentation/p42-for-vscode/configuration#telemetry).

## 1.146.4 - 2022-08-27

### Improved
- Added "Convert" and "Other" section to "Get Started" guide.

## 1.146.3 - 2022-08-27

### Improved
- Added "Move" section to "Get Started" guide.

## 1.146.2 - 2022-08-26

### Improved
- Added "Extract" and "Inline" sections to "Get Started" guide.

## 1.146.1 - 2022-08-25

### Improved
- Better "Add braces" activation ranges in if-else-if sequences.

## 1.146.0 - 2022-08-25

### Added
- "Remove braces" and "Add braces" code assists.
- "Toggle {}" keyboard shortcut.

### Changed
- Disabled entries are no longer shown in the refactor context menu that is opened with a shortcut.

## 1.145.0 - 2022-08-23

### Added
- "Convert to ++ / --" refactoring.

### Improved
- Refined safety analysis and suggestions for "Push operator into assignment" and "Pull operator out of assignment" refactorings.

## 1.144.0 - 2022-08-22

### Changed
- Changed all `refactor.convert.*` code action kinds into `refactor.rewrite.*` to match the categories from Visual Studio Code (***might break custom keyboard shortcuts***).
- Added refactorings to `refactor.move` and `refactor.rewrite` code action kinds (***might break custom keyboard shortcuts***).

### Improved
- P42 code actions in context menus are alphabetically sorted when possible.
- "Pull operator out of assignment" refactoring supports pulling operators out of property and array access expressions.

## 1.143.1 - 2022-08-22

### Fixed
- "Move nested if" did not always wrap nested if-else chains correctly in blocks. Fixed.

## 1.143.0 - 2022-08-21

### Added
- "Move nested if" refactoring.

### Improved
- Improved variable name guessing and activation ranges for the "Convert loop to for..of" and "Convert loop to .forEach" refactorings.
- "Convert loop to .forEach" replaces loop element variable when possible.

## 1.142.2 - 2022-08-19

### Changed
- The conflicting keybinding for "smart expand/shrink selection" has been removed. Thanks [@gregveres](https://github.com/gregveres) for the bug report!

## 1.142.1 - 2022-08-18

### Fixed
- "Select expression occurrences" did not always accurately select all expression ranges. Fixed.
- "Move statement" was not available inside variable declaration lists with a single declaration. Fixed.

## 1.142.0 - 2022-08-17

### Changed
- Simplified move shortcuts to use only a single move up / move down shortcut as well as a move context menu.

### Fixed
- The JS Assistant settings were not displayed correctly. Fixed.

## 1.141.5 - 2022-08-17

### Improved
- "Surround with if-statement" selects the condition and handles comments better.
- "Surround with try..catch" and "Insert else" action were not working. Fixed.

## 1.141.4 - 2022-08-16

### Changed
- The JavaScript Assistant does not change the keyboard shortcuts for smart selection on Windows/Linux. Thanks [@hediet](https://github.com/hediet) for the bug report!

## 1.141.2 - 2022-08-16

### Fixed
- "Split if statement on && and duplicate else" was not available. Fixed.
- "Extract JSX element" code assist was available with a selection. Fixed.
- "Extract variable" did not always wrap in JSX expressions when needed. Fixed.

## 1.141.1 - 2022-08-15

### Fixed
- "Action" context menu shortcut did not work on Windows/Linux (`Ctrl+Alt+a`). Fixed.
- "Convert" context menu shortcut in README was wrong. Fixed.

## 1.141.0 - 2022-08-13

### Added
- "Get Started" command that opens the "Get Started" walkthrough.

### Changed
- Keyboard shortcuts:
  - Updated move keyboard shortcuts on Windows / Linux.
  - Added remapped smart expand/shrink selection shortcuts.
  - Updated keyboard shortcut documentation.
- Updated "Get started" walkthrough.

## 1.140.1 - 2022-08-12

### Improved
- "Push operator into assignment" supports pushing operators into property and array access expressions.
- Added highlighting to more code assists.

## 1.140.0 - 2022-08-11

### Added
- "Move destructuring object property" code assist.
- Direct inline refactoring keyboard shortcut ("CTRL+CMD+SHIFT+I" on Mac, "CTRL+ALT+SHIFT+I" on Windows) that only shows the context menu when there is more than one available action.

### Improved
- Added highlighting to more code assists.

## 1.139.2 - 2022-08-10

### Improved 
- Added highlighting for "inline variable" and "extract variable" refactorings.

## 1.139.1 - 2022-08-10

### Improved
- Added highlighting for moved nodes. Thanks [@hediet](https://github.com/hediet) for the suggestion!

## 1.139.0 - 2022-08-10

### Added
- "Move destructuring array element" code assist.

### Improved
- "Merge nested if" recognizes mergeable nested if statements without blocks.

## 1.138.0 - 2022-08-09

### Added
- "Move variable declaration" refactoring (P42 Pro & Business). 

### Improved
- "Extract variable" provides better default name for extract private property access.
- "Move statement" supports moving import and export declarations.
- 15-20% analysis performance improvement.

## 1.137.0 - 2022-08-08

### Added
- "Move switch case" refactoring (P42 Pro & Business). Thanks [@hediet](https://github.com/hediet) for the refactoring idea!

### Fixed
- When moving large code blocks, the current cursor was sometimes hidden. Fixed. Thanks [@hediet](https://github.com/hediet) for the bug report!

## 1.136.1 - 2022-08-07

### Improved
- "Move property" supports moving methods, accessors, and spreads.
- "Move statement" supports moving declarations.

### Fixed
- "Move class member" added whitespace at the top of the class in some cases. Fixed.
- Refactorings sometimes omitted TypeScript experimental decorators. Fixed.

## 1.136.0 - 2022-08-07

### Added
- "Move class member" refactoring (P42 Pro & Business). Thanks [@hediet](https://github.com/hediet) for the refactoring idea!

### Improved
- Better activation ranges for move refactorings.

## 1.135.1 - 2022-08-07

### Fixed
- The refactoring context menu would show up for some move up/down/left/right operations. Fixed.

## 1.135.0 - 2022-08-06

### Added
- "Move object property" refactoring. Thanks [@hediet](https://github.com/hediet) for the refactoring idea!

## 1.134.0 - 2022-08-05

### Added
- "Move array element" refactoring. Thanks [@hediet](https://github.com/hediet) for the refactoring idea!

## 1.133.1 - 2022-08-05

### Fixed
- "Move statement" would sometimes add additional whitespace. Fixed. Thanks [@hediet](https://github.com/hediet) for the bug report!
- "Move statement" would sometimes appear more than once in the context menu. Fixed.

## 1.133.0 - 2022-08-04

### Added
- "Move JSX attribute" refactoring (P42 Pro & Business). Thanks [@hediet](https://github.com/hediet) for the refactoring idea!

## 1.132.3 - 2022-08-04

### Fixed
- Keyboard shortcuts were interfering with non-JS/TS filetypes. Fixed. Thanks [@serchserch](https://github.com/serchserch) for the bug report!

## 1.132.2 - 2022-08-03

### Added
- Move up / down / left / right keyboard shortcuts (`CTRL+ALT+UP/DOWN/LEFT/RIGHT`).

### Changed
- Code assist `move-if-else-if-branches` provides `refactor.move.left/right` code action kinds (***might break custom keyboard shortcuts***).

## 1.132.0 - 2022-08-03

### Added
- "Move statement" code assist. Thanks [@hediet](https://github.com/hediet) for the refactoring idea!

### Changed
- All code action kinds have been updated (***might break custom keyboard shortcuts***). You can find the new kinds in the [code assist documentation](https://p42.ai/documentation/code-assist).
- Renamed code assist `swap-if-else-if-branches` to `move-if-else-if-branches` (***configuration breaking change***). Its actions have been changed to "move up / move down". 

### Improved
- "Convert template literal to string" and "Convert string to template literal" keep original text selection.

## 1.131.0 - 2022-07-27

### Added
- "Swap if-else-if branches" refactoring (P42 Pro & Business). Thanks [@hediet](https://github.com/hediet) for the refactoring idea!

## 1.130.0 - 2022-07-27

### Added
- "Insert else" action.

## 1.129.0 - 2022-07-26

### Added
- "Surround with if-statement" action.

### Improved
- Actions that are not refactorings are not part of the refactoring context menu any more. They can be found in the 'actions' context menu. Their code assists ids have been changed (***might break custom keyboard shortcuts***):
  - "Insert console.log for variable": `action.insert.console-log`
  - "Select expression occurrences": `action.select.expression-occurrences`
  - "Surround with <>...</>": `action.surround-with.jsx-fragment`
  - "Surround with try…catch": `action.surround-with.try-catch`

### Fixed
- Mass refactoring sometimes led to the duplication of comments at the beginning of namespaces. Fixed.

## 1.128.2 - 2022-07-25

### Fixed
- "Extract variable" would not extract from for-loop headers. Fixed.
- "Remove unused variable" was active in vue.js script setup sections. Fixed. Thanks [@Idered](https://github.com/Idered) for the bug report!
- Files with TypeScript template literal types could sometimes not be processed. Fixed.

## 1.128.1 - 2022-07-19

### Improved
- Conflict detection during mass refactoring.

### Fixed
- Various bugs preventing code assists from being available.

## 1.128.0 - 2022-07-16

### Added
- "Convert destructuring to regular variable declaration" refactoring (P42 Pro & Business).

## 1.127.1 - 2022-07-15

### Improved
- Better extract variable name suggestions.

## 1.127.0 - 2022-07-14

### Added
- "Convert array.filter()[0] to array.find()" refactoring (P42 Pro & Business).

## 1.126.0 - 2022-07-13

### Added
- "Remove trailing array destructuring holes" code assist.

## 1.125.0 - 2022-07-12

### Changes
- Rename "Lift default into parameter" code assist to "Move default value into parameter".

### Added
- "Move destructured expression into separate statement" code assist (P42 Pro & Business).

### Fixed
- Cursor was moved in the "convert string to template literal" and "convert template literal to string" code actions. Fixed. Thanks [@hediet](https://github.com/hediet) for the bug report!

## 1.124.0 - 2022-07-11

### Added
- "Move const to top-level scope" code assist (P42 Pro & Business).

## 1.123.0 - 2022-07-10

### Improved
- "Remove unused variable" removes unused variables that are declared in destructuring expressions.

## 1.122.0 - 2022-07-08

### Improved
- "Inline Variable" can inline from inside array and object destructuring expressions.

## 1.121.4 - 2022-07-07

### Fixed
- "Extract variable" would sometimes suggest an empty variable name. Fixed.

## 1.121.3 - 2022-07-06

### Fixed
- "Convert to destructuring assignment" was sometimes available on optional chaining initializer expressions. Fixed. Thanks [@lixiaoyan](https://github.com/lixiaoyan) for the bug report!

## 1.121.2 - 2022-07-06

### Fixed
- "Merge variable declaration and initialization" was not available via context menu on the assignment. Fixed.

## 1.121.1 - 2022-07-05

### Fixed
- Code assists were sometimes showing up multiple times in the context menu. Fixed.

## 1.121.0 - 2022-07-05

### Added
- "Convert 'new Array(…)' to '[…]'" code assist (P42 Pro & Business). Thanks [@hediet](https://github.com/hediet) for the idea!
- "Inapplicable Refactoring Visibility" configuration setting. Default refactorings from VS Code that are not applicable (normally shown as disabled) can be hidden (P42 default).

### Improved
- Better variable name suggestions.

### Changed
- Code assists that have their suggestion display turned off in the configuration are not shown in the suggestion side panel.

## 1.120.4 - 2022-06-26

### Fixed
- "Convert loop to for…of" sometimes did not replace original expression inside loop during mass refactoring (P42 Pro & Business). Fixed. Thanks Manoj for the bug report!

## 1.120.3 - 2022-06-24

### Improved
- Updated walkthrough with more content.
- "Convert loop to .map()" converts to `.flatMap` when there is an inner spread expression (P42 Pro & Business). Thanks [@hediet](https://github.com/hediet) for the idea!

### Fixed
- "Convert loop to .map()" would sometimes incorrectly remove the first statement of the loop body (P42 Pro & Business). Fixed.

## 1.120.2 - 2022-06-22

### Improved
- Narrower activation ranges for the "add {} to arrow function" and "remove {} from arrow function" code actions. Thanks [@hediet](https://github.com/hediet) for the feedback!

## 1.120.1 - 2022-06-20

### Fixed
- Some script sections inside .vue files were not recognized (P42 Pro & Business). Fixed.

## 1.120.0 - 2022-06-19

### Improved
- "Introduce early return" supports introducing early `continue` inside loops (P42 Pro & Business).

### Fixed
- Code assists were not available in Vue.js 'script setup' sections (P42 Pro & Business). Fixed. Thanks [@Idered](https://github.com/Idered) for the bug report!

## 1.119.1 - 2022-06-17

### Changed
- Updated code action kinds for keybindings.

## 1.119.0 - 2022-06-17

### Added
- "Move" refactoring context menu ("CTRL+CMD+M" on Mac, "CTRL+ALT+M" on Windows).

### Changed
- Keyboard shortcuts have been changed to "CTRL+CMD+R/I/X/V/A" on Mac and "CTRL+ALT+R/I/X/V/A" on Windows (**breaking change**).

### Fixed
- "Extract const" would extract spread expressions. Fixed.
- "Extract const" would not preserve the original name of shorthand property assignments. Fixed.

## 1.118.0 - 2022-06-16

### Added
- "Overlapping Code Assist Visibility" setting. Thanks [@hediet](https://github.com/hediet) for the idea!

## 1.117.2 - 2022-06-15

### Fixed
- "Convert loop to .map()" was possible when there was a spread expression inside the push call (P42 Pro & Business). Fixed. Thanks [@hediet](https://github.com/hediet) for the bug report!

## 1.117.1 - 2022-06-15

### Improved
- "Extract variable" automatically creates blocks when needed (e.g. when extracting from an arrow function expression).

### Fixed
- "Push variable declaration into initial value" would drop TypeScript `?` parameter annotation (P42 Pro & Business). Fixed.
- "Extract variable" did sometimes not select the target scope that would have found most occurrences. Fixed.

## 1.117.0 - 2022-06-14

### Added
- "Select expression occurrences" action (P42 Pro & Business). Thanks [@hediet](https://github.com/hediet) for the idea!

## 1.116.2 - 2022-06-13

### Improved
- "Inline Variable" is suggested in additional cases.

### Fixed
- "Inline Variable" would sometimes change the string quote type. Fixed.
- "Inline Variable" would sometimes not preserve the inner formatting and comments of inlined expressions. Fixed.

## 1.116.1 - 2022-06-13

### Fixed
- "Inline Variable" would sometimes not work when parentheses were inserted. Fixed.

## 1.116.0 - 2022-06-12

### Added
- "Convert loop to .map()" refactoring (P42 Pro & Business).

## 1.115.1 - 2022-06-11

### Improved
- Expose code action id in code action kind to enable setting up custom keyboard shortcuts. Thanks [@OliverJAsh](https://github.com/OliverJAsh) for the suggestion!

## 1.115.0 - 2022-06-10

### Improved
- TypeScript 4.7 support (including .mts and .cts extensions)

## 1.114.0 - 2022-06-09

### Added
- "Flatten array rest/spread property" cleanup (P42 Pro & Business).

## 1.113.0 - 2022-06-08

### Added
- "Push variable declaration into initial value" refactoring (P42 Pro & Business).

### Improved
- Default visibility for all suggestions is "hint".

## 1.112.3 - 2022-06-06

### Fixed
- "Add/Remove braces to arrow function" refactoring from the TypeScript language service was shown in addition to "Add/Remove {...} to arrow function" refactoring. The TypeScript language service refactorings are hidden when the JS Assistant is active (except when running in the browser). Thanks [@hediet](https://github.com/hediet) for the bug report!

## 1.112.2 - 2022-06-05

### Fixed
- Parentheses were sometimes incorrectly removed or not inserted in several refactorings. Fixed.

## 1.112.0 - 2022-06-04

### Added
- "Replace with existing variable" refactoring (P42 Pro & Business). Thanks [@hediet](https://github.com/hediet) for the refactoring idea!

## 1.111.2 - 2022-06-03

### Improved
- Reduced activation range for "Move field initialization into constructor" refactoring. Thanks [@hediet](https://github.com/hediet) for the bug report!

## 1.111.1 - 2022-06-02

### Improved
- "Convert array.indexOf() into array.includes()" converts non-inclusion checks to `!array.includes(..)`.

## 1.111.0 - 2022-05-31

### Added
- "Introduce early return" refactoring (P42 Pro & Business). Thanks [@hediet](https://github.com/hediet) for the refactoring idea!

## 1.110.0 - 2022-05-29

### Added
- "Move initialization into field declaration" refactoring (P42 Pro & Business). Thanks [@hediet](https://github.com/hediet) for the refactoring idea!

## 1.109.2 - 2022-05-27

### Improved
- "Inline variable" shows an error when trying to inline an expression containing `this` into a different function context.

## 1.109.1 - 2022-05-26

### Fixed
- When there were nested arrow functions, add/remove braces would show up several times in the refactoring context menus. Fixed. Thanks [@hediet](https://github.com/hediet) for the bug report!

## 1.109.0 - 2022-05-25

### Added
- "Move field initialization into constructor" refactoring (P42 Pro & Business). Thanks [@hediet](https://github.com/hediet) for the refactoring idea!

## 1.108.6 - 2022-05-24

### Improved
- Array loop conversions work on complex array expressions, not just on variables. Thanks [@hediet](https://github.com/hediet) for the improvement idea!

## 1.108.5 - 2022-05-24

### Fixed
- "Extract React function component" did not work with some TypeScript types. Fixed.

## 1.108.4 - 2022-05-23

### Improved
- Better menu item labels for code assists that add or remove braces.

### Fixed
- "Extract variable" did not automatically add braces when extracting strings from JSX attributes. Fixed.

## 1.108.3 - 2022-05-22

### Improved
- "Split variable declaration and initialization" works inside switch case and default blocks.
- "Convert function to object method" supports generator functions and evaluates safety.

### Fixed
- "Extract variable" extracted assignment targets and expressions with shadowed bindings in some situations. Fixed.

## 1.108.2 - 2022-05-15

### Improved
- "Remove unnecessary conditional expression" documentation, highlighting, and safety analysis.
- "Remove double negation" highlighting.

### Fixed
- Inline into delete expressions was not working. Fixed.

## 1.108.0 - 2022-05-14

### Improved
- "Convert to destructuring assignment" supports more patterns and makes suggestions.

## 1.107.0 - 2022-05-13

### Added
- "Merge into previous destructuring assignment" refactoring.

### Improved
- "Flip operator" refactoring supports `+`, `*`, and binary operators.

### Fixed
- The P42 suggestion panel did not always update when it became visible after being hidden. Fixed.

## 1.106.1 - 2022-05-11

### Improved
- Better handling of shadowed hoisted variables and functions inside catch clauses.

### Fixed
- P42 did not start for some users on Visual Studio Code 1.67. This was caused by storage migrations in Visual Studio Code 1.67. Fixed. **You might need to re-enter your P42 license key**. 

## 1.106.0 - 2022-05-09

### Added
- "Replace void 0 with undefined" cleanup.

### Improved
- "Convert string comparison chain to array.includes" refactoring supports more patterns.
- "Remove IIFE/IIAF" refactoring support more patterns.
- "void 0" recognized as alias for `undefined`.

## 1.105.1 - 2022-05-08

### Fixed
- "Inline variable" did not inline boolean and null values correctly. Fixed.

## 1.105.0 - 2022-05-06

### Improved
- "Convert string comparison chain to array.includes" refactoring supports negated string comparison expressions.

### Changed
- Rename `convert-or-equal-chain-to-array-includes` refactoring to `convert-comparison-chain-to-array-includes` (**configuration breaking change**).

## 1.104.0 - 2022-05-05

### Added
- "Convert string comparison chain to array.includes" refactoring.

### Changed
- Rename `use-array-includes` refactoring to `convert-array-index-of-to-array-includes` (**configuration breaking change**).

## 1.103.1 - 2022-05-05

### Improved
- "Inline variable" is only available as a quick fix when suggestion. It is always available in the refactoring or inline context menus.
- "Inline variable" safety analysis improvements.

### Fixed
- Refactorings sometimes dropped optional chaining expressions, e.g. when inlining a variable. Fixed.

## 1.103.0 - 2022-05-04

### Changed
- Replaced "Use optional chaining" refactoring with new "Convert to optional chaining refactoring" (**configuration breaking change**). The new refactoring supports safety analysis and more patterns, but is limited to a single optional chain element and needs to be invoked multiple times for longer chains.

## 1.102.0 - 2022-05-01

### Improved
- Better code highlighting of relevant areas.

## 1.101.0 - 2022-04-29

### Added
- Code highlighting when the mouse cursor is inside a suggestion in the P42 sidepanel.

### Improved
- Click on selected item in P42 sidepanel reveals code in editor (scrolling if necessary).

## 1.100.0 - 2022-04-28

### Added
- "Convert to destructuring assignment" refactoring.

## 1.99.1 - 2022-04-25

### Improved
- "Extract variable" places the variable declaration immediately before the first occurrence statement.
- "Extract variable" suggests better variable names when extracting identifiers and property access expressions.

### Fixed
- "Extract variable" did change unrelated identifiers and shadowed variables when extracting identifiers. Fixed.

## 1.99.0 - 2022-04-25

### Changed
- Replaced "Move statement out of if-else" refactoring with new "Move first statement out of if-else" and "Move last statement out of if-else" refactorings (**configuration breaking change**).

### Improved
- "Merge variable declaration and initialization" works in case and default blocks of switch statements.
- "Remove empty if block" and "Remove empty else block" show information and do not suggest refactoring when there are comments inside the block.
- "Convert let to const" can be activated over the variable name.
- Log mass refactoring time in seconds (P42 Pro & Business).

### Fixed
- "Collapse JSX Element" was collapsing elements with whitespace that does not get removed by JSX. Fixed.
- `import pkg = require('package');` was not correctly recognized in TypeScript matching. Fixed.

## 1.98.0 - 2022-04-21

### Added
- "Convert && to if statement" refactoring.

### Improved
- Mass refactoring shows progress message for every 50 analyzed files (P42 Pro & Business).

### Fixed
- Mass refactoring applied matches that were not suggested. Fixed. Only suggested matches are applied (P42 Pro & Business).

## 1.97.0 - 2022-04-20

### Added
- "Convert loop to for..of" supports converting `anArray.forEach` to a for..of loop.

## 1.96.3 - 2022-04-20

### Fixed
- Removing unused variables was not accurate inside typescript module declarations. Fixed.

### Changed
- Show "Remove unused variable" suggestions as hint.

## 1.96.2 - 2022-04-17

### Improved
- Better identification of potential global variables through script/module detection.

## 1.96.0 - 2022-04-15

### Added
- "Remove unused variable" cleanup.

### Improved
- Better warnings when editing tagged template literals.
- Per-file exclusion information no longer shown during mass refactoring (just the overall exclusion patterns).

### Fixed
- Paths with "." were not correctly excluded when using p42.toml exclusion paths. Fixed.

## 1.95.5 - 2022-04-14

### Fixed
- No code actions were available in github.dev environments. Fixed.

## 1.95.4 - 2022-04-14

### Changed
- Switched from VS Code glob pattern to minimatch glob pattern (**configuration breaking change**).

### Improved
- Log file exclusions during mass refactoring (P42 Pro & Business).

### Fixed
- Broken 'p42.toml' configuration files lead to crashes. Fixed.

## 1.95.2 - 2022-04-13

### Fixed
- Refactorings where not working on vscode.dev when opening a folder. Fixed.

## 1.95.1 - 2022-04-13

### Improved
- "Extract variable" supports more cases and prevents some invalid extractions.

## 1.95.0 - 2022-04-13

### Added
- Vue.js Single File Component support (P42 Pro & Business).

### Improved
- "Flip operator" safety messages.
- Better mass refactoring log output (P42 Pro & Business).

## 1.94.5 - 2022-04-12

### Improved
- Improved safety analysis for "inline variable".
- Improved performance of side bar content and code action calculation.

### Fixed
- "Inline variable" crashed when a variable was referenced in its own initializer. Inlining is not possible in that case.

## 1.94.4 - 2022-04-12

### Improved
- Increased language server stability.

## 1.94.3 - 2022-04-12

### Fixed
- "Convert let to const" was possible when the variable was not initialized. Fixed.
- "Convert template literal to string" was possible inside tagged template expressions. Fixed.
- "Remove Unnecessary Conditional Expression" was suggested when the change was unsafe. Fixed.
- "Split Variable Declaration and Initialization" was marked as safe in TypeScript code without type annotations. Fixed.
- "Inline Variable" did not work with regular expression literals. Fixed.

## 1.94.2 - 2022-04-11

### Fixed
- "Inline variable" safety analysis led to crashes in some cases. Fixed.
- "Convert .apply() to Spread Syntax" was not showing suggestions. Fixed.

## 1.94.1 - 2022-04-10

### Improved
- Improved safety analysis and suggestions for "inline variable".

### Fixed
- Suggestion sidebar panel would sometimes not contain the suggestions for the current editor after a VS Code restart. Fixed.

## 1.94.0 - 2022-04-09

### Changed
- Updated safety messages and levels.

## 1.93.1 - 2022-04-09

### Fixed
- "Convert named function to function expression" did not handle the `export` modifier correctly. Fixed.

## 1.93.0 - 2022-04-06

### Added
- "Remove console.log" action

## 1.92.2 - 2022-04-06

### Improved
- `_.forEach` replacement is suggested for arrays and is available in more cases (P42 Pro & Business).

## 1.92.1 - 2022-04-04

### Changed
- Safety analysis and all refactoring suggestions are available in P42 Free.

## 1.92.0 - 2022-04-04

### Added
- "Convert named function to function expression" refactoring.

## 1.91.1 - 2022-04-04

### Fixed
- Some lines of multi-line template literals were sometimes indented after extracting text. Fixed.

## 1.91.0 - 2022-04-03

### Improved
- "Inline into template" supports inlining template literals into template literals.

## 1.90.0 - 2022-04-03

### Improved
- "Extract selected text" refactor supports extracting text and included expressions from template literals.

## 1.89.1 - 2022-04-02

### Improved
- Lodash replacement refactoring activation ranges and documentation (P42 Pro & Business).

## 1.89.0 - 2022-04-01

### Added
- "Replace _.each and _.forEach" refactoring (P42 Pro & Business).

## 1.88.5 - 2022-03-31

### Improved
- ~20% performance improvement.
- Better performance on incremental changes.
- Increased resiliency to crashes.

### Fixed
- Crashed when showing diff view. Fixed.

## 1.88.4 - 2022-03-29

### Improved
- 4-8x performance improvement.

## 1.88.3 - 2022-03-27

### Improved
- Better performance on incremental changes.

## 1.88.2 - 2022-03-26

### Improved
- ~20% performance improvement.

## 1.88.0 - 2022-03-18

### Added
- Get started page with documentation links.

## 1.87.4 - 2022-03-16

### Changed
- Default suggestion display level changes:
  - "Remove {...} from Arrow Function": `off`
  - "Remove Empty If Block": `warning`
  - "Remove Empty Else Block: `warning`
  - "Remove Redundant Else If": `information`
  - "Remove Unnecessary Conditional Expression": `information`
  - "Remove Unnecessary Expression Statement": `information`
  - "Remove Unnecessary JSX Fragment": `information`
  - "Remove Unnecessary Template Literal": `information`
  - "Simplify Binary Expression": `information`

## 1.87.3 - 2022-03-15

### Added
- TypeScript 4.6 support.

### Improved
- Convert if-else to conditional expression supports if statements without blocks.

## 1.87.2 - 2022-03-14

### Improved
- Surround with try..catch shows an error indicator when the surrounded statements declare variables that are used outside of the introduced block.
- Improved whitespace handling when there are empty lines and comments in between statements.

## 1.87.1 - 2022-03-12

### Fixed
- Diagnostic information did not include a quick fix action. Fixed.

### Improved
- Surround with try..catch selects a non-colliding error variable name and places the cursor inside the catch block.

## 1.87.0 - 2022-03-09

### Improved
- The code analysis runs in a web worker or in a separate node process (depending on environment).

## 1.86.3 - 2022-03-02

### Fixed
- Inline Variable did not work correctly with `new` expressions that have type arguments. Fixed.
- Inline variable did not warn when removing an export. Fixed.

## 1.86.2 - 2022-03-01

### Fixed
- Inline Variable was sometimes producing incorrect results in files with a `\r\n` line separator. Fixed. Thanks [@skt-t1-byungi](https://github.com/skt-t1-byungi) for the bug report!

## 1.86.1 - 2022-02-24

### Fixed
- Multiple workspace folders were not supported. Fixed. Thanks [@pru-brennaveen](https://github.com/pru-brennaveen) for the bug report!

## 1.86.0 - 2022-02-21

### Changed
- Refactorings suggestions are shown as hints (underline with three dots) by default. You can configure them to other levels (e.g., information or warning) in the Visual Studio Code settings for P42.

## 1.85.0 - 2022-02-21

### Improved
- "Remove Unnecessary Else" can be activated more easily.
- "Remove Unnecessary Else" supports cases that require the introduction of a return statement.
- "Remove Unnecessary Else" suggestion heuristic has been refined.

### Fixed
- "Remove Unnecessary Else" was only working for the first if statement in a block. Fixed.

### Changed
- Renamed "Remove Redundant Else" to "Remove Redundant Else If"
- Renamed `convert-if-else-to-guard-clause` to `remove-unnecessary-else` (**configuration breaking change**)

## 1.84.3 - 2022-02-19

### Improved
- Search in mass refactoring dialog matches on description and detail texts. You can e.g. search for 'ES2015' to see all ES2015 modernizations.
- 'Merge declaration and initialization' highlighting and quick fix activation covers left hand side of assignment expression.

## 1.84.2 - 2022-02-19

### Fixed
- Unrelated comments were sometimes duplicated during mass refactoring. Fixed.
- Unrelated whitespace was sometimes lost during mass refactoring. Fixed.

## 1.84.1 - 2022-02-18

### Fixed
- Unrelated comments were sometimes broken or lost during mass refactoring. Fixed.

## 1.84.0 - 2022-02-18

### Improved
- Added `||` support to "Split If" refactoring

### Changed
- Separated "Split If Statement" refactoring into "Split If" and "Separate Repeated Condition into Nested If-Else" refactorings
- Changed indicator for behavior changes to ⛔

## 1.83.2 - 2022-02-16

### Fixed
- The whitespace inside multi-line templates was sometimes changed when the indentation of the template changed. Fixed.
- "Push Parameter into IIFE/IIAF" was recommended for named function expressions that called themselves. Fixed.

## 1.83.1 - 2022-02-15

### Improved
- "Remove template unnecessary template expression" refactoring can be invoked when unsafe.
- "Split if statement" refactoring supports if statements without else-if and can be invoked when unsafe.
- Limited "Split Variable Declaration and Initialization" activation area to text before (excluding) initializer.
- Changed loop conversion activation zones to the loop head (everything except its body).

### Changed
- Renamed "Separate Condition into Nested If" into "Split If Statement".

## 1.83.0 - 2022-02-10

### Added
- "Merge Variable Declaration and Initialization" refactoring

## 1.82.0 - 2022-02-09

### Added
- "Split Variable Declaration and Initialization" refactoring

## 1.81.2 - 2022-02-08

### Changed
- Updated documentation.

## 1.81.1 - 2022-02-08

### Changed
- Introduced cleanup refactoring category and modernization flag. Improved display of refactoring category in mass refactoring dialog.

### Fixed
- Items in mass refactoring dialog were unsorted. Fixed. They are sorted by label.

## 1.81.0 - 2022-02-06

### Added
- Configuration: `p42.toml` supports `[platform] ecmaScriptVersion` setting. Possible values are `ES5`,`ES2015`, `ES2016`, `ES2017`, `ES2018`, `ES2019`, `ES2020`, `ES2021`, `ES2022`, `ESNEXT` (default). Refactorings and code modernizations that target ECMAScript versions newer than the version from the configuration will be disabled. Thanks [@tdeekens](https://github.com/tdeekens) for the feature suggestion!

## 1.80.0 - 2022-02-03

### Changed
- Renamed several code actions.
- Shortened code action labels in context menu.
- Expanded and reworded diagnostic message texts. Included safety information in diagnostic messages.
- Reworked suggestion panel UI.
- Improved output logging when applying safe suggestions.
- Removed selection panel.

## 1.79.0 - 2022-01-31

### Added
- "Convert template literal to string" code action.

### Changed
- Renamed "Replace String Concatenation with Template Literal" to "Merge String Concatenation".

## 1.78.1 - 2022-01-31

### Fixed
- "Push parameter into IIFE/IIAF" incorrectly identified some function calls as IIFEs. Fixed. Thanks [@chandan192](https://github.com/chandan192) for the bug report!

## 1.78.0 - 2022-01-30

### Added
- Configuration: `p42.toml` supports `excludedPathPatterns`. It can be configured as an array of glob strings. If a file matches one of the paths in the glob strings, it will be excluded from editor and mass refactorings. If not configured, the exclusion glob strings are `**/dist/**` and `**/node_modules/**`. Thanks [@mjunker](https://github.com/mjunker) for the feature suggestion!

### Improved
- Mass refactoring shows refactored files and safety warnings in output.

## 1.77.2 - 2022-01-28

### Fixed
- The "Convert let to const" refactoring incorrectly detected variables that were re-assigned in for..of and for..in initializer as constant. Fixed. Thanks [@domoritz](https://github.com/domoritz) for the bug report!

## 1.77.1 - 2022-01-28

### Changed
- Rename 'pull-parameter-into-iife' to 'push-parameter-into-iife' (**breaking change**).

## 1.77.0 - 2022-01-28

### Added
- "Pull parameter into IIFE/IIAF" refactoring.

## 1.76.0 - 2022-01-27

### Improved
- "Remove IIFE" supports functions and arrow functions with multi-line block bodies (unless they have return statements or parameters).
- "Remove IIFE" safety analysis.
- "Remove IIFE" is recommended when safe.

## 1.75.0 - 2022-01-26

### Improved
- Better variable name generation for index and element variables.

### Changed
- Renamed "Current Selection" view to "Selection".

## 1.74.0 - 2022-01-25

### Added
- "Convert for..of loop to regular for loop with index variable" refactoring.

### Fixed
- Suggestions would not automatically updated when a license was entered or cleared. Fixed.

## 1.73.1 - 2022-01-24

### Fixed
- Refactorings that are known to introduce errors were shown in P42 Free when no advanced safety information is available. Those refactorings are limited to P42 Pro.

### Changed
- Renamed "Authentication" to "License" and improved view content.

## 1.73.0 - 2022-01-23

### Changed
- Advanced safety analysis and Advanced Suggestions are a P42 Pro feature. Basic safety analysis (safe / unknown) and basic suggestions (when the refactoring is safe) are a P42 Free feature.

## 1.72.2 - 2022-01-23

### Added
- "Suggestions" view "Documentation" and "Settings" toolbar buttons.
- "Current Selection" view "Settings" toolbar button.

## 1.72.1 - 2022-01-23

### Fixed
- Selecting an item in the "Suggestions" view only work on the second click. Fixed.

## 1.72.0 - 2022-01-21

### Added
- Refactorings suggestions can be configured in the Visual Studio Code settings. For each refactoring, the diagnostics severity (hint, information, warning, error) can be set, and the refactoring suggestion can be turned off. Thanks [@trasherdk](https://github.com/trasherdk) for the feature suggestion!

## 1.71.0 - 2022-01-20

### Added
- "Convert Loop to For..Of" automatically introduces an element variable if it does not exist. Thanks [@chandan192](https://github.com/chandan192) for the feature suggestion!

## 1.70.1 - 2022-01-19

### Added
- "Convert Loop to ForEach" starts rename when element variable was introduced

## 1.70.0 - 2022-01-19

### Added
- "Convert Loop to ForEach" can convert `for..of` loops to `Array.forEach()`
- "Convert Loop to ForEach" can convert `for` loops to `Array.forEach()` with an index variable

### Fixed
- Performance degraded when making many changes in a row. Fixed.

## 1.69.0 - 2022-01-18

### Added
- "Convert string to template literal" refactoring.
- "Replace _.some with Array.some" modernization (P42 Pro & Business).
- "Replace _.every with Array.every" modernization (P42 Pro & Business).

## 1.68.2 - 2022-01-15

### Fixed
- `p42.toml` changes were only reflected in JS/TS editors after re-opening the editor or changing its content. Fixed. Thanks [@trasherdk](https://github.com/trasherdk) for the bug report!

## 1.68.1 - 2022-01-14

### Fixed
- Shadowing of 'undefined' and 'NaN' led to false matches. Fixed.
- Global properties with side-effects led to false matches. Fixed.

## 1.68.0 - 2022-01-12

### Added
- "Remove IIFE" cleanup.
- "Replace _.filter with Array.filter" modernization (P42 Pro & Business).
- "Replace _.noop with arrow function" modernization (P42 Pro & Business).

## 1.67.0 - 2022-01-07

### Added
- "Replace _.map with Array.map" modernization (P42 Pro & Business).

## 1.66.0 - 2022-01-03

### Added
- "Apply safe suggestions" command (P42 Pro & Business).

## 1.65.0 - 2022-01-03

### Added
- "Suggestions" tab in the P42 sidebar.

## 1.64.4 - 2022-01-01

### Fixed
- Current selection sidebar view did not always update and keep its state. Fixed.

## 1.64.3 - 2021-12-29

### Changed
- "Mass Refactor" for files and folders requires a P42 Pro or Business license.

## 1.64.2 - 2021-12-27

### Fixed
- "Convert if-else to switch" was not working for `||` conditions. Fixed. Thanks [@chandan192](https://github.com/chandan192) for the bug report!
- "Convert if-else to conditional expression" was not working for array element assignments. Fixed. Thanks [@chandan192](https://github.com/chandan192) for the bug report!

## 1.64.1 - 2021-12-22

### Fixed
- "Inline variable" did not properly retain a shorthand expression when inlining. Fixed.

## 1.64.0 - 2021-12-20

### Added
- "Add Braces to JSX Attribute" refactoring.
- "Remove Braces from JSX Attribute" refactoring.

### Changed
- Use "{...}" in add/remove arrow function braces refactoring descriptions.

## 1.63.0 - 2021-12-20

### Added
- "Convert let to const" refactoring.

### Changed
- Renamed "Replace var with let and const" to "Convert var to let & const"

## 1.62.0 - 2021-12-20

### Added
- "Remove unnecessary conditional expression" cleanup.

## 1.61.0 - 2021-12-19

### Added
- "Convert if-else to switch" refactoring. Thanks [@chandan192](https://github.com/chandan192) for the suggestion!

### Changed
- "Invert Condition" refactoring is available as quick fix even when not suggested.

## 1.60.2 - 2021-12-18

### Added
- "Documentation" command (available in P42 sidebar) that opens the P42 for VS Code documentation in the browser

### Improved
- "Extract React Function Component" warns when extracted JSX contains reference to 'this'.
- "Surround with JSX Fragment" is indicated as safe.

## 1.60.1 - 2021-12-18

### Fixed
- "Extract React Function Component" refactoring for JSX fragments was available on all children. Fixed.

## 1.60.0 - 2021-12-18

### Improved
- The "Extract React Function Component" refactoring supports extracting JSX fragments and self-closing elements, and it does not need a text selection any longer.

## 1.59.0 - 2021-12-17

### Added
- "Expand self-closing JSX element" action
- "Collapse empty JSX element" action

## 1.58.0 - 2021-12-09

### Added
- Sidebar that shows the actions that are available at the current cursor position.

## 1.57.1 - 2021-12-08

### Improved
- "Remove Double Negation" marks removal in condition as safe.

### Fixed
- "Flip operator" and "Pull Up Negation" safety analysis was not considering change of return value for short-circuiting operators. Fixed.

## 1.57.0 - 2021-12-07

### Added
- "Surround with <>...</>" action.

### Improved
- "Convert If-Else into Conditional Expression" supports converting assignments to properties such as `a.prop` and `this.prop`. Thanks [@chandan192](https://github.com/chandan192) for the suggestion!

## 1.56.2 - 2021-12-06

### Fixed
- Rename variable was not always invoked after extract refactorings. Fixed.

## 1.56.1 - 2021-12-05

### Changed
- "Extract Substring" supports extraction from simple (no substitution) template literals.

### Fixed
- "Extract Substring" converted escaped characters into their unescaped form. Fixed.

## 1.56.0 - 2021-12-04

### Changed
- The extract refactorings propose a variable name and trigger an inline rename after the refactoring has been completed.
- "Inline variable" refactoring supports inlining `var` variables that are not re-assigned.
- "Inline variable" refactorings marks inlining literals and literal-only expressions as safe.

## 1.55.1 - 2021-12-01

### Fixed
- "Inline Variable" inlined variable into return type signature. Fixed.

## 1.55.0 - 2021-11-30

### Added
- "Extract JSX element into React Function Component" refactoring

## 1.54.0 - 2021-11-29

### Added
- "Remove unnecessary expression statement" cleanup

## 1.53.3 - 2021-11-28

### Fixed
- Escaped characters for strings and templates for incorrectly expanded in "Inline Variable" and "Inline into Template" refactorings. Fixed.

## 1.53.2 - 2021-11-27

### Changed
- Improved comment and whitespace handling when applying refactorings.
- Improved messaging for "push down negation" hints.
- Upgraded engine to TypeScript 4.5.

### Fixed
- "Remove braces from arrow function" was not working when boolean literals were returned. Fixed.
- "Inline return" was incorrectly removing return expressions when the value was a parameter. Fixed.

## 1.53.1 - 2021-11-24

### Changed
- Disabled "invert condition" recommendations.
- Smaller highlight ranges for
  - "add numeric separator"
  - "convert bracket notation property access to dot notation"
  - "convert conditional expression to if else"
  - "remove empty if block"
  - "remove empty else block"

## 1.53.0 - 2021-11-22

### Added
- "Remove unnecessary template literal" cleanup

## 1.52.2 - 2021-11-19

### Changed
- "Collapse property into shorthand" highlight ranges
- "Invert condition" highlight ranges

## 1.52.1 - 2021-11-18

### Changed
- "Invert condition" does not suggest inverting negated conditions for nullish comparisons in conditional expressions any more.

## 1.52.0 - 2021-11-18

### Changed
- "Invert condition" suggests inverting negated conditions.

### Fixed
- "Inline variable" did not work for 'this'. Fixed.

## 1.51.1 - 2021-11-17

### Fixed
- "Lift statement out of if-else" suggested that lifting first statement out of if-else was safe. Fixed.

## 1.51.0 - 2021-11-17

### Added
- "Lift statement out of if-else" refactoring

### Improved
- "Convert Math.pow to exponentiation" safety analysis and highlighting
- "Remove unnecessary JSX fragment" highlighting

### Fixed
- "Convert if-else statement to guard clause" suggestions were not shown. Fixed.
- Comments were duplicated in some cases. Fixed.

## 1.50.6 - 2021-11-16

### Fixed
- Suggestions were calculated for code areas with parse errors. Fixed.

### Improved
- Increased precision for "lift default value into parameter" code action.

## 1.50.5 - 2021-11-10

### Fixed
- "Inline return" created invalid suggestions that lead to dead code in some situations. Fixed. Thanks [@chandan192](https://github.com/chandan192) for the bug report!

## 1.50.4 - 2021-11-06

### Fixed
- Some code actions were shown multiple times in the context menu. Fixed.

## 1.50.3 - 2021-11-06

### Fixed
- "Inline return" created invalid suggestions in some situations. Fixed & performance improved. Thanks [@jheer](https://github.com/jheer) for the bug report!

## 1.50.0 - 2021-11-02

### Added
- "Remove unnecessary JSX fragment" cleanup

## 1.49.0 - 2021-11-01

### Added
- "Use Array.includes()" modernization

### Changed
- Refined activation zones and quick fix availability (not all refactorings are quick fixes any longer)

## 1.48.0 - 2021-10-26

### Added
- "separate condition into nested if-else" refactoring

## 1.47.0 - 2021-10-26

### Added
- "Remove redundant else" cleanup

## 1.46.6 - 2021-10-26

### Changed
- Improved safety information for "flip-operator"

## 1.46.4 - 2021-10-25

### Changed
- Bugfix: prevent "push-operator-into-assignment" when commutative operation is not possible (e.g. on strings). Thanks [@franck-paul](https://github.com/franck-paul) for the bug report!

## 1.46.0 - 2021-10-23

### Added
- Indicate when refactorings are safe.

## 1.45.0 - 2021-10-21

### Added
- "Remove empty if block" cleanup

## 1.44.0 - 2021-10-21

### Added
- "Remove empty else block" cleanup

## 1.43.0 - 2021-10-20

### Added
- "action" context menu

## 1.42.0 - 2021-10-20

### Added
- "Insert console.log" action

## 1.41.0 - 2021-10-20

### Added
- "Convert conditional expression to if-else statement" refactoring

## 1.40.0 - 2021-10-15

### Added
- Convert context menu
  - Mac: `CMD + SHIFT + V`
  - Windows / Linux: `ALT + SHIFT + V`
- "Add braces to arrow function" refactoring
- "Remove braces from arrow function" refactoring

## 1.39.0 - 2021-10-14

### Added
- "Inline into template" refactoring

## 1.38.0 - 2021-10-13

### Added
- Keyboard shortcuts for refactoring context menu, inline context menu, extract context menu

## 1.37.0 - 2021-10-13

### Changed
- 'convert-if-else-to-conditional-expression' converts when there are nested ternaries
- 'convert-if-else-to-conditional-expression' converts assignments
- Rename 'convert-if-else-to-conditional' to 'convert-if-else-to-conditional-expression' (**breaking change**)

## 1.36.0 - 2021-10-12

### Added
- "Remove double negation" refactoring

## 1.35.0 - 2021-10-11

### Added
- "Pull up negation" refactoring

### Changed
- Rename 'push-down-not-operator' to 'push-down-negation' (**breaking change**)

## 1.33.0 - 2021-10-05

### Added
- Detailed safety levels (safe, info, warn, error) on transformation suggestions.

## 1.32.0 - 2021-10-04

### Added
- "Simplify binary expression" refactoring

## 1.31.0 - 2021-10-01

### Added
- "Convert dot notation property access to bracket notation" refactoring

## 1.30.0 - 2021-09-30

### Added
- "Convert bracket notation property access to dot notation" refactoring

## 1.29.0 - 2021-09-29

### Changed
- `inline-return` inlines individual assignments

## 1.28.0 - 2021-09-27

### Added
- `// p42:ignore-file` comment before the first code line disables analysis on the full file

## 1.27.0 - 2021-09-27

### Added
- Refactoring and code action documentation at https://p42.ai/documentation/code-assist/
- Links from diagnostics to code action documentation

### Changed
- Rename 'add-numeric-separators' to 'add-numeric-separator' (**breaking change**)
- Rename 'return-ternary' to 'convert-if-else-to-conditional' (**breaking change**)
- Rename 'arrow-function' to 'convert-function-to-arrow-function' (**breaking change**)
- Rename 'merge-nested-else' to 'merge-nested-else-if' (**breaking change**)
- Rename 'convert-to-for-of-loop' to 'convert-loop-to-for-of' (**breaking change**)
- Rename 'convert-to-for-each-loop' to 'convert-loop-to-for-each' (**breaking change**)
- Rename 'convert-to-guard-clause' to 'convert-if-else-to-guard-clause' (**breaking change**)
- Rename 'convert-to-object-method' to 'convert-function-to-object-method' (**breaking change**)
- Rename 'eq-eq-null' to 'use-eq-eq-null' (**breaking change**)
- Rename 'default-parameter' to 'lift-default-into-parameter' (**breaking change**)
- Rename 'block-scoped-variable' to 'replace-var-with-let-and-const' (**breaking change**)
- Rename 'nullish-coalescing-operator' to 'use-nullish-coalescence-in-default-expression' (**breaking change**)
- Rename 'spread-syntax' to 'convert-apply-to-spread-syntax' (**breaking change**)
- Rename 'optional-chaining' to 'use-optional-chaining' (**breaking change**)
- Rename 'string-starts-with' to 'use-string-starts-with' (**breaking change**)
- Rename 'string-ends-with' to 'use-string-ends-with' (**breaking change**)
- Rename 'template-literal' to 'use-template-literal' (**breaking change**)

## 1.26.0 - 2021-09-23

### Changed
- Extract substring as const converts the original string into a template literal.

## 1.25.0 - 2021-09-23

### Changed
- Change "Modernize..." menu to "Refactor..." and add more actions.

## 1.24.0 - 2021-09-20

### Added
- `// p42:ignore-next-statement` comment disables analysis on the next statement

## 1.23.0 - 2021-09-19

### Added
- **Pull operator out of assignment** refactoring

### Changed
- Rename 'move-operator-into-assignment' to 'push-operator-into-assignment' (**breaking change**)
- Changed 'push-operator-into-assignment' into ad-hoc action (no diagnostic information)

## 1.22.0 - 2021-09-18

### Added
- **Extract substring to const** refactoring

## 1.21.0 - 2021-09-17

### Changed
- File and Folder Modernization support in Virtual Workspaces

## 1.20.0 - 2021-09-17

### Changed
- Cleaner "Modernize..." menu (changed from "Refactoring...")

## 1.19.0 - 2021-09-08

### Added
- **Convert to guard clause** refactoring

## 1.18.0 - 2021-09-08

### Added
- **Move operator into assignment** refactoring

## 1.17.0 - 2021-09-08

### Added
- **Inline return** refactoring

## 1.16.0 - 2021-09-07

### Added
- **Push not down (!) operator into &&, ||, !=, !==, ==, ===, <, <=, >, >=** refactoring

## 1.15.0 - 2021-09-06

### Added
- **Add '\_' numeric separator to long decimal, hex, binary, octal and big int literals** code modernization (ES2021)

## 1.14.0 - 2021-09-05

### Added
- **Convert Math.pow to exponentiation operator** code modernization (ES2016)

## 1.13.0 - 2021-09-05

### Added
- **Surround with try..catch** action: adds a try..catch block around the selected statements

## 1.12.0 - 2021-09-04

### Added
- Added `flip-operator` refactoring: swaps the arguments of a binary comparison (and updates the operator accordingly)

### Changed
- `return-ternary` is an adhoc refactoring (not shown as hint any longer)

## 1.11.0 - 2021-09-03

### Changed
- Consolidated `flip-if-else` and `flip-ternary` into `invert-condition` refactoring (**Config Breaking Change**)

## 1.10.0 - 2021-09-03

### Added
- Added `extract-variable` refactoring: Extract multiple occurrences of an expression to const in enclosing block scope

## 1.9.0 - 2021-09-01

### Added
- Warnings and warning dialog for inline constant refactoring

## 1.8.1 - 2021-08-31

### Added
- Shortcut for inline const refactoring: ctrl+alt+n

## 1.8.0 - 2021-08-31

### Added
- Bulk refactoring support for files.

## 1.7.0 - 2021-08-30

### Added
- Added `convert-to-object-method` refactoring: Convert property assignments with functions to method declarations.

## 1.6.0 - 2021-08-30

### Added
- Github Codespaces ( github.dev ) support for in-editor refactorings.
- Added `convert-to-foreach-loop` refactoring

### Changed
- Renamed `for-of-loop` to `convert-to-for-of-loop` (**Config Breaking Change**).

## 1.5.0 - 2021-08-28

### Added
- Added `inline-variable` ad-hoc refactoring: Inline the value of a const declaration into its references and remove the declaration.

## 1.4.0 - 2021-08-27

### Added
- Added `flip-ternary` ad-hoc refactoring: Invert the ternary condition and change the order of its first and second expression.

## 1.3.0 - 2021-08-26

### Added
- Added `expand-shorthand-property` ad-hoc refactoring: Expand shorthand properties into full notation.

## 1.2.0 - 2021-08-26

### Added
- Refactorings are available in the VS Code refactoring context menu (in additional to the code actions context menu).

## 1.1.0 - 2021-08-26

### Added
- Added `flip-if-else` ad-hoc refactoring: Invert the if-statement condition and change the order of the then and else blocks.

## 1.0.0 - 2021-08-25

### Added
- Added `string-starts-with`: Convert check of first string character to 'String.startsWith()'.
- Added `collapse-property-into-shorthand`: Convert duplicated property names and values into shorthand notation.

### Changed
- Renamed `nested-if` to `merge-nested-if` (**Config Breaking Change**)
- Renamed `nested-else` to `merge-nested-else` (**Config Breaking Change**)
- Renamed `ends-with` to `string-ends-with` (**Config Breaking Change**)
- Changed `string-ends-with`: support JavaScript sources, detect cases where underlying target type can be inferred to be a string (instead of having to be explicitly declared as such), detect cases that use 'charAt'.

## 0.3.0 - 2021-07-03

### Added
- Added `nested-else`: nested single `if` statements inside `else` blocks can be combined into `else if` statements.

## 0.2.1 - 2021-07-02

### Changed
- Changed `nested-if`: limit highlight range to nested `if`
- Changed `spread-syntax`: limit highlight range to 'apply'

## 0.2.0 - 2021-07-01

### Changed
- Renamed configuration file to `p42.toml` (**Config Breaking Change**)
- Changed `return-ternary`: Combining return statements into a ternary is only suggested when the return statements are not ternaries already.
- Changed `return-ternary`: Highlight range limited to 'if'

## 0.1.0 - 2021-06-30

### Added
- Added "Refactor..." command on folders in the Explorer. It will run a refactoring on all applicable files in that folder.

## 0.0.9 - 2021-06-26

### Fixed
- Show correct highlight range for "return-ternary" refactoring.

## 0.0.8 - 2021-06-25

### Added
- Added `return-ternary`: combine return statements into a single return with a conditional expression.

## 0.0.7 - 2021-06-24

### Added
- Added enabling / disabling refactorings using `p42.config.toml`

## 0.0.3 - 2021-06-21

### Added
- Added `nested-if`: Combine nested if-statements into single if statement with '&&' condition

## 0.0.2 - 2021-06-21

First **alpha release** of P42 Refactoring for Visual Studio Code.

Refactor opportunities are indicated as blue information underlines in applicable code segments.
They can be invoked as quick fixes or through the refactoring menu.

### Added
- Convert functions to arrow functions
- Convert 'var' variable declarations that can be block scoped to let and const
- Convert default value assignments to parameter default values
- Convert check of last string character to 'String.endsWith()'
- Convert check for null and undefined into '== null' comparison
- Convert indexed for loop to for..of loop
- Shorten default value assignments with nullish coalescing operator
- Convert to optional chain expressions
- Convert '.apply()' call to use spread operator (...)
- Convert string concatenation to template literals
- Split combined variable declaration into separate declarations
