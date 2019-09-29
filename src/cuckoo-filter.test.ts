import Red, { call } from '@albert-team/red'
import CuckooFilter from './cuckoo-filter'

let filter

beforeEach(async () => {
  filter = new CuckooFilter('test')
  await filter.connect()
})

afterEach(async () => {
  await filter.disconnect()

  call.mockClear()
  Red.mockClear()
})

test('CuckooFilter.reserve()', async () => {
  expect(await filter.reserve(10)).toBe('OK')
  expect(call).toBeCalledWith('CF.RESERVE', 'test', 10)
})

test('CuckooFilter.add()', async () => {
  // add a new item
  expect(await filter.add('item0')).toBe(1)
  expect(call).toBeCalledWith('CF.ADDNX', 'test', 'item0')

  // add an existing item
  expect(await filter.add('item0')).toBe(0)
  expect(call).toBeCalledWith('CF.ADDNX', 'test', 'item0')

  // add an existing item with False notExistOnly
  expect(await filter.add('item0', false)).toBe(1)
  expect(call).toBeCalledWith('CF.ADD', 'test', 'item0')
})

test('CuckooFilter.exists()', async () => {
  // check existence
  expect(await filter.exists('item1')).toBe(0)
  expect(call).toBeCalledWith('CF.EXISTS', 'test', 'item1')

  // add a new item
  expect(await filter.add('item1')).toBe(1)
  expect(call).toBeCalledWith('CF.ADDNX', 'test', 'item1')

  // check existence
  expect(await filter.exists('item1')).toBe(1)
  expect(call).toBeCalledWith('CF.EXISTS', 'test', 'item1')
})

test('CuckooFilter.count()', async () => {
  // count item does not exist
  expect(await filter.count('item1')).toBe(0)
  expect(call).toBeCalledWith('CF.COUNT', 'test', 'item1')

  // add a new item
  expect(await filter.add('item1')).toBe(1)
  expect(call).toBeCalledWith('CF.ADDNX', 'test', 'item1')

  // count added item
  expect(await filter.count('item1')).toBe(1)
  expect(call).toBeCalledWith('CF.COUNT', 'test', 'item1')
})

test('CuckooFilter.remove()', async () => {
  // remove item does not exist
  expect(await filter.remove('item1')).toBe(0)
  expect(call).toBeCalledWith('CF.DEL', 'test', 'item1')

  // add a new item
  expect(await filter.add('item1')).toBe(1)
  expect(call).toBeCalledWith('CF.ADDNX', 'test', 'item1')

  // remove added item
  expect(await filter.remove('item1')).toBe(1)
  expect(call).toBeCalledWith('CF.DEL', 'test', 'item1')

  // count removed item
  expect(await filter.count('item1')).toBe(0)
  expect(call).toBeCalledWith('CF.COUNT', 'test', 'item1')
})
