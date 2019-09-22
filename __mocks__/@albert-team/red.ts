export const connect = jest.fn()
export const disconnect = jest.fn()
export const call = jest.fn()

export default jest.fn().mockImplementation(() => {
  return { connect, disconnect, call }
})
