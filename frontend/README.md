Password Reset Flow 

The task is to implement correct password reset flow with email verification and proper update of new password in the database for web page.

Frontend flow:

Registration:
Register new user. If already existing throw error message. Navigate to login page.

Login:
Login existing user. Throw error message if password is wrong or email id is wrong.

Forgot Password link:
In Login page, if user clicks forgot password link then an reset password link is emailed to user along with token and reset password link. If user clicks on link in email then reset password form is displayed.

Reset Password:
User can enter new password and token to reset. If new password and confirm password is not matching then throw error.If token is matching then allows password reset else throws error. Navigate to Login Page.