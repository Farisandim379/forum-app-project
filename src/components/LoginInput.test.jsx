import React from 'react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginInput from './LoginInput'
import '@testing-library/jest-dom/vitest'

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup() // Membersihkan render DOM setelah setiap test selesai
  })

  it('harus menangani pengetikan email dengan benar', async () => {
    // Arrange
    render(<LoginInput login={() => {}} />)
    const emailInput = await screen.getByPlaceholderText('Email')

    // Action
    await userEvent.type(emailInput, 'test@example.com')

    // Assert
    expect(emailInput).toHaveValue('test@example.com')
  })

  it('harus menangani pengetikan password dengan benar', async () => {
    // Arrange
    render(<LoginInput login={() => {}} />)
    const passwordInput = await screen.getByPlaceholderText('Password')

    // Action
    await userEvent.type(passwordInput, 'rahasia123')

    // Assert
    expect(passwordInput).toHaveValue('rahasia123')
  })

  it('harus memanggil fungsi login ketika tombol login diklik', async () => {
    // Arrange
    const mockLogin = vi.fn() // Memalsukan fungsi login
    render(<LoginInput login={mockLogin} />)
    const emailInput = await screen.getByPlaceholderText('Email')
    await userEvent.type(emailInput, 'test@example.com')
    const passwordInput = await screen.getByPlaceholderText('Password')
    await userEvent.type(passwordInput, 'rahasia123')
    
    // Sesuaikan 'Login' dengan teks yang ada
    const loginButton = await screen.getByRole('button', { name: 'Login' })

    // Action
    await userEvent.click(loginButton)

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'test@example.com',
      password: 'rahasia123'
    })
  })
})