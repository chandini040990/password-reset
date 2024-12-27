Password Reset Flow 

The task is to implement correct password reset flow with email verification and proper update of new password in the database for web page.

Backend flow:

Registration:
Register new user. If already existing throw error message. If not update in database. Navigate to login page.

Login:
Login existing user. Throw error message if password is wrong or email id is wrong.

Forgot Password:
In Login page, if user clicks forgot password link then an reset password link is emailed to user along with token and reset password link. If user clicks on link in email then reset password form is displayed.

Reset Password:
User can enter new password and token to reset.If token is matching then allows password reset else throws error. Navigate to Login Page.

API Documentation Link:
https://documenter.getpostman.com/view/40507850/2sAYJ6Bz2w

Frontend link:
https://chand-password-reset.netlify.app/
https://chand-password-reset.netlify.app/login
https://chand-password-reset.netlify.app/resetpassword

Backend link:
https://password-reset-1-cyor.onrender.com/api/register
https://password-reset-1-cyor.onrender.com/api/login
https://password-reset-1-cyor.onrender.com/api/forgotpassword
https://password-reset-1-cyor.onrender.com/api/resetpassword
