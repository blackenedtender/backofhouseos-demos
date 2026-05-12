(function () {
  const storageKey = "boh-demo-theme";
  const modes = ["light", "dark"];
  const root = document.documentElement;

  function applyTheme(mode) {
    const next = modes.includes(mode) ? mode : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem(storageKey, next); } catch (_) { /* no-op */ }
    document.querySelectorAll("[data-theme-choice]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.themeChoice === next));
    });
  }

  function logoMarkup() {
    return '<img src="../../assets/tco-logo-web.png" alt="">';
  }

  function ensureBrandMark(scope) {
    const existing = scope.querySelector(".brand-mark, .app-logo, .logo-mark");
    if (existing) {
      existing.classList.add("brand-mark");
      if (!existing.querySelector("img")) {
        existing.innerHTML = logoMarkup();
      }
      return;
    }
    const brand = scope.querySelector(".brand, .room-identity");
    if (!brand) return;
    const mark = document.createElement("span");
    mark.className = "brand-mark";
    mark.innerHTML = logoMarkup();
    brand.insertAdjacentElement("afterbegin", mark);
  }

  function ensureBackLink(scope) {
    if (scope.querySelector(".room-back")) return;
    const target = scope.querySelector(".room-top, .topbar, .shell-header");
    if (!target) return;
    const back = document.createElement("a");
    back.className = "room-back";
    back.href = "/";
    back.setAttribute("aria-label", "Back to TCO Demo Studio");
    back.innerHTML = '<span class="room-back-arrow" aria-hidden="true">←</span><span class="room-back-label">Demo Studio</span>';
    target.insertAdjacentElement("afterbegin", back);
  }

  function ensureStatusPill(scope) {
    const status = document.body.dataset.status;
    if (!status) return;
    if (scope.querySelector(".room-status")) return;
    const brand = scope.querySelector(".room-identity, .brand");
    if (!brand) return;
    const pill = document.createElement("span");
    pill.className = "room-status";
    pill.textContent = status;
    brand.appendChild(pill);
  }

  function installThemeControls(scope) {
    if (scope.querySelector(".product-theme-toggle")) return;
    const controls = document.createElement("div");
    controls.className = "product-theme-toggle";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "Theme");
    controls.innerHTML = modes
      .map((mode) => `<button type="button" data-theme-choice="${mode}">${mode}</button>`)
      .join("");
    controls.addEventListener("click", (event) => {
      const button = event.target.closest("[data-theme-choice]");
      if (button) applyTheme(button.dataset.themeChoice);
    });

    const target =
      scope.querySelector(".room-top .room-nav") ||
      scope.querySelector(".room-top") ||
      scope.querySelector(".topbar .nav") ||
      scope.querySelector(".shell-header .nav") ||
      scope.querySelector(".workspace-top") ||
      scope.querySelector(".sidebar") ||
      scope.querySelector(".topbar") ||
      scope.querySelector(".shell-header");

    if (target) target.appendChild(controls);
  }

  function boot() {
    document.body.classList.add("boh-room");
    document
      .querySelectorAll(
        ".boh-detail-band,.boh-freshness-band,.theme-dock,.tco-logo-lockup,.notebook-bottom-nav,.notebook-status-strip"
      )
      .forEach((node) => node.remove());

    const scope = document;
    ensureBrandMark(scope);
    ensureBackLink(scope);
    ensureStatusPill(scope);
    installThemeControls(scope);

    let stored = null;
    try { stored = localStorage.getItem(storageKey); } catch (_) { /* no-op */ }
    applyTheme(stored || "dark");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
