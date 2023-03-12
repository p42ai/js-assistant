
## Input
```javascript input
type Colors = "red" | "green" | "blue";

type RGB = [red: number, green: number, blue: number];

const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    bleu: [0, 0, 255]
} satisfies Record<Colors, string | RGB>;
```

## Configuration
```json configuration
{
  "extension": "ts",
  "selection": "113-221"
}
```

## Expected Output
```javascript expected output
type Colors = "red" | "green" | "blue";

type RGB = [red: number, green: number, blue: number];

const newVariable = {
    red: [255, 0, 0],
    green: "#00ff00",
    bleu: [0, 0, 255]
} satisfies Record<Colors, string | RGB>;
const palette = newVariable;
```
