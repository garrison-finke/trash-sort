## Stan Sprint 1: What I Did and Why (That I Didn’t Mention in Class)

The first thing you’ll notice is that I added a new package. Since we are using npm to install Phaser into the GitHub repo, we need Vite to properly run the project in the browser and handle the npm imports.

Because of this, whenever you retrieve the latest changes from origin, make sure to run:

```bash
npm install
```

This will install Phaser, Vite, and any other packages listed in the project.

Whenever you want to preview the game in the browser:

1. Open the VS Code terminal in the project folder containing `index.html`.

2. Run:

   ```bash
   npm install
   ```

   Honestly, run this command each time your branch updates from `main` in case we add anything else new.

3. If you have not yet run a production build, you can run:

   ```bash
   npm run build
   ```

   You only really need to run the build before pushing a branch, before deployment, or whenever you want to make sure the production version still works. When you are just previewing your code changes while developing, use the command in the next step instead.

4. To run the project while developing, type:

   ```bash
   npm run dev
   ```

5. Press Enter.
6. **Ctrl + Left Click** the URL Vite gives you in the terminal.

This will open the game in your browser using the local development server.

If you want to test the production build locally after running `npm run build`, use:

```bash
npm run preview
```
