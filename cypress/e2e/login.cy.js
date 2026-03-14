/* global cy, describe, it, beforeEach */

/**
 * Skenario Pengujian E2E: Alur Login
 * * - Login spec
 * - Harus menampilkan halaman login dengan benar
 * - Harus berhasil login dan diarahkan ke halaman utama jika email dan password benar
 */

describe('Login spec', () => {
  beforeEach(() => {
    // Membuka halaman login
    cy.visit('http://localhost:5173/login')
  })

  it('harus menampilkan halaman login dengan benar', () => {
    // Memastikan elemen input dan tombol render dengan baik
    cy.get('input[placeholder="Email"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')
    // Jika tombol di UI kamu bernama "Masuk", ganti tulisan 'Login' di bawah menjadi 'Masuk'
    cy.get('button').contains('Login').should('be.visible')
  })

  it('harus berhasil login dan diarahkan ke halaman utama jika email dan password benar', () => {
    // Action: Mengetik email dan password
    cy.get('input[placeholder="Email"]').type('faristester@gmail.com')
    cy.get('input[placeholder="Password"]').type('rahasia123')

    // Action: Klik tombol login
    cy.get('button').contains('Login').click()

    // Assert: Memastikan URL berubah ke halaman utama dan ada tulisan "Diskusi Hangat"
    cy.url().should('eq', 'http://localhost:5173/')
    cy.get('h2').contains('Diskusi Hangat').should('be.visible')
  })
})
