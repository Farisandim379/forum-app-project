/**
 * Skenario Pengujian untuk asyncSetAuthUser Thunk:
 *
 * - asyncSetAuthUser thunk
 * - harus memanggil api dan mendispatch action dengan benar ketika login sukses
 * - harus memanggil alert ketika login gagal
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest'
import api from '../../utils/api'
import { asyncSetAuthUser, setAuthUserActionCreator } from './action' // <-- Ini sudah diperbaiki menjadi './action'

vi.mock('../../utils/api')

const fakeAuthResponse = 'fake_token_123'
const fakeUserResponse = { id: 'user-1', name: 'User 1', email: 'user@example.com', avatar: 'https://avatar.com' }
const fakeErrorResponse = new Error('Pesan error dari API Dicoding')

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    vi.stubGlobal('alert', vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('harus memanggil api dan mendispatch action dengan benar ketika login sukses', async () => {
    // Arrange (Persiapan)
    api.login.mockResolvedValue(fakeAuthResponse)
    api.getOwnProfile.mockResolvedValue(fakeUserResponse)
    const dispatch = vi.fn()

    // Action (Aksi)
    await asyncSetAuthUser({ email: 'user@example.com', password: 'password123' })(dispatch)

    // Assert (Pengecekan)
    expect(api.login).toHaveBeenCalledWith({ email: 'user@example.com', password: 'password123' })
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeAuthResponse)
    expect(api.getOwnProfile).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUserResponse))
  })

  it('harus memanggil alert ketika login gagal', async () => {
    // Arrange (Persiapan)
    api.login.mockRejectedValue(fakeErrorResponse)
    const dispatch = vi.fn()

    // Action (Aksi)
    await asyncSetAuthUser({ email: 'salah@email.com', password: 'salah' })(dispatch)

    // Assert (Pengecekan)
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
  })
})