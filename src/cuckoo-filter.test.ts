import CuckooFilter from './cuckoo-filter'
const cuckoofilter = new CuckooFilter('filter')
beforeAll(async () => {
  await cuckoofilter.connect()
})
afterAll(async () => {
  await cuckoofilter.disconnect()
})
test('method add item0 return 1', async () => {
  expect(await cuckoofilter.add('item0')).toBe(1)
})
test('method add item0 with false notExistsOnly return 1', async () => {
  expect(await cuckoofilter.add('item0', false)).toBe(1)
})
test('method add item0 return 0', async () => {
  expect(await cuckoofilter.add('item0')).toBe(0)
})
test('method count item0 return 2', async () => {
  expect(await cuckoofilter.count('item0')).toBe(2)
})
test('method count item1 return 0', async () => {
  expect(await cuckoofilter.count('item1')).toBe(0)
})
test('method exists item0 return 1', async () => {
  expect(await cuckoofilter.exists('item0')).toBe(1)
})
test('method exists item1 return 0', async () => {
  expect(await cuckoofilter.exists('item1')).toBe(0)
})
test('method remove item0 return 1', async () => {
  expect(await cuckoofilter.remove('item0')).toBe(1)
})
test('method remove item1 return 0', async () => {
  expect(await cuckoofilter.remove('item1')).toBe(0)
})
test('method count item0 return 1', async () => {
  expect(await cuckoofilter.count('item0')).toBe(1)
})
test('method reset return 1', async () => {
  expect(await cuckoofilter.reset()).toBe(1)
})
test('method reset return 0', async () => {
  expect(await cuckoofilter.reset()).toBe(0)
})
