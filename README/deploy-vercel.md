# Put your portfolio online: GitHub to Vercel

This guide starts with the project on your computer and ends with a live website. You need a GitHub account, a Vercel account, and your Google app password. The app password shown in the earlier screenshot must be deleted and replaced before use.

## Part 1: Check the site on your computer

1. Open the project in VS Code and open **Terminal > New Terminal**.
2. Run `npm install` if the packages have not been installed yet.
3. Run `npm run build`. Check that it finishes successfully.
4. Run `npm run dev`, open the Local URL displayed in the terminal, and check the site. Press **Ctrl + C** to stop it when finished.
5. If you have set up email locally, test the form with a second email address. See [Contact email setup](./contact-email.md).

## Part 2: Create a GitHub repository

1. Sign in at [github.com](https://github.com/).
2. Click the **+** icon in the top right and choose **New repository**.
3. Enter a name such as `shreya-portfolio`.
4. Choose **Private** if you want the source code visible only to you and people you authorize. The deployed website itself can still be public.
5. Leave the options to add a README, `.gitignore`, and license unchecked: this project already contains its own files.
6. Click **Create repository**. Leave the page open; GitHub will show your repository URL.

## Part 3: Upload the project using VS Code and Git

This project may not yet have Git initialized. In the VS Code terminal, run the following commands one at a time from the project folder:

```bash
git init
git branch -M main
git add .
git status
```

Review the list shown by `git status`. **`.env.local` must not appear in the list**: it contains your private app password and is excluded by the project's `.gitignore`. Do not continue if it appears. Also check that `node_modules` and `dist` are excluded.

Then run:

```bash
git commit -m "Add portfolio website"
```

If Git asks for your identity, set your name and email using `git config --global user.name "Your Name"` and `git config --global user.email "your-email@example.com"`, then repeat the commit. Use your own values.

Copy your repository's HTTPS URL from GitHub. Replace the example URL below with your own, then run:

```bash
git remote add origin https://github.com/YOUR-USERNAME/shreya-portfolio.git
git push -u origin main
```

If Git asks you to sign in, complete the GitHub sign-in flow in your browser. Refresh the GitHub repository page and confirm that files such as `package.json`, `src`, `public`, and `api` are visible. **Do not upload `.env.local` or your app password.**

If `git` is not recognized, install [Git for Windows](https://git-scm.com/downloads/win), restart VS Code, and try again. If the remote already exists, inspect `git remote -v` before changing anything.

## Part 4: Import the repository into Vercel

1. Sign in to [vercel.com](https://vercel.com/). You can use your GitHub account.
2. On the dashboard, choose **Add New > Project**.
3. Under **Import Git Repository**, find your portfolio repository and click **Import**. If it is missing, use the GitHub connection or repository access option and grant access to this repository.
4. Choose a project name. Leave the root directory at the repository root. Vercel should detect **Vite**; select it if necessary. The build command is `npm run build` and the output directory is `dist`.
5. Before clicking Deploy, open **Environment Variables** and add each of the following. Choose the Production environment when offered; select Preview too if you want preview deployments to send email.

   | Name | Value |
   | --- | --- |
   | `SMTP_HOST` | `smtp.gmail.com` |
   | `SMTP_PORT` | `465` |
   | `SMTP_USER` | `shreysingh1238@gmail.com`, or your sending Gmail address |
   | `SMTP_PASS` | Your **new** Google app password, entered privately without spaces |
   | `CONTACT_EMAIL` | `shreysingh1238@gmail.com`, or the address that should receive messages |

6. Click **Deploy**. Wait for the build to finish. Open the website link Vercel provides.

Do not add `VITE_` to these names. Do not put the app password in source files, GitHub, screenshots, or chat. The local `.env.local` file does not automatically configure Vercel.

## Part 5: Test the live portfolio

1. Open the Vercel URL and check the site on desktop and mobile.
2. Click **Download CV** and open the downloaded PDF.
3. If you added project URLs, click each project card and check it opens the right repository.
4. Fill in the contact form with a different email address you can access. Send a test message.
5. Check `CONTACT_EMAIL` for your inquiry notification. Check the visitor address for the thank-you email; check spam folders in both inboxes.

If the form says email is not configured, verify all five environment variables in Vercel. If delivery fails, check the function logs and that the app password belongs to the Gmail account in `SMTP_USER`. After changing environment variables, open **Deployments**, select the latest deployment's menu, and choose **Redeploy**. Settings apply to new deployments.

## Part 6: Publish future edits

1. Make and save your changes locally. Run `npm run build` and check the site.
2. In the terminal, run `git status` and make sure private files such as `.env.local` are not listed.
3. Run `git add .`, then `git commit -m "Update portfolio"`, then `git push`.
4. Vercel normally creates a new deployment automatically for the connected branch. Open the deployment in Vercel, wait for it to finish, and test the changed section.

Your website and the Vercel serverless contact function are in one project. Before public launch, configure rate limiting or a CAPTCHA to reduce spam. For more information, see [Vercel's Vite guide](https://vercel.com/docs/frameworks/frontend/vite) and [environment variable guide](https://vercel.com/docs/environment-variables/managing-environment-variables).
