
## Input
```javascript input
import { A } from "./a";
import { B } from "./b";
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "0-0"
}
```

## Expected Output
```javascript expected output
import { B } from "./b";
import { A } from "./a";
```
