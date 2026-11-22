# Set up the contact and thank-you emails

When someone submits the form, the server-side function sends their message to you and then attempts a thank-you email to them. Nodemailer runs in the function; the Gmail password must never be placed in the browser code.

## Set up on your computer

1. If `.env.local` does not exist in the project root, copy [`.env.example`](../.env.example) and rename the copy `.env.local`.
2. In `.env.local`, set these values:

   | Name | What to enter |
   | --- | --- |
   | `SMTP_HOST` | `smtp.gmail.com` for Gmail |
   | `SMTP_PORT` | `465` for Gmail |
   | `SMTP_USER` | The Gmail address sending the messages |
   | `SMTP_PASS` | Its Google app password, without spaces |
   | `CONTACT_EMAIL` | The address where you want to receive inquiries |

3. Turn on two-step verification and create an app password using [Google's instructions](https://support.google.com/accounts/answer/185833). Use the app password, not your normal Gmail password.
4. Save `.env.local` and restart `npm run dev`.
5. Send a test from the form using a different email address you can check. Look for the inquiry in `CONTACT_EMAIL` and the thank-you email in the address you entered. Check spam folders too.

Never share or upload `.env.local` or its password. The file is ignored by Git. A message saying email is not configured means one or more settings are missing. If sending fails, check the terminal for server errors and confirm the app password belongs to `SMTP_USER`. The form reports if the inquiry succeeds but the thank-you email fails.

## Set up on the live site

Add the same five settings in Vercel's **Project > Settings > Environment Variables** and redeploy. A local `.env.local` file does not configure the live site. See [Deploy to Vercel](./deploy-vercel.md).

The email function and thank-you template are in [contact.js](../api/contact.js). Before public launch, configure rate limiting or a CAPTCHA to reduce spam.
