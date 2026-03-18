// Force Mermaid to always use dark theme so white text is readable
window.addEventListener("load", function () {
  if (typeof mermaid !== "undefined") {
    mermaid.initialize({
      theme: "dark",
      themeVariables: {
        darkMode: true,
        background: "#1e2a3a",
        primaryColor: "#1A5276",
        primaryTextColor: "#ffffff",
        lineColor: "#8899aa",
        textColor: "#e0e0e0",
        mainBkg: "#1e2a3a",
        nodeBorder: "#445566",
      },
    });
  }

  // Add print buttons to every page
  addPrintButtons();
});

// Re-add buttons on navigation (mkdocs-material uses instant loading)
document.addEventListener("DOMContentLoaded", function () {
  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      addPrintButtons();
    });
  }
});

function addPrintButtons() {
  // Remove existing buttons to avoid duplicates
  document.querySelectorAll(".print-buttons").forEach(function (el) {
    el.remove();
  });

  var content = document.querySelector(".md-content__inner");
  if (!content) return;

  // Find the first h1 element
  var h1 = content.querySelector("h1");
  if (!h1) return;

  // Create button container
  var container = document.createElement("div");
  container.className = "print-buttons";

  // Print This Page button
  var printPageBtn = document.createElement("button");
  printPageBtn.className = "print-btn print-btn--page";
  printPageBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>' +
    " Print This Page";
  printPageBtn.addEventListener("click", function () {
    window.print();
  });

  // Print Entire Book button
  var printBookBtn = document.createElement("a");
  printBookBtn.className = "print-btn print-btn--book";
  printBookBtn.href = "/print_page/";
  printBookBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>' +
    " Download Entire Book as PDF";

  container.appendChild(printPageBtn);
  container.appendChild(printBookBtn);

  // Insert after h1
  h1.parentNode.insertBefore(container, h1.nextSibling);
}
