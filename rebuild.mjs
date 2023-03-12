#!/usr/bin/env zx

/* global $ */
await $`codegen/generate.mjs`;
await $`yarn`;
await $`yarn lerna run clean`;
await $`yarn lerna run generate`;

// TODO remove hack (used to run 2 code assist builds early because of dependencies)
await $`yarn lerna run --scope "@p42/engine" build`;
await $`yarn lerna run --scope "@p42/augmentation-*" build`;

await $`yarn lerna run build`;

await $`yarn lerna run --scope "@p42/engine" test`;
await $`yarn lerna run --scope "@p42/augmentation-*" test`;
await $`yarn lerna run --scope "@p42/code-assist-*" test`;
await $`yarn lerna run --scope "@p42/bundle" test`;
