// mocked Redis database
let redisDb: Map<string, number>
let count

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
    redisDb.set(args[2], count)
    return 1
  }
  if (args[0] === 'CF.ADD') {
    redisDb.set(args[2], count)
    return 1
  }
  if (args[0] === 'CMS.INCRBY') {
    for (let i = 0; i < args[3]; i++) {
      redisDb.set(args[2], count)
      count += 1
    }
    return count
  }
  if (args[0] === 'TOPK.INCRBY') {
    redisDb.set(args[2], count)
    return [null]
  }
  if (args[0] === 'BF.EXISTS' || args[0] === 'CF.EXISTS') {
    if (redisDb.has(args[2])) return 1
    return 0
  }
  if (args[0] === 'CF.COUNT' || args[0] === 'CMS.QUERY') return redisDb.size
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
  if (args[0] === 'TOPK.COUNT') return [redisDb.size]
})

export default jest.fn(() => {
  redisDb = new Map()
  count = 0
  return { connect: jest.fn(), disconnect: jest.fn(), call }
})
