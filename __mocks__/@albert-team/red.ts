// mocked Redis database
// it should be a Map, but in this case, a Set is enough
let redisDb: Set<string>

export const call = jest.fn((...args) => {
  if (args[0] === 'BF.RESERVE') return 'OK'
  if (args[0] === 'BF.ADD') {
    if (redisDb.has(args[2])) return 0
    redisDb.add(args[2])
    return 1
  }
  if (args[0] === 'BF.EXISTS') {
    if (redisDb.has(args[2])) return 1
    return 0
  }
})

export default jest.fn(() => {
  redisDb = new Set()

  return { connect: jest.fn(), disconnect: jest.fn(), call }
})
