(function () {
  const details = {
    "ArchiveOS Demo": {
      cards: [
        ["Workflow", "Search -> representative card -> review versions -> add to set -> preflight -> export report."],
        ["Governance", "The demo keeps originals untouched and shows how approved copies are separated from private or unresolved records."],
        ["Proof Surface", "Use this page for portfolio screenshots of the memory board, version review, jobs, and export safety loop."]
      ]
    },
    "RunnerOS Demo": {
      cards: [
        ["Workflow", "Import run -> hold for review -> approve record -> update dashboard and effort history."],
        ["Governance", "Pending imports stay out of totals until reviewed, preserving a cleaner private archive of effort."],
        ["Proof Surface", "Use dashboard, weekly trend, review queue, and approved run detail as screenshot anchors."]
      ]
    },
    "Inventory OS Demo": {
      cards: [
        ["Workflow", "Photo intake -> draft item -> confirm detail -> status history -> usable inventory surface."],
        ["Governance", "Sample records separate drafts, listed items, available stock, and sold/archive states."],
        ["Proof Surface", "Use item wall, intake mock, detail view, and history trail as portfolio screenshots."]
      ]
    },
    "Revenue Desk Demo": {
      cards: [
        ["Workflow", "RFP intake -> structured record -> checklist review -> internal brief -> approval -> reusable history."],
        ["Governance", "Read-only source posture, human review, and audit-style status history keep response work controlled."],
        ["Proof Surface", "Use metrics, review queue, deal record, scoreboard, and safety section for public proof."]
      ]
    },
    "Cookbook OS Demo": {
      cards: [
        ["Workflow", "Scan cookbook page -> extract recipe draft -> review -> approve searchable recipe record."],
        ["Governance", "Future concept only. No private household notes or real scanned pages are included."],
        ["Proof Surface", "Use this as a placeholder lane until a source-backed prototype exists."]
      ]
    },
    "Church OS Demo": {
      cards: [
        ["Workflow", "Public intake -> staff review -> approval -> role-aware service and people surfaces."],
        ["Governance", "Sanitized static demo only. Runtime records, member data, and private church operations stay out."],
        ["Proof Surface", "Use intake, review, service planner, people, and program pages as screenshot anchors."]
      ]
    }
  };

  const storageKey = "boh-demo-theme";
  const modes = ["system", "light", "dark"];
  const root = document.documentElement;

  function effectiveTheme(mode) {
    if (mode === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return mode;
  }

  function applyTheme(mode) {
    root.dataset.themeMode = mode;
    root.dataset.theme = effectiveTheme(mode);
    localStorage.setItem(storageKey, mode);
    document.querySelectorAll("[data-theme-choice]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.themeChoice === mode));
    });
  }

  function installThemeDock() {
    if (document.querySelector(".theme-dock")) return;
    const dock = document.createElement("div");
    dock.className = "theme-dock";
    dock.setAttribute("aria-label", "Theme controls");
    dock.innerHTML = modes.map((mode) => (
      `<button type="button" data-theme-choice="${mode}">${mode}</button>`
    )).join("");
    dock.addEventListener("click", (event) => {
      const button = event.target.closest("[data-theme-choice]");
      if (button) applyTheme(button.dataset.themeChoice);
    });
    document.body.appendChild(dock);
  }

  function installLogoLockup() {
    if (document.querySelector(".tco-logo-lockup")) return;
    const logo = document.createElement("a");
    logo.className = "tco-logo-lockup";
    logo.href = "#";
    logo.setAttribute("aria-label", "The Creative Origin");
    logo.innerHTML = `
      <img class="tco-logo-black" src="../../assets/tco-logo-black.svg" alt="TCO">
      <img class="tco-logo-white" src="../../assets/tco-logo-white.svg" alt="TCO">
    `;

    const sidebar = document.querySelector(".sidebar");
    const brand = sidebar?.querySelector(".brand");
    if (sidebar && brand) {
      brand.insertAdjacentElement("afterend", logo);
      return;
    }

    const topbar = document.querySelector(".topbar") || document.querySelector(".shell-header");
    if (topbar) {
      topbar.appendChild(logo);
      return;
    }

    const main = document.querySelector("main");
    if (main) main.insertAdjacentElement("afterbegin", logo);
  }

  function installFreshnessBand() {
    if (document.querySelector(".boh-freshness-band")) return;
    const isFuture = document.title.includes("Cookbook");
    const status = isFuture ? "future concept" : "review-ready";
    const band = document.createElement("section");
    band.className = "boh-freshness-band";
    band.setAttribute("aria-label", "Demo freshness");
    band.innerHTML = `
      <article class="boh-freshness-item"><span>Data</span><strong>sample only</strong></article>
      <article class="boh-freshness-item"><span>Theme</span><strong>system / light / dark</strong></article>
      <article class="boh-freshness-item"><span>Vercel</span><strong>static folder root</strong></article>
      <article class="boh-freshness-item"><span>Status</span><strong>${status}</strong></article>
    `;
    const detailBand = document.querySelector(".boh-detail-band");
    if (detailBand) {
      detailBand.parentNode.insertBefore(band, detailBand);
    } else {
      const footer = document.querySelector("footer");
      if (footer) footer.parentNode.insertBefore(band, footer);
    }
  }

  function detailConfig() {
    const title = document.title;
    if (title.includes("RunnerOS")) return details["RunnerOS Demo"];
    if (title.includes("Inventory")) return details["Inventory OS Demo"];
    if (title.includes("Revenue Desk")) return details["Revenue Desk Demo"];
    if (title.includes("Cookbook")) return details["Cookbook OS Demo"];
    if (title.includes("Church")) return details["Church OS Demo"];
    return details["ArchiveOS Demo"];
  }

  function installDetailBand() {
    if (document.querySelector(".boh-detail-band")) return;
    const config = detailConfig();
    const band = document.createElement("section");
    band.className = "boh-detail-band";
    band.setAttribute("aria-label", "Demo details");
    band.innerHTML = config.cards.map(([title, copy]) => `
      <article class="boh-detail-card">
        <span>Demo detail</span>
        <h2>${title}</h2>
        <p>${copy}</p>
      </article>
    `).join("");
    const footer = document.querySelector("footer");
    if (footer) {
      footer.parentNode.insertBefore(band, footer);
    } else {
      document.body.appendChild(band);
    }
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if ((localStorage.getItem(storageKey) || "system") === "system") applyTheme("system");
  });

  document.addEventListener("DOMContentLoaded", () => {
    installLogoLockup();
    installThemeDock();
    installDetailBand();
    installFreshnessBand();
    applyTheme(localStorage.getItem(storageKey) || "system");
  });
})();
