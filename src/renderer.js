let selectedVersion = ""; // Store the selected version

function toggleDropdown() {
  document.getElementById("dropdown-menu").classList.toggle("hidden");
}

function filterVersions() {
  const searchValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const options = document.querySelectorAll("#dropdown-content .option");

  options.forEach((option) => {
    const text = option.innerText.toLowerCase();
    option.style.display = text.includes(searchValue) ? "block" : "none";
  });
}

document.querySelectorAll("#dropdown-content .option").forEach((option) => {
  option.addEventListener("click", function () {
    document.getElementById("selected-version").innerText = this.innerText;
    selectedVersion = this.getAttribute("data-value"); // Store the version
    document.getElementById("dropdown-menu").classList.add("hidden");
  });
});

// Launch button event listener
document.getElementById("launch-button").addEventListener("click", () => {
  if (selectedVersion) {
    window.electronAPI.send("launch-minecraft", selectedVersion);
  } else {
    alert("Please select a game version first!");
  }
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (!event.target.closest(".relative")) {
    document.getElementById("dropdown-menu").classList.add("hidden");
  }
});


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


// document.getElementById("launch-button").addEventListener("click", () => {
//   const version = document.getElementById("version-select").value;
//   window.electronAPI.send("launch-minecraft", version); 
// });

// function filterList() {
//   const input = document.getElementById("search").value.toLowerCase();
//   const items = document.querySelectorAll(".version-item");

//   items.forEach((item) => {
//     const version = item.getAttribute("data-version");
//     if (version.includes(input)) {
//       item.style.display = "";
//     } else {
//       item.style.display = "none";
//     }
//   });
// }

// function filterFunction() {
//   const input = document.getElementById("search").value.toUpperCase();
//   const links = document.querySelectorAll("#dropdownContent a");
//   links.forEach((link) => {
//     link.style.display = link.innerText.toUpperCase().includes(input)
//     ? "block"
//     : "none";
//   });
// }

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
