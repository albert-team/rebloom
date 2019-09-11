import TopKFilter from './top-k-filter'
const topkfilter = new TopKFilter('filter')
beforeAll(async () => {
  await topkfilter.connect()
  await topkfilter.reserve(1, 1, 1, 1)
})
afterAll(async () => {
  await topkfilter.disconnect()
})
test('method add item0 return [null]', async () => {
  expect(await topkfilter.add('item0')).toEqual([null])
})
test('method add item0 return [null]', async () => {
  expect(await topkfilter.add('item0')).toEqual([null])
})
test('method add item0 with incement 2 return [null]', async () => {
  expect(await topkfilter.add('item0', 2)).toEqual([null])
})
test('method exists item0 return [1]', async () => {
  expect(await topkfilter.exists('item0')).toEqual([1])
})
test('method exists item1 return [0]', async () => {
  expect(await topkfilter.exists('item1')).toEqual([0])
})
test('method count item0 return [4]', async () => {
  expect(await topkfilter.count('item0')).toEqual([4])
})
test('method count item1 return [0]', async () => {
  expect(await topkfilter.count('item1')).toEqual([0])
})
test('method reset return 1', async () => {
  expect(await topkfilter.reset()).toBe(1)
})
test('method reset return 0', async () => {
  expect(await topkfilter.reset()).toBe(0)
})
