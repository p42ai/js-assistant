
## Input
```vue input
<template>
</template>

<script lang="ts">
const a = new A<B, C>("test");
f(a);
</script>

<style>
</style>
```

## Configuration
```json configuration
{
  "extension": "vue",
  "lineEnding": "crlf",
  "selection": "53-53"
}
```

## Expected Output
```vue expected output
<template>
</template>

<script lang="ts">
f(new A<B, C>("test"));
</script>

<style>
</style>
```
