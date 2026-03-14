import { describe, it, expect } from 'vitest'
import authUserReducer from './reducer'
import { ActionType } from './action'

/**
 * Skenario pengujian untuk authUserReducer:
 *
 * - authUserReducer function
 * - harus mengembalikan state awal (null) jika diberikan action yang tidak diketahui
 * - harus mengembalikan data authUser jika diberikan action SET_AUTH_USER
 * - harus mengembalikan null jika diberikan action UNSET_AUTH_USER
 */

describe('authUserReducer function', () => {
  it('harus mengembalikan state awal jika diberikan action yang tidak diketahui', () => {
    // arrange
    const initialState = null
    const action = { type: 'UNKNOWN' }

    // action
    const nextState = authUserReducer(initialState, action)

    // assert
    expect(nextState).toEqual(initialState)
  })

  it('harus mengembalikan data authUser jika diberikan action SET_AUTH_USER', () => {
    // arrange
    const initialState = null
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image.url.jpg'
        }
      }
    }

    // action
    const nextState = authUserReducer(initialState, action)

    // assert
    expect(nextState).toEqual(false)
  })

  it('harus mengembalikan null jika diberikan action UNSET_AUTH_USER', () => {
    // arrange
    const initialState = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image.url.jpg'
    }
    const action = {
      type: ActionType.UNSET_AUTH_USER
    }

    // action
    const nextState = authUserReducer(initialState, action)

    // assert
    expect(nextState).toBeNull()
  })
})