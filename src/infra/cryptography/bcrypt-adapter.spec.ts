import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  // sending salt as argument for the adapter instead of making it part of the protocol
  // the adpater is specific to the library, the protocol is a generic abstraction of our application
  return new BcryptAdapter(salt)
}

describe('BCrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    // we keep calling the function with one arg only as in the protocol
    await sut.encrypt('any_value')

    // but we check that both values were given during the function call
    expect(hashSpy).toBeCalledWith('any_value', salt)
  })

  test('should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')

    // but we check that both values were given during the function call
    expect(hash).toBe('hash')
  })

  test('should throw exception when bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.encrypt('any_value')

    await expect(promise).rejects.toThrow()
  })
})
