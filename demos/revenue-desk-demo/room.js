(function () {
  const root = document.documentElement;

  function logoMarkup() {
    return '<img src="assets/tco-logo-web.png" alt="">';
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
    const onCanonical = /(^|\.)philbap\.com$/i.test(location.hostname);
    const canonicalHref = "https://demos.philbap.com/";
    const existing = scope.querySelector(".room-back");
    if (existing) {
      // Refine an HTML-rendered anchor: tighten href + label for the host.
      if (onCanonical) {
        existing.classList.remove("is-canonical-pointer");
        existing.setAttribute("href", "/");
        existing.setAttribute("aria-label", "Back to the Demo Gallery");
        const labelEl = existing.querySelector(".room-back-label");
        if (labelEl) labelEl.textContent = "Demo Gallery";
      } else {
        existing.classList.add("is-canonical-pointer");
        existing.setAttribute("href", canonicalHref);
        existing.setAttribute("aria-label", "Open canonical site demos.philbap.com");
        const labelEl = existing.querySelector(".room-back-label");
        if (labelEl) labelEl.textContent = "demos.philbap.com";
      }
      return;
    }
    const target = scope.querySelector(".room-top, .topbar, .shell-header");
    if (!target) return;
    const back = document.createElement("a");
    back.className = "room-back";
    back.href = onCanonical ? "/" : canonicalHref;
    if (!onCanonical) back.classList.add("is-canonical-pointer");
    back.setAttribute(
      "aria-label",
      onCanonical ? "Back to the Demo Gallery" : "Open canonical site demos.philbap.com"
    );
    const label = onCanonical ? "Demo Gallery" : "demos.philbap.com";
    back.innerHTML =
      '<span class="room-back-arrow" aria-hidden="true">←</span>' +
      '<span class="room-back-label">' + label + '</span>';
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

  function boot() {
    document.body.classList.add("boh-room");
    // Commit to dark — gallery continuity. Drop any prior light preference.
    root.dataset.theme = "dark";

    document
      .querySelectorAll(
        ".boh-detail-band,.boh-freshness-band,.theme-dock,.tco-logo-lockup," +
        ".notebook-bottom-nav,.notebook-status-strip,.product-theme-toggle,.theme-toggle-group"
      )
      .forEach((node) => node.remove());

    const scope = document;
    ensureBrandMark(scope);
    ensureBackLink(scope);
    ensureStatusPill(scope);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
