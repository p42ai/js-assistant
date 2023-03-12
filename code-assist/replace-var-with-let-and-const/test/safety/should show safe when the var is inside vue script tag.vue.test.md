
## Input
```javascript input
<template>
</template>

<script>
var notAGlobalInsideMJS = "123";
</script>

<style>
</style>
```

## Configuration
```json configuration
{
  "extension": "vue"
}
```

## Expected Matches
```json expected matches
{
  "0-32-VariableDeclarationList": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
<template>
</template>

<script>
const notAGlobalInsideMJS = "123";
</script>

<style>
</style>
```
