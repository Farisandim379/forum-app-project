/* global cy, describe, it, beforeEach, expect */

/**
 * Skenario Pengujian E2E: Alur Login
 * - Harus menampilkan halaman login dengan benar
 * - Harus memunculkan alert jika login gagal (email/password salah)
 * - Harus berhasil login dan diarahkan ke halaman utama jika email dan password benar
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
  })

  it('harus menampilkan halaman login dengan benar', () => {
    cy.get('input[placeholder="Email"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')
    cy.get('button').contains('Login').should('be.visible') // Ubah 'Login' jadi 'Masuk' jika UImu bahasa Indonesia
  })

  // === TAMBAHAN BARU: SKENARIO GAGAL ===
  it('harus memunculkan alert jika login gagal (email/password salah)', () => {
    cy.get('input[placeholder="Email"]').type('email.asal.salah@gmail.com')
    cy.get('input[placeholder="Password"]').type('passwordsalah123')
    cy.get('button').contains('Login').click()

    // Cypress akan menangkap pop-up alert dari browser
    cy.on('window:alert', (text) => {
      expect(text).to.contains('email or password is wrong') // Pesan default dari API Dicoding
    })
  })

  it('harus berhasil login dan diarahkan ke halaman utama jika email dan password benar', () => {
    cy.get('input[placeholder="Email"]').type('faris.testing123@gmail.com') // Gunakan email testing-mu
    cy.get('input[placeholder="Password"]').type('rahasia123') // Gunakan password testing-mu
    cy.get('button').contains('Login').click()

    cy.url().should('eq', 'http://localhost:5173/')
    cy.get('h2').contains('Diskusi Hangat').should('be.visible')
  })
})
