(function () {
  const storageKey = "boh-demo-theme";
  const modes = ["light", "dark"];
  const root = document.documentElement;

  function applyTheme(mode) {
    const next = modes.includes(mode) ? mode : "light";
    root.dataset.theme = next;
    localStorage.setItem(storageKey, next);
    document.querySelectorAll("[data-theme-choice]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.themeChoice === next));
    });
  }

  function logoMarkup() {
    return '<img src="assets/tco-logo-web.png" alt="TCO">';
  }

  function installBrandLogo() {
    const existingMark = document.querySelector(".brand-mark, .app-logo, .logo-mark");
    if (existingMark) {
      existingMark.classList.add("brand-mark");
      existingMark.innerHTML = logoMarkup();
      return;
    }

    const brand = document.querySelector(".brand");
    if (!brand) return;
    const mark = document.createElement("span");
    mark.className = "brand-mark";
    mark.innerHTML = logoMarkup();
    brand.insertAdjacentElement("afterbegin", mark);
  }

  function installThemeControls() {
    if (document.querySelector(".product-theme-toggle")) return;
    const controls = document.createElement("div");
    controls.className = "product-theme-toggle";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "Theme");
    controls.innerHTML = modes.map((mode) => (
      `<button type="button" data-theme-choice="${mode}">${mode}</button>`
    )).join("");
    controls.addEventListener("click", (event) => {
      const button = event.target.closest("[data-theme-choice]");
      if (button) applyTheme(button.dataset.themeChoice);
    });

    const target = document.querySelector(".topbar .nav") ||
      document.querySelector(".shell-header .nav") ||
      document.querySelector(".workspace-top") ||
      document.querySelector(".sidebar") ||
      document.querySelector(".topbar") ||
      document.querySelector(".shell-header");

    if (target) target.appendChild(controls);
  }

  function boot() {
    document.body.classList.add("boh-product-family");
    document.querySelectorAll(".boh-detail-band,.boh-freshness-band,.theme-dock,.tco-logo-lockup,.notebook-bottom-nav,.notebook-status-strip")
      .forEach((node) => node.remove());
    installBrandLogo();
    installThemeControls();
    applyTheme(localStorage.getItem(storageKey) || "light");
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
