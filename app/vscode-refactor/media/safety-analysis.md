# Refactoring Safety Analysis

The JS Assistant safety analysis checks if refactorings can change the code's behavior (within [limitations](https://p42.ai/documentation/p42-for-vscode/safety-analysis#limitations)). The context and quick-fix menu items often contain safety indicators:

* **No indicator** — The JS Assistant has not evaluated the safety of the refactoring or code action. No indicator is the default for code actions that intentionally change your program.
* **Safe** 🟢 — The refactoring will not change the behavior of your code.
* **Information** 🔵 — The refactoring might detrimentally affect comments or readability.
* **Warning** 🟡 — The refactoring might change the behavior of your code. The text will include short hints at what you need to check to proceed safely. The documentation page for the code action might contain more details.
* **Error** 🔴 — The refactoring will change the behavior of your code and can introduce defects. You might still want to proceed, particularly if you want to change the behavior on purpose.

> 💡&nbsp;&nbsp;You can [configure the safety analysis visibility in the P42 settings](command:p42.openSettings) and, e.g., hide the analysis.