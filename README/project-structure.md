# Project structure

| Location | Purpose |
| --- | --- |
| [src/main.jsx](../src/main.jsx) | Page sections, text, form, and navigation |
| [src/style.css](../src/style.css) | Colors, typography, spacing, and responsive layout |
| [src/projectLinks.js](../src/projectLinks.js) | GitHub URLs for the two project cards |
| [public/](../public/) | Downloadable CV and favicon |
| [api/contact.js](../api/contact.js) | Server-side Nodemailer contact function and thank-you template |
| [index.html](../index.html) | HTML entry point, browser title, and description |
| [vite.config.js](../vite.config.js) | Vite configuration and local contact function support |
| [package.json](../package.json) | Packages and commands |
| `.env.local` | Private local email settings; never upload or share it |
| [README/](./) | These step-by-step guides |

`node_modules` contains installed packages and `dist` contains generated build output. You normally do not edit them directly.
