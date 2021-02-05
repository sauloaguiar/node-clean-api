import request from 'supertest'
import app from '../config/app'

describe('Content Type middleware', () => {
  it('Should return default content type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/) // use regex to avoid guessing which content type
  })

  it('Should return xml content type when requested', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send()
    })

    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/) // use regex to avoid guessing which content type
  })
})
