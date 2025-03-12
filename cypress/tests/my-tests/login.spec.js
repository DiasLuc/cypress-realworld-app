import userData from "/Users/lucas/workspace/github.com/DiasLuc/cypress-realworld-app/cypress/fixtures/userData.json"
const selectors = {
  usernameField: "#username",
  passwordField: "#password",
  signinButton: ".SignInForm-submit",
  sideNavUsername: "[data-test='sidenav-username']",
  signinError: "[data-test='signin-error']",
  signinErrorMessage: "Username or password is invalid"
}


describe('Login RWA Tests', () => {

  it.skip('Login - Success', () => {
    cy.visit('http://localhost:3000/')

    cy.get(selectors.usernameField).type(userData.userSuccess.username)
    cy.get(selectors.passwordField).type(userData.userSuccess.password)
    cy.get(selectors.signinButton).click()
    cy.get(selectors.sideNavUsername).contains(userData.userSuccess.username)
    
  })

  it('Login - Fail', () => {
    cy.visit('http://localhost:3000/')

    cy.get(selectors.usernameField).type(userData.userFail.username)
    cy.get(selectors.passwordField).type(userData.userFail.password)
    cy.get(selectors.signinButton).click()
    cy.get(selectors.signinError).contains(selectors.signinErrorMessage)
  })

})