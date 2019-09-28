import Red, { call } from '@albert-team/red'
import BaseFilter from './base-filter'

// Cannot create an instance of abstract class BaseFilter, we test on an inherited one
class TestingBaseFilter extends BaseFilter {}

let filter

beforeEach(async () => {
  filter = new TestingBaseFilter('test')
  await filter.connect()
})

afterEach(async () => {
  await filter.disconnect()

  call.mockClear()
  Red.mockClear()
})

test('BaseFilter.reset()', async () => {
  expect(await filter.reset()).toBeUndefined()
  expect(call).toBeCalledWith('DEL', 'test')
})
