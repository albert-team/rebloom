import CountMinSketch from './count-min-sketch'
const cfilter = new CountMinSketch('filter')
beforeAll(async () => {
  await cfilter.connect()
  await cfilter.fromDimensions(10, 10)
})
afterAll(async () => {
  await cfilter.disconnect()
})
test('method add item1 return OK', async () => {
  expect(await cfilter.add('item1')).toBe('OK')
})
test('method add item1 with incement 2 return OK', async () => {
  expect(await cfilter.add('item1', 2)).toBe('OK')
})
test('method count item1 return [3]', async () => {
  expect(await cfilter.count('item1')).toEqual([3])
})
test('method reset return 1', async () => {
  expect(await cfilter.reset()).toBe(1)
})
test('method reset return 0', async () => {
  expect(await cfilter.reset()).toBe(0)
})
