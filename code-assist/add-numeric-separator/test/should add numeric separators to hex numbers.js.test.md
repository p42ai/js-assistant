
## Input
```javascript input
const literals = [
   0xA0,
   0xB1A0,
   -0xB1A0,
   0x010101,
   0xAABBCCDDEEFF,
   0xaabbccddeeff,
]
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const literals = [
   0xA0,
   0xB1_A0,
   -0xB1_A0,
   0x01_01_01,
   0xAA_BB_CC_DD_EE_FF,
   0xaa_bb_cc_dd_ee_ff,
]
```
