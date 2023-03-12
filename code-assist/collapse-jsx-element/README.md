# Collapse JSX Element

Whitespace rules in JSX are complicated:
* https://www.javascriptstuff.com/how-whitespace-works-in-jsx/
* https://medium.com/geckoboard-under-the-hood/adding-a-new-layout-strategy-to-prettier-8d33084c0f99

In general, newlines and leading/trailing whitespace for a line (!) are automatically removed. P42 relies on TypeScript `containsOnlyTriviaWhitespace` to get this right.