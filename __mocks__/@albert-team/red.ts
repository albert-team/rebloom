// mocked Redis database
let redisDb: Map<string, number>

export const call = jest.fn((...args) => {
  if (
    args[0] === 'BF.RESERVE' ||
    args[0] === 'CF.RESERVE' ||
    args[0] === 'CMS.INITBYDIM' ||
    args[0] === 'CMS.INITBYPROB' ||
    args[0] === 'TOPK.RESERVE'
  )
    return 'OK'

  if (args[0] === 'BF.ADD' || args[0] === 'CF.ADDNX') {
    if (redisDb.has(args[2])) return 0
    redisDb.set(args[2], 1)
    return 1
  }

  if (args[0] === 'CF.ADD') {
    if (redisDb.has(args[2])) {
      const count = redisDb.get(args[2]) + 1
      redisDb.set(args[2], count)
      return 1
    } else {
      redisDb.set(args[2], 1)
      return 1
    }
  }

  if (args[0] === 'CMS.INCRBY') {
    if (redisDb.has(args[2])) {
      const count = redisDb.get(args[2]) + args[3]
      redisDb.set(args[2], count)
      return count
    } else {
      redisDb.set(args[2], args[3])
      return args[3]
    }
  }

  if (args[0] === 'TOPK.INCRBY') {
    redisDb.set(args[2], 1)
    return [null]
  }

  if (args[0] === 'BF.EXISTS' || args[0] === 'CF.EXISTS') {
    if (redisDb.has(args[2])) return 1
    return 0
  }

  if (args[0] === 'CF.COUNT' || args[0] === 'CMS.QUERY') {
    if (redisDb.has(args[2])) return redisDb.get(args[2])
    return 0
  }

  if (args[0] === 'CF.DEL') {
    if (!redisDb.has(args[2])) return 0

    if (redisDb.has(args[2])) {
      redisDb.delete(args[2])
      return 1
    }
  }

  if (args[0] === 'TOPK.QUERY') {
    if (redisDb.has(args[2])) return [1]
    return [0]
  }

  if (args[0] === 'TOPK.COUNT') {
    if (redisDb.has(args[2])) return [redisDb.get(args[2])]
    return [0]
  }
})

export default jest.fn(() => {
  redisDb = new Map()

  return { connect: jest.fn(), disconnect: jest.fn(), call }
})
