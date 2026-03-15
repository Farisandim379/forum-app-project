/**
 * Skenario Pengujian untuk LoginInput:
 *
 * - LoginInput component
 * - harus menangani pengetikan email dengan benar
 * - harus menangani pengetikan password dengan benar
 * - harus memanggil fungsi login ketika tombol login diklik
 */

import { describe, it, expect } from 'vitest'
import isPreloadReducer from './reducer'
import { ActionType } from './action'

describe('isPreloadReducer function', () => {
  it('harus mengembalikan state awal jika diberikan action yang tidak diketahui', () => {
    const initialState = true
    const action = { type: 'UNKNOWN' }
    const nextState = isPreloadReducer(initialState, action)
    expect(nextState).toEqual(initialState)
  })

  it('harus mengembalikan nilai boolean jika diberikan action SET_IS_PRELOAD', () => {
    const initialState = true
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: { isPreload: false }
    }
    const nextState = isPreloadReducer(initialState, action)
    expect(nextState).toEqual(action.payload.isPreload)
  })
})
