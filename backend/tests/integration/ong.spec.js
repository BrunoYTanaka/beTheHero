import request from 'supertest'
import connection from '../../src/database/connection'
import app from '../../src/app'

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterEach(async () => {
    await connection.destroy()
  })

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: 'APAD',
        email: 'contato@apad.com.br',
        whatsapp: '67981752148',
        city: 'Rio do Sul',
        uf: 'SC',
      })

    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })
})
