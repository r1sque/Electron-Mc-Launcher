document
  .getElementById("homeButton")
  .addEventListener("click", () => window.electronAPI.loadPage("home.html"));
document
  .getElementById("versionsButton")
  .addEventListener("click", () =>
    window.electronAPI.loadPage("versions.html")
  );
document
  .getElementById("modsButton")
  .addEventListener("click", () => window.electronAPI.loadPage("misc.html"));
document
  .getElementById("settingsButton")
  .addEventListener("click", () =>
    window.electronAPI.loadPage("settings.html")
  );

window.electronAPI.onPageContent((content) => {
  document.getElementById("mainContent").innerHTML = content;
});
