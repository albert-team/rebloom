# CHANGELOG

## v2.5.0

### FEATURES

- Drop Node.js 8 support

## v2.4.0

### FEATURES

- Make `BaseFilter.name` non-final & public
- Add `BloomFilter.info()`

## v2.3.0

### FEATURES

- Add `BloomFilter.madd()`
- Add `BloomFilter.mexists()`
- Add `TopKFilter.list()`

## v2.2.0, v2.2.1

### FEATURES

- Add optional arg `expansionRate` to `BloomFilter.reserve()`
- Add optional args `bucketSize`, `maxIterations` and `expansionRate` to `CuckooFilter.reserve()`

## v2.1.0, v2.1.1

### FEATURES

- Add unit tests
- Use _Travis CI_

### PATCHES

- Fix CMS.INCRBY change in RedisBloom v2.2.0

## v2.0.0

### FEATURES

- Add _Typedoc_ and generate API documentation

### PATCHES

- Upgrade [_Red_](https://github.com/albert-team/red) dependency to fix compatibility issue with Node < v9.11.0

## v2.0.0-canary.0

### FEATURES

- Rewrite with TypeScript
- Remove unnecessary default behaviors
- Add `CountMinSketch` and `TopKFilter`

## v1.1.0

### FEATURES

- Support the ability to reset the filter. You can set `Options.reset = true` to automatically reset on connected

## v1.0.0

### FEATURES

- Now you can use _Red_ options with `Options.redisClientOptions`
- Remove `Options.password`

## v1.0.0-canary.0

### FEATURES

- Support using a custom Redis client
- Support Redis client authentication
- Start writing documentation with _JSDoc_
- No longer load RedisBloom module internally

## v0.1.1, v0.1.2

### PATCHES

- Attempt to fix missing .so file

## v0.1.0

### FEATURES

- Remove redundant to-string conversions

## v0.1.0-beta.0

### FEATURES

- Mapping basic features of RedisBloom
