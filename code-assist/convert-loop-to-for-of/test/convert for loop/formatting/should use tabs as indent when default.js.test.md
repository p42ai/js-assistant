
## Input
```javascript input
function f() {
	const n = elements.length;
	for (let i = 0; i < n; i++) {
		const element = elements[i];
		console.log(element);
	}
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
function f() {
	for (const element of elements) {
		console.log(element);
	}
}
```
