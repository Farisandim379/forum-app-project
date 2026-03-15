/**
 * Skenario Pengujian untuk LoginInput:
 *
 * - LoginInput component
 * - harus menangani pengetikan email dengan benar
 * - harus menangani pengetikan password dengan benar
 * - harus memanggil fungsi login ketika tombol login diklik
 */

import { describe, it, expect, afterEach, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import RegisterInput from './RegisterInput'

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup()
  })

  it('harus memanggil fungsi register dengan parameter yang sesuai ketika tombol register diklik', async () => {
    // Arrange
    const mockRegister = vi.fn()
    render(<RegisterInput register={mockRegister} />)

    const nameInput = await screen.getByPlaceholderText('Nama Lengkap')
    await userEvent.type(nameInput, 'Faris')

    const emailInput = await screen.getByPlaceholderText('Email')
    await userEvent.type(emailInput, 'faris@example.com')

    const passwordInput = await screen.getByPlaceholderText(/Password/i)
    await userEvent.type(passwordInput, 'passwordkuat')

    const registerButton = await screen.getByRole('button', { name: 'Daftar' })

    // Action
    await userEvent.click(registerButton)

    // Assert
    expect(mockRegister).toBeCalledWith({
      name: 'Faris',
      email: 'faris@example.com',
      password: 'passwordkuat'
    })
  })
})
