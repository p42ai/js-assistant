# Possible improvements

* IIFE arguments (look out for re-assignments)
* Variable scope analysis
* multi-line support when return statements are in inner functions
* safety: removing iife when there are var / function declarations can be problematic (conflicts with outer scope)