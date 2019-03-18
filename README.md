[![](https://img.shields.io/github/license/albert-team/rebloom.svg?style=flat-square)](https://github.com/albert-team/rebloom)
[![](https://img.shields.io/npm/v/@albert-team/rebloom/latest.svg?style=flat-square)](https://www.npmjs.com/package/@albert-team/rebloom)

# REBLOOM

> Bloom filter and Cuckoo filter for Node.js using Redis with [RedisBloom](https://github.com/RedisLabsModules/redisbloom) module

## Installation

### Requirements

- Node.js >= 8.0.0
- Redis >= 4.0
- RedisBloom >= 1.1.0

### Instructions

- With npm:

```bash
npm i @albert-team/rebloom
```

- With yarn:

```bash
yarn add @albert-team/rebloom
```

## Usage

**Important**: [RedisBloom](https://github.com/RedisLabsModules/redisbloom) module needs to be loaded into Redis server beforehand.

```js
const { BloomFilter } = require('@albert-team/rebloom')

const main = async () => {
  const filter = new BloomFilter('filtername')
  await filter.connect()

  console.log(await filter.add('item0'))
  console.log(await filter.exists('item0'))
  console.log(await filter.addMany('item1', 'item2'))
  console.log(await filter.exists('item1'))
  console.log(await filter.exists('item3'))

  await filter.disconnect()
}

main()
```

## Changelog

Read more [here](https://github.com/albert-team/rebloom/blob/master/CHANGELOG.md).
