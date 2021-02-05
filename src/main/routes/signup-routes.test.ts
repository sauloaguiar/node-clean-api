import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  it('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Saulo',
        email: 'saulo@email.com',
        password: '1234',
        password_confirmation: '1234'
      })
      .expect(200)
  })
})
