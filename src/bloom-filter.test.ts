import {call} from '@albert-team/red'
import BloomFilter from './bloom-filter'
const bloomfilter = new BloomFilter('filter')
beforeAll(async () => {
  await bloomfilter.connect()
})
afterAll(async () => {
  await bloomfilter.disconnect()
  call.mockClear()
})
test('Add item0 return 1', async () => {
  expect(await bloomfilter.add('item0')).toBe(1)
  expect(call).toBeCalledWith('BF.ADD','filter','item0')
})
test('Add item0 return 0', async () => {
  expect(await bloomfilter.add('item0')).toBe(0)
  expect(call).toBeCalledWith('BF.ADD','filter','item0')
})
