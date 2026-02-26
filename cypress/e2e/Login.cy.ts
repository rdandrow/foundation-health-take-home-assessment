import { LoginPage } from '../pages/LoginPage';

describe('Login Page', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  describe('Page load', () => {
    it('displays all login elements on load', () => {
      loginPage.assertLoginPageVisible();
    });

    it('displays all login credentials elements on load', () => {
      loginPage.assertLoginPageCredentialsVisible();
      loginPage.assertLoginCredentialsContainerText();
    });

    it('shows the login button as enabled by default', () => {
      loginPage.assertLoginButtonEnabled();
    });

    it('loads with an empty username field', () => {
      loginPage.assertUsernameValue('');
    });

    it('does not show an error banner on initial load', () => {
      loginPage.assertNoErrorMessage();
    });

    it('shows the correct placeholders on the username and password fields, and login button', () => {
      loginPage.assertLoginFormFields()
    });

    it('displays the correct page title', () => {
      loginPage.assertPageTitle();
    });
  });
  
  describe('Unsuccessful login Validation', () => {
    it('should fail login with missing username', () => {
      loginPage.loginWithNoUsername();
    });

    it('should fail login with missing password', () => {
      loginPage.loginWithNoPassword();
    });

    it('should fail login with invalid credentials', () => {
      loginPage.loginWithInvalidCredentials('invalid_user', 'invalid_password');
    });
  });

  describe('Successful login with Standard User', () => {
    it('logs in with valid credentials and redirect to inventory', () => {
      loginPage.loginWithCredentials('standard_user', 'secret_sauce');
      loginPage.assertLoginSuccess();
    });
  });
});
