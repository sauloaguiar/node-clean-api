import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

describe('BCrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const salt = 12

    // sending salt as argument for the adapter instead of making it part of the protocol
    // the adpater is specific to the library, the protocol is a generic abstraction of our application
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    // we keep calling the function with one arg only as in the protocol
    await sut.encrypt('any_value')

    // but we check that both values were given during the function call
    expect(hashSpy).toBeCalledWith('any_value', salt)
  })
})
