[![](https://img.shields.io/github/license/albert-team/rebloom.svg?style=flat-square)](https://github.com/albert-team/rebloom)
[![](https://img.shields.io/npm/v/@albert-team/rebloom.svg?style=flat-square)](https://www.npmjs.com/package/@albert-team/rebloom)
[![](https://img.shields.io/travis/com/albert-team/rebloom.svg?style=flat-square)](https://travis-ci.com/albert-team/rebloom)

# REBLOOM

> Minimalistic [RedisBloom][0] client for Node.js.

## Installation

### Requirements

- Node.js >= 8
- Redis >= 4
- [RedisBloom][0] >= 2.2.0

### Instructions

#### With `npm`

```bash
npm i @albert-team/rebloom
```

#### With `yarn`

```bash
yarn add @albert-team/rebloom
```

## Usage

**Important**:

- Rebloom v2 is nearly a rewrite from scratch, thus not backward-compatible with Rebloom v1.
- [RedisBloom][0] module needs to be loaded into Redis server beforehand.

### Get Started

```js
const { BloomFilter } = require('@albert-team/rebloom')

const main = async () => {
  const filter = new BloomFilter('filtername',{host:'localhost',port:6379,password:'myPassword'})
  await filter.connect()

  console.log(await filter.add('item0')) // 1
  console.log(await filter.exists('item0')) // 1
  console.log(await filter.exists('item1')) // 0

  await filter.disconnect()
}

main()
```

### API

Read more [here](https://albert-team.github.io/rebloom).

## Changelog

Read more [here](https://github.com/albert-team/rebloom/blob/master/CHANGELOG.md).

[0]: https://github.com/RedisLabsModules/redisbloom
