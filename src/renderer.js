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


// Use the exposed `electronAPI` to send the "launch-minecraft" event
document.getElementById("launch-button").addEventListener("click", () => {
  window.electronAPI.send("launch-minecraft");
});

function filterList() {
  const input = document.getElementById("search").value.toLowerCase();
  const items = document.querySelectorAll(".version-item");

  items.forEach(item => {
    const version = item.getAttribute("data-version");
    if (version.includes(input)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Use event delegation to attach event listener to a parent element
  const mainContent = document.getElementById("mainContent");

  // Check if the button is clicked inside the mainContent
  mainContent.addEventListener("click", function (event) {
    if (event.target && event.target.id === "addVersionButton") {
      const overlay = document.getElementById("overlay");
      if (overlay) {
        overlay.classList.remove("hidden");
      }
    }

    // Handle closing the overlay
    if (event.target && event.target.id === "closeOverlay") {
      const overlay = document.getElementById("overlay");
      if (overlay) {
        overlay.classList.add("hidden");
      }
    }
  });
});
