import '@types/jest'
import request from 'supertest'
import { app } from '../src/server'
import { asyncLocalStorage } from '../src/service/als.service'
import { tokenService } from '../src/service/token.service'

export const getAccessToken = () => {
  const { accessToken } = tokenService.generateTokens({
    uuid: '123',
    publicId: '123',
    role: 'user',
  })

  return accessToken
}

describe('ALS middleware', () => {
  let response
  let token: string

  beforeEach(() => {
    // Mock token validation, cookie, etc
    token = getAccessToken()
  })

  it('populates ALS store', async () => {
    response = await request(app)
      .get('/test-route')
      .set('Authorization', `Bearer ${token}`)

    const store = asyncLocalStorage.getStore()
    if (!store) return

    expect(store.userData).toEqual({
      /*...*/
    })
    expect(store.requestData).toEqual({
      /*...*/
    })
  })

  it('allows access if no token', async () => {
    // Mock no token

    response = await request(app).get('/test-route')

    expect(response.statusCode).toBe(200)
  })
})
