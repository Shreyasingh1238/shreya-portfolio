# Run the portfolio on your computer

1. Open the project folder in VS Code.
2. Open **Terminal > New Terminal**.
3. Install the packages (needed after downloading the project or changing dependencies):

   ```bash
   npm install
   ```

4. Start the site:

   ```bash
   npm run dev
   ```

5. Open the **Local** address shown in the terminal. Leave the terminal running while you use the site. Press **Ctrl + C** to stop it.

After editing files, save them and refresh the browser if needed. Run `npm run build` to check the production build. To test email, first follow [Contact email setup](./contact-email.md). Restart the server after changing `.env.local`.
