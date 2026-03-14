import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'
import { asyncPopulateUsersAndThreads } from './action'
import { receiveThreadsActionCreator } from '../threads/action'
import { receiveUsersActionCreator } from '../users/action'

// 1. Mocking file API agar tidak memanggil internet sungguhan
vi.mock('../../utils/api')

const fakeThreadsResponse = [
  { id: 'thread-1', title: 'Thread 1', body: 'Body 1', category: 'General', createdAt: '2026-03-14T00:00:00.000Z', ownerId: 'user-1', upVotesBy: [], downVotesBy: [], totalComments: 0 }
]
const fakeUsersResponse = [
  { id: 'user-1', name: 'User 1', email: 'user1@example.com', avatar: 'https://generated-image-url.jpg' }
]
const fakeErrorResponse = new Error('Ups, API gagal memuat data')

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    // Memalsukan window.alert agar tidak muncul pop-up saat testing
    vi.stubGlobal('alert', vi.fn())
  })

  afterEach(() => {
    // Membersihkan sisa-sisa mock setelah test selesai
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  // Pengujian 1: Skenario Sukses
  it('harus mendispatch action dengan benar ketika pemanggilan API sukses', async () => {
    // arrange (Persiapan)
    api.getAllUsers.mockResolvedValue(fakeUsersResponse)
    api.getAllThreads.mockResolvedValue(fakeThreadsResponse)
    const dispatch = vi.fn()

    // action (Eksekusi Thunk)
    await asyncPopulateUsersAndThreads()(dispatch)

    // assert (Pengecekan)
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse))
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  // Pengujian 2: Skenario Gagal
  it('harus mendispatch action dan memanggil alert ketika pemanggilan API gagal', async () => {
    // arrange (Persiapan)
    api.getAllUsers.mockRejectedValue(fakeErrorResponse)
    api.getAllThreads.mockRejectedValue(fakeErrorResponse)
    const dispatch = vi.fn()

    // action (Eksekusi Thunk)
    await asyncPopulateUsersAndThreads()(dispatch)

    // assert (Pengecekan)
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
  })
})