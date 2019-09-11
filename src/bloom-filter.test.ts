import BloomFilter from './bloom-filter'
const bloomfilter = new BloomFilter('filter')
beforeAll(async () => {
  await bloomfilter.connect()
})
afterAll(async () => {
  await bloomfilter.disconnect()
})
test('method add item0 return 1', async () => {
  expect(await bloomfilter.add('item0')).toBe(1)
})
test('method exists item0 return 1', async () => {
  expect(await bloomfilter.exists('item0')).toBe(1)
})
test('method exists item1 return 0', async () => {
  expect(await bloomfilter.exists('item1')).toBe(0)
})
test('method add item0 return 0', async () => {
  expect(await bloomfilter.add('item0')).toBe(0)
})
test('method reset return 1', async () => {
  expect(await bloomfilter.reset()).toBe(1)
})
test('method reset return 0', async () => {
  expect(await bloomfilter.reset()).toBe(0)
})
