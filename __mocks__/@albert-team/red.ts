export const connect = jest.fn()
export const disconnect = jest.fn()
export const call = jest.fn()
call.mockReturnValueOnce(1)
.mockReturnValueOnce(0)

export default jest.fn().mockImplementation(() => {
  return { connect, disconnect, call }
})
