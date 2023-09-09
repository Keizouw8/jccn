module.exports = {
  packagerConfig: {
    asar: true,
    icon: "src/assets/icons/icon"
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        setupIcon: "src/assets/icons/icon.ico"
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        options: {
          icon: "src/assets/icons/icon.icns"
        }
      }
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          icon: "src/assets/icon0.jpg"
        }
      },
    }
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
};
