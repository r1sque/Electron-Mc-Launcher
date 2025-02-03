document.getElementById("launch-button").addEventListener("click", () => {
  const version = document.getElementById("version-select").value;
  window.electronAPI.send("launch-minecraft", version); 
});

function filterList() {
  const input = document.getElementById("search").value.toLowerCase();
  const items = document.querySelectorAll(".version-item");

  items.forEach((item) => {
    const version = item.getAttribute("data-version");
    if (version.includes(input)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

// Minimize Button
document.getElementById('minimize').addEventListener('click', () => {
    window.electronAPI.send("minimize-window");
});

// Restore Button
document.getElementById('restore').addEventListener('click', () => {
    window.electronAPI.send("restore-window");
});

// Close Button
document.getElementById('close').addEventListener('click', () => {
    window.electronAPI.send("close-window");
});

// document
//   .getElementById("homeButton")
//   .addEventListener("click", () => window.electronAPI.loadPage("home.html"));
// document
//   .getElementById("versionsButton")
//   .addEventListener("click", () =>
//     window.electronAPI.loadPage("versions.html")
//   );
// document
//   .getElementById("modsButton")
//   .addEventListener("click", () => window.electronAPI.loadPage("misc.html"));
// document
//   .getElementById("settingsButton")
//   .addEventListener("click", () =>
//     window.electronAPI.loadPage("settings.html")
//   );

// window.electronAPI.onPageContent((content) => {
//   document.getElementById("mainContent").innerHTML = content;
// });

// document.addEventListener("DOMContentLoaded", function () {

//   const mainContent = document.getElementById("mainContent");

//   mainContent.addEventListener("click", function (event) {
//     if (event.target && event.target.id === "addVersionButton") {
//       const overlay = document.getElementById("overlay");
//       if (overlay) {
//         overlay.classList.remove("hidden");
//       }
//     }

//     // Handle closing the overlay
//     if (event.target && event.target.id === "closeOverlay") {
//       const overlay = document.getElementById("overlay");
//       if (overlay) {
//         overlay.classList.add("hidden");
//       }
//     }
//   });
// });
