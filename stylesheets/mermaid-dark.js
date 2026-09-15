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
});
