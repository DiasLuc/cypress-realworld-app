import { Tag } from "@mui/icons-material"
import userData from "/Users/lucas/workspace/github.com/DiasLuc/cypress-realworld-app/cypress/fixtures/userData.json"
const Chance = require('chance')
const chance = new Chance()

const loginSelectors = {
  loginPage: "http://localhost:3000/",
  pageHeader: "Sign in",
  usernameField: "#username",
  passwordField: "#password",
  signinButton: ".SignInForm-submit",
  sideNavUsername: "[data-test='sidenav-username']",
  signinError: "[data-test='signin-error']",
  signinErrorMessage: "Username or password is invalid",
  signupLink: "[data-test='signup']"
}

const registrationSelectors = {
  signupPage: loginSelectors.loginPage + "signup",
  fnameField: "[name='firstName']",
  lnameField: "[name='lastName']",
  usernameField: "[name='username']",
  passwordField: "[name='password']",
  confirmPasswordField: "[name='confirmPassword']",
  signupButton: "[data-test='signup-submit']",
  errorMsg: ".Mui-error"
}

const formFill = {
  password: "supersecretpass123",
  correctConfirmationPassword: "supersecretpass123",
  wrongConfirmationPassword: "wrongpass"
}

describe('Successful Login', () => {
  it('Should login with a valid user', () => {
    cy.visit(loginSelectors.loginPage)

    cy.get(loginSelectors.usernameField).type(userData.userSuccess.username)
    cy.get(loginSelectors.passwordField).type(userData.userSuccess.password)
    cy.get(loginSelectors.signinButton).click()
    cy.get(loginSelectors.sideNavUsername).contains(userData.userSuccess.username)
    
  })
})

describe('Try to login with invalid credentials', () => {
  it('Should show error message stating that credentials are invalid', () => {
    cy.visit(loginSelectors.loginPage)
    cy.get(loginSelectors.usernameField).type(userData.userFail.username)
    cy.get(loginSelectors.passwordField).type(userData.userFail.password)
    cy.get(loginSelectors.signinButton).click()
    cy.get(loginSelectors.signinError).contains(loginSelectors.signinErrorMessage)
  })

})

describe('Successful user registration', () => {
  it('Should register a new user with valid info', () => {
    cy.visit(loginSelectors.loginPage)
    cy.get(loginSelectors.signupLink).click()
    cy.url('match',registrationSelectors.signupPage)
    cy.get(registrationSelectors.fnameField).clear().type(chance.first())
    cy.get(registrationSelectors.lnameField).clear().type(chance.last())
    cy.get(registrationSelectors.usernameField).clear().type(chance.string())
    cy.get(registrationSelectors.passwordField).clear().type(formFill.password)
    cy.get(registrationSelectors.confirmPasswordField).clear().type(formFill.correctConfirmationPassword)
    cy.get(registrationSelectors.signupButton).click()
    cy.contains('h1', loginSelectors.pageHeader)
    cy.url('match', loginSelectors.loginPage)
  })
})

describe('Try to register a new user with missing info ', () => {
  it("Should show error message that info is missing", () => {
    cy.visit(loginSelectors.loginPage)
    cy.get(loginSelectors.signupLink).click()
    cy.url('match',registrationSelectors.signupPage)
    cy.get(registrationSelectors.fnameField).clear().type(chance.first())
    // Leave Last Name Field empty
    cy.get(registrationSelectors.lnameField).clear()
    cy.get(registrationSelectors.usernameField).clear().type(chance.string())
    cy.get(registrationSelectors.passwordField).clear().type(formFill.password)
    cy.get(registrationSelectors.confirmPasswordField).clear().type(formFill.correctConfirmationPassword)
    cy.get(registrationSelectors.signupButton).should('be.disabled')
    cy.get(registrationSelectors.errorMsg).should('contain.text', 'is required')
  })

})

describe('Try to register a new user with mismatched passwords ', () => {
  it.only("Should show error message that passwords don't match", () => {
    cy.visit(loginSelectors.loginPage)
    cy.get(loginSelectors.signupLink).click()
    cy.url('match',registrationSelectors.signupPage)
    cy.get(registrationSelectors.fnameField).clear().type(chance.first())
    cy.get(registrationSelectors.lnameField).clear().type(chance.last())
    cy.get(registrationSelectors.usernameField).clear().type(chance.string())
    cy.get(registrationSelectors.passwordField).clear().type(formFill.password)
    cy.get(registrationSelectors.confirmPasswordField).clear().type(formFill.wrongConfirmationPassword)
    cy.get(registrationSelectors.signupButton).should('be.disabled')
    cy.get(registrationSelectors.errorMsg).should('contain.text', 'Password does not match')
  })

})