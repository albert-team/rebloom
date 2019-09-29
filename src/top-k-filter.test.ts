import Red, { call } from '@albert-team/red'
import TopKFilter from './top-k-filter'

let filter

beforeEach(async () => {
  filter = new TopKFilter('test')
  await filter.connect()
})

afterEach(async () => {
  await filter.disconnect()

  call.mockClear()
  Red.mockClear()
})

test('TopKFilter.reserve()', async () => {
  expect(await filter.reserve(1, 1, 1, 1)).toBe('OK')
  expect(call).toBeCalledWith('TOPK.RESERVE', 'test', 1, 1, 1, 1)
})

test('TopKFilter.add()', async () => {
  // add a new item
  expect(await filter.add('item0')).toEqual([null])
  expect(call).toBeCalledWith('TOPK.INCRBY', 'test', 'item0', 1)

  // add item with increment
  expect(await filter.add('item0', 2)).toEqual([null])
  expect(call).toBeCalledWith('TOPK.INCRBY', 'test', 'item0', 2)
})

test('TopKFilter.exists()', async () => {
  // check existence
  expect(await filter.exists('item0')).toEqual([0])
  expect(call).toBeCalledWith('TOPK.QUERY', 'test', 'item0')

  // add a new item
  expect(await filter.add('item0')).toEqual([null])
  expect(call).toBeCalledWith('TOPK.INCRBY', 'test', 'item0', 1)

  // check existence
  expect(await filter.exists('item0')).toEqual([1])
  expect(call).toBeCalledWith('TOPK.QUERY', 'test', 'item0')
})

test('TopKFilter.count()', async () => {
    // count item does not exist
    expect(await filter.count('item0')).toEqual([0])
    expect(call).toBeCalledWith('TOPK.COUNT', 'test', 'item0')
  
    // add a new item
    expect(await filter.add('item0')).toEqual([null])
    expect(call).toBeCalledWith('TOPK.INCRBY', 'test', 'item0', 1)
  
    // count added item
    expect(await filter.count('item0')).toEqual([1])
    expect(call).toBeCalledWith('TOPK.COUNT', 'test', 'item0')
  })

