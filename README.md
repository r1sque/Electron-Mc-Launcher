# Electron Minecraft Launcher

An attempt at making a minecraft launcher using electronjs and tailwincss 

## Project Structure

```
Electron-Mc-Launcher
├── public
│   ├── index.html              # Entry point HTML for the Electron app.
│   ├── input.css               # Tailwind CSS source file (custom styles).
│   ├── output.css              # Compiled CSS file for styling the app.
├── src
|   ├── main.js                 # Main process script for starting the Electron application.
|   ├── renderer.js             # Script for managing the renderer process and handling UI interactions.
│   └── preload.js              # Preload script to safely expose APIs to the renderer process.
|
├── package.json                # npm configuration file containing dependencies and scripts.
├── tailwind.config.js          # Tailwind CSS configuration file for customizations.
└── README.md                   # Project documentation, including setup instructions and features.
```

## ToDo:

- [x] Main UI
   - [x] Improve UI design (small sizing)
   - [ ] Overhaul UI design
   - [ ] Add theme selection
- [x] Dynamic main content UI
- [x] Project readability
- [x] Add base Minecraft launcher logic
   - [x] Add logging in via Microsoft API
   - [x] Add version selector 
   - [ ] Get versions dynamically using an API like [PrismarineJS/minecraft-data](https://github.com/PrismarineJS/minecraft-data)
   - [ ] Create an account manager
- [x] Frameless app

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
   npm i electron --save-dev
   npm i tailwindcss @tailwindcss/cli
   npm i minecraft-launcher-core msmc
   ```
   
   Follow the tutorial at on how to set them up : 
   - https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app
   - https://tailwindcss.com/docs/installation/tailwind-cli
   - https://github.com/Pierce01/MinecraftLauncher-core

4. Run the application:
   ```
   npm run build:css
   npm run start
   ```

## Building the Application

To build the application for distribution:

   ```
   npm i electron-builder
   ```
and run:
   ```
   npm run build
   ```

This will create an executable file that can be run on your operating system.