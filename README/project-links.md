# Add or change project GitHub links

1. Open [projectLinks.js](../src/projectLinks.js).
2. Copy the full URL of each GitHub repository and place it between the quotes next to the matching project:

   ```js
   export const projectLinks = {
     travel: 'https://github.com/your-username/travel-project',
     event: 'https://github.com/your-username/event-project',
   }
   ```

3. Save the file. On the **Selected Work** section, click each project card to check its link. The card is clickable only when its URL is filled in.
4. Upload and redeploy your changes so visitors can use the links.

Leave a value as `''` if the project has no public repository. Private repositories require visitors to have access. To change project titles or descriptions, follow [Edit portfolio content](./edit-content.md).
