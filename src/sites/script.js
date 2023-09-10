document.querySelector("titlebar > i#maximize").addEventListener("click", window.electronAPI.maximize);
document.querySelector("titlebar > i#minimize").addEventListener("click", window.electronAPI.minimize);
document.querySelector("titlebar > i#quit").addEventListener("click", window.electronAPI.quit);