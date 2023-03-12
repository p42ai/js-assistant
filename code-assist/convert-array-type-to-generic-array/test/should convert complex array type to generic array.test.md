
## Input
```typescript input
const aValue: (
  | {
      valueA: string;
      valueB: number;
    }
  | undefined
  | null
  | boolean
)[] = [];
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
const aValue: Array<(
  | {
      valueA: string;
      valueB: number;
    }
  | undefined
  | null
  | boolean
)> = [];
```
