<br />
<div align="center">
  <a href="https://p42.ai">
    <img 
      src="https://p42.ai/image/vscode/robot_juggling_300.png" 
      alt="JavaScript Assistant"
      height="300" />
  </a>
  <h1 align="center" style="padding-top: 20px;">P42 JavaScript Assistant</h2>
  

  <p align="center">
    Your helper for writing modern, clear, and concise code.
    <br />
    <a href="https://github.com/p42ai/refactor-vscode/issues">Report Bug</a>
    ·
    <a href="https://github.com/p42ai/refactor-vscode/issues">Request Feature</a>
    ·
    <a href="https://twitter.com/p42ai">Follow @p42ai</a>
  </p>
  
</div>

# Get Started

The P42 JavaScript Assistant adds **[65 automated refactorings and quick fixes](https://p42.ai/documentation/code-action/) for JavaScript, TypeScript and React** to VS Code. The available actions depend on the cursor position, the selected text (if any), the source code, the language type, and any available type information.

You can find available actions in the VS Code **quick fix and refactoring context menus** and in context menus for specific action types. In some situations, **refactoring hints with a blue squiggly underline** indicate beneficial actions that you can take.

To help you refactor with confidence, P42 evaluates the impact on the logical program behavior and often shows **[refactoring safety information](https://p42.ai/documentation/p42-for-vscode/safety-evaluation)** in the context menu entry.

# User Interface

## Quick Fix Context Menu
When P42 code actions are available, you will see a lightbulb in your editor. Clicking it will open the quick fix context menu. Alternatively, you can use a keyboard shortcut (see below).

![Quickfix menu](https://p42.ai/image/vscode/feature-lightbulb-quickfix-menu.gif)

## Refactoring Hints

 P42 suggests some refactorings with blue squiggly underlines in your editor. You can invoke them as a quick fix.

![Nullish Coalescing Operator Example](https://p42.ai/image/vscode/feature-suggestion.png)

## Keyboard Shortcuts

- **Quick Fix** context menu
  - Mac: <kbd>CMD</kbd> + <kbd>.</kbd> (default VS Code shortcut)
  - Windows <kbd>CTRL</kbd> + <kbd>.</kbd> (default VS Code shortcut)
- **Refactoring** context menu
  - Mac: <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>R</kdb>
  - Windows / Linux: <kbd>ALT</kbd> + <kbd>SHIFT</kbd> + <kbd>R</kbd>
- **Inline** context menu
  - Mac: <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>I</kbd>
  - Windows / Linux: <kbd>ALT</kbd> + <kbd>SHIFT</kbd> + <kbd>I</kbd>
- **Extract** context menu
  - Mac: <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>X</kbd>
  - Windows / Linux: <kbd>ALT</kbd> + <kbd>SHIFT</kbd> + <kbd>X</kbd>
- **Convert** context menu
  - Mac: <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>V</kbd>
  - Windows / Linux: <kbd>ALT</kbd> + <kbd>SHIFT</kbd> + <kbd>V</kbd>
- **Action** context menu
  - Mac: <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>A</kbd>
  - Windows / Linux: <kbd>ALT</kbd> + <kbd>SHIFT</kbd> + <kbd>A</kbd>

## Sidebar

P42 adds a sidebar panel to Visual Studio Code. It has three sections:

- **Current Selection**: Contains actions that are available for the current editor cursor position and selection.
- **Suggestions**: Contains all suggestions for the current editor.
- **Authentication**: [P42 Pro and Business License](https://p42.ai/documentation/p42-for-vscode/p42-pro-and-business#license)

# Documentation

### **[Overview](https://p42.ai/documentation/p42-for-vscode/)**
  * [Get Started](https://p42.ai/documentation/p42-for-vscode/get-started)
  * [User Interface](https://p42.ai/documentation/p42-for-vscode/user-interface)
  * [Examples](https://p42.ai/documentation/p42-for-vscode/examples)
  * [Safety Evaluation](https://p42.ai/documentation/p42-for-vscode/safety-evaluation)
  * [P42 Pro & Business](https://p42.ai/documentation/p42-for-vscode/p42-pro-and-business)
  * [Configuration](https://p42.ai/documentation/p42-for-vscode/configuration)
  * [FAQ](https://p42.ai/documentation/p42-for-vscode/faq)

### **[Code Actions](https://p42.ai/documentation/code-action)**

# Used Open Source Libraries

See [DISCLAIMER.txt](https://raw.githubusercontent.com/p42ai/refactor-vscode/main/DISCLAIMER.txt).
