# Edit portfolio content

Most of the displayed content is currently in [main.jsx](../src/main.jsx). In VS Code, use **Ctrl + F** to search for the exact words you want to change, edit the text, and save. Keep the surrounding tags and quotation marks intact.

| To change | Search for |
| --- | --- |
| Home introduction and heading | `Building digital` or `Hi,` |
| About me | `Curious by nature` |
| Skills and tools | `THE TOOLKIT` |
| Project titles and descriptions | `Travel Management System` or `Event Ticketing` |
| Experience and education | `THE JOURNEY SO FAR` |
| Services | `WHAT I DO` |
| Contact section | `GET IN TOUCH` |

For the displayed email and LinkedIn URL, edit the `email` and `linkedin` values near the top of [main.jsx](../src/main.jsx). Search for the phone number to update both the visible number and its `tel:` link. The email delivery destination is configured separately as `CONTACT_EMAIL`; see [Contact email setup](./contact-email.md).

Project repository URLs have their own file: see [Project and GitHub links](./project-links.md). After edits, run the site and check the affected section. Run `npm run build` to catch mistakes, then [redeploy](./deploy-vercel.md).
