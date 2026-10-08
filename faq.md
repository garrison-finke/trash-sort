## Stan Sprint 1: What I Did and Why (That I Didn’t Mention in Class)

 The first thing you’ll notice is that I added a new package. Since we are using npm to install Phaser into the GitHub repo, we need Vite to properly run the project in the browser and handle the npm imports.

   Because of this, whenever you retrieve the latest changes from origin, make sure to run:

   ```bash
   npm install
   ```

   This will install Phaser, Vite, and any other packages listed in the project.

Whenever you want to preview the game in the browser:

   1. Open the VS Code terminal in the project folder containing `index.html`.
   2. Type:

      ```bash
      npm run dev
      ```

   3. Press Enter.
   4. **Ctrl + Left Click** the URL Vite gives you in the terminal.

This will open the game in your browser using the local development server.
