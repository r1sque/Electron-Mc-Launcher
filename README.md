# Electron Minecraft Launcher

An attempt at making a minecraft launcher using electronjs and tailwincss 

## Project Structure

```
Electron-Mc-Launcher
├── public
│   ├── index.html          # Entry point HTML for the Electron app.
│   ├── input.css           # Tailwind CSS source file (custom styles).
│   ├── output.css          # Compiled CSS file for styling the app.
|   └── others
│       ├── home.html           # HTML for the main launcher interface.
│       ├── versions.html       # HTML for displaying available Minecraft versions.
│       ├── misc.html           # HTML for additional launcher functionalities.
│       └── settings.html       # HTML for user settings and preferences.
├── src
|   ├── main.js             # Main process script for starting the Electron application.
|   ├── renderer.js         # Script for managing the renderer process and handling UI interactions.
│   └── preload.js          # Preload script to safely expose APIs to the renderer process.
|
├── package.json            # npm configuration file containing dependencies and scripts.
├── tailwind.config.js      # Tailwind CSS configuration file for customizations.
└── README.md               # Project documentation, including setup instructions and features.
```

## ToDo:

- [x] Main UI
    - [ ] Improve UI design (small sizing)
- [x] Dynamic Main Content UI
- [x] Project readability
- [ ] Add Minecraft Launcher Logic
- [ ] Portable App

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/r1sque/Electron-Mc-Launcher.git
   ```

2. Navigate to the project directory:
   ```
   cd Electron-Mc-Launcher
   ```

3. Install the dependencies:
   ```
   npm install electron --save-dev
   npm install tailwindcss @tailwindcss/cli
   ```
   
   Follow the tutorial at on how to set them up : 
   - https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app
   - https://tailwindcss.com/docs/installation/tailwind-cli

4. Run the application:
   ```
   npm run build:css
   npm run start
   ```