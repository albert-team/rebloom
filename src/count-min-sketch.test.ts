import Red, { call } from '@albert-team/red'
import CountMinSketchFilter from './count-min-sketch'

let filter

beforeEach(async () => {
  filter = new CountMinSketchFilter('test')
  await filter.connect()
})

afterEach(async () => {
  await filter.disconnect()

  call.mockClear()
  Red.mockClear()
})

test('CountMinSketchFilter.fromDimensions()', async () => {
  expect(await filter.fromDimensions(10, 10)).toBe('OK')
})

test('CountMinSketchFilter.fromProbability()', async () => {
  expect(await filter.fromProbability(1, 2)).toBe('OK')
})

test('CountMinSketchFilter.add()', async () => {
  // add a new item
  expect(await filter.add('item0')).toBe('OK')

  // add item with increment
  expect(await filter.add('item0', 2)).toBe('OK')
})

test('CountMinSketchFilter.count()', async () => {
  // count item does not exist
  expect(await filter.count('item1')).toBe(0)

  // add a new item
  expect(await filter.add('item1')).toBe('OK')

  // count added item
  expect(await filter.count('item1')).toBe(1)
})
