let selectedVersion = ""; // Store the selected version

// Fetch and populate Minecraft versions
async function populateVersions() {
  const dropdownContent = document.getElementById("dropdown-content"); 

  try {
    // Fetch Minecraft versions from the main process
    /** @type {Array} */
    const versions = await window.electronAPI.getMinecraftVersions();// tf does that come from (electronAPI)

    if (dropdownContent && versions) {
      versions.forEach((version) => {
        const option = document.createElement("div");
        option.className = "option ver cursor-pointer";
        option.textContent = version.id;
        option.setAttribute("data-value", version.id);

        // Handle version selection
        option.addEventListener("click", function () {
          document.getElementById("selected-version").innerText = this.innerText;
          selectedVersion = this.getAttribute("data-value"); // Store the version
          document.getElementById("dropdown-menu").classList.add("hidden");
        });

        dropdownContent.appendChild(option);
      });
    }
  } catch (error) {
    console.error("Failed to fetch versions:", error);
  }
}

// Update the UI with the logged-in account
function updateAccountUI(account) {
  const loggingArea = document.getElementById("logging");
  if (loggingArea) {
    loggingArea.innerHTML = `
      <div class="option flex items-center justify-between gap-4 transition-colors duration-400 rounded-md py-2 px-3 cursor-pointer hover:bg-white/10 overflow-hidden">
          <div class="flex-1 min-w-0 items-start">
              <h6 class="font-semibold text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                  ${account.username}
              </h6>
              <p class="bg-gradient-to-r from-amber-200 to-amber-100 text-transparent bg-clip-text text-xs">
                  Premium Account
              </p>
          </div>
          <button id="removeAccount" class="fill-amber-50 transition-colors duration-400 hover:fill-[#e78788]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="h-6 w-6">
                  <path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" />
              </svg>
          </button>
      </div>
    `;
  }
}

// Toggle the dropdown visibility
function VersionMenu() {
  document.getElementById("dropdown-menu").classList.toggle("hidden");
}

function AccountMenu() {
  document.getElementById("account-menu").classList.toggle("hidden");
}

// Filter versions based on search input
function filterVersions() {
  const versionValue = document.getElementById("versionInput").value.toLowerCase();
  const accountValue = document.getElementById("accountInput").value.toLowerCase().replaceAll(/\s+/g, '');
  const versionOptions = document.querySelectorAll("#dropdown-content .option");
  const accountOptions = document.querySelectorAll("#account-menu .option");

  versionOptions.forEach((option) => {
    const text = option.innerText.toLowerCase();
    option.style.display = text.replaceAll(/\s+/g, '').includes(versionValue) ? "block" : "none";
  });
  accountOptions.forEach((option) => {
    const text = option.innerText.toLowerCase();
    option.style.display = text.replaceAll(/\s+/g, '').includes(accountValue) ? "flex" : "none";
  });
}

function setupOverlay() {
  const overlay = document.getElementById("overlay");
  const overlayContent = document.querySelector(".overlay-content");
  const showOverlayBtn = document.getElementById("showOverlay");
  const closeOverlayBtn = document.getElementById("closeOverlay");

  function toggleOverlay(show) {
    overlay.style.display = show ? "flex" : "none";
  }

  showOverlayBtn.addEventListener("click", () => toggleOverlay(true));
  closeOverlayBtn.addEventListener("click", () => toggleOverlay(false));

  overlay.addEventListener("click", (event) => {
    if (!overlayContent.contains(event.target)) {
      toggleOverlay(false);
    }
  });
}

// Launch button event listener
document.getElementById("launch-button").addEventListener("click", () => {
  if (selectedVersion) {
    window.electronAPI.send("launch-minecraft", selectedVersion);
  } else {
    alert("Please select a game version first!");
  }
});

document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll("#removeAccount").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent the click event from bubbling up
      this.closest(".option").remove();
    });
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (!event.target.closest(".relative") && !event.target.closest("#account-menu")) {
    document.getElementById("dropdown-menu").classList.add("hidden");
    document.getElementById("account-menu").classList.add("hidden");
  }
});

// Initialize overlay functionality when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setupOverlay();
  populateVersions(); // Ensure versions are populated when the DOM is loaded
});

// Minimize Button
document.getElementById("minimize").addEventListener("click", () => {
  window.electronAPI.send("minimize-window");
});

// Restore Button
document.getElementById("restore").addEventListener("click", () => {
  window.electronAPI.send("restore-window");
});

// Close Button
document.getElementById("close").addEventListener("click", () => {
  window.electronAPI.send("close-window");
});



// Initialize overlay functionality when the DOM is loaded
// document.addEventListener("DOMContentLoaded", setupOverlay);
//
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
