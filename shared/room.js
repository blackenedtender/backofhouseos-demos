(function () {
  const root = document.documentElement;

  function logoMarkup() {
    return '<img src="/assets/tco-logo-web.png" alt="">';
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

  function defaultState() {
    const room = document.body.dataset.room || "";
    const status = document.body.dataset.status || "HELD";
    const fallback = {
      room: status === "HELD" ? "no" : "yes",
      data: "No public data",
      interaction: status === "HELD" ? "held" : "static",
      inspectable: "no public room"
    };

    if (room === "revenuedeskos") {
      return {
        room: "yes",
        data: "Synthetic sample",
        interaction: "interactive",
        inspectable: "sample RFP records, draft brief, review queue"
      };
    }
    if (room === "archiveos") {
      return {
        room: "yes",
        data: "Synthetic sample",
        interaction: "interactive",
        inspectable: "sample asset board, version resolver, export report"
      };
    }
    if (room === "inventoryos") {
      return {
        room: "yes",
        data: "Synthetic sample",
        interaction: "interactive",
        inspectable: "sample item wall, filters, item history"
      };
    }
    if (room === "runneros") {
      return {
        room: "yes",
        data: "Synthetic sample",
        interaction: "interactive",
        inspectable: "sample runs, import queue, approved run detail"
      };
    }
    if (room === "churchos") {
      return {
        room: "yes",
        data: "Sanitized snapshot",
        interaction: "static",
        inspectable: "sanitized Sunday operations pages"
      };
    }
    if (room === "cookbookos") {
      return {
        room: "yes",
        data: "Concept walkthrough",
        interaction: "static",
        inspectable: "source-to-canon recipe walkthrough"
      };
    }

    return fallback;
  }

  function ensureImplementationState(scope) {
    if (scope.querySelector(".implementation-state")) return;
    const anchor = scope.querySelector(".room-state");
    if (!anchor) return;
    const state = defaultState();
    const values = {
      room: document.body.dataset.roomAvailable || state.room,
      data: document.body.dataset.data || state.data,
      interaction: document.body.dataset.interaction || state.interaction,
      inspectable: document.body.dataset.inspectable || state.inspectable
    };
    const dl = document.createElement("dl");
    dl.className = "implementation-state";
    dl.setAttribute("aria-label", "Implementation state");
    dl.innerHTML =
      "<div><dt>Room</dt><dd>" + values.room + "</dd></div>" +
      "<div><dt>Data</dt><dd>" + values.data + "</dd></div>" +
      "<div><dt>Interaction</dt><dd>" + values.interaction + "</dd></div>" +
      "<div><dt>Inspect</dt><dd>" + values.inspectable + "</dd></div>";
    anchor.insertAdjacentElement("afterend", dl);
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
    ensureImplementationState(scope);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
