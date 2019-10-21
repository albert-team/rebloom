import Red, { call } from '@albert-team/red'
import BloomFilter from './bloom-filter'

let filter

beforeEach(async () => {
  filter = new BloomFilter('test')
  await filter.connect()
})

afterEach(async () => {
  await filter.disconnect()

  call.mockClear()
  Red.mockClear()
})

test('BloomFilter.reserve()', async () => {
  expect(await filter.reserve(1, 2)).toBe('OK')
  expect(call).toBeCalledWith('BF.RESERVE', 'test', 1, 2)
})

test('BloomFilter.add()', async () => {
  // add a new item
  expect(await filter.add('item1')).toBe(1)
  expect(call).toBeCalledWith('BF.ADD', 'test', 'item1')

  // add an existing item
  expect(await filter.add('item1')).toBe(0)
  expect(call).toBeCalledWith('BF.ADD', 'test', 'item1')
})

test('BloomFilter.exists()', async () => {
  // check existence
  expect(await filter.exists('item1')).toBe(0)

  // add a new item
  expect(await filter.add('item1')).toBe(1)

  // check existence
  expect(await filter.exists('item1')).toBe(1)
})
