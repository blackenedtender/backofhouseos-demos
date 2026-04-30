(function () {
  const storageKey = "boh-demo-theme";
  const modes = ["system", "dark", "light"];
  const root = document.documentElement;

  const configs = {
    archive: {
      name: "ArchiveOS Notebook",
      status: "public mirror",
      flow: "search -> representative card -> set -> preflight -> export",
      record: "sample assets",
      home: "#home",
      records: "#board",
      statusAnchor: "#jobs",
      settings: "#export"
    },
    runner: {
      name: "RunnerOS Notebook",
      status: "sample run archive",
      flow: "import -> review -> approve -> history",
      record: "fake training runs",
      home: "#dashboard",
      records: "#runs",
      statusAnchor: "#review",
      settings: "#approved"
    },
    inventory: {
      name: "Inventory Notebook",
      status: "public-safe demo",
      flow: "photo intake -> draft -> detail -> status history",
      record: "sample item records",
      home: "#dashboard",
      records: "#wall",
      statusAnchor: "#history",
      settings: "#detail"
    },
    revenue: {
      name: "Revenue Desk Notebook",
      status: "sanitized enterprise lineage",
      flow: "RFP intake -> structured record -> review -> reusable history",
      record: "fake opportunities",
      home: "#home",
      records: "#library",
      statusAnchor: "#status",
      settings: "#settings"
    },
    church: {
      name: "Church OS Notebook",
      status: "sanitized static demo",
      flow: "public intake -> review -> approval -> service truth",
      record: "fictional people/services",
      home: "index.html",
      records: "review.html",
      statusAnchor: "service-planner.html",
      settings: "program.html"
    },
    cookbook: {
      name: "Cookbook OS Notebook",
      status: "future concept",
      flow: "scan -> extract -> review -> recipe record",
      record: "placeholder sample data",
      home: "#home",
      records: "#concept",
      statusAnchor: "#status",
      settings: "#future"
    }
  };

  function configForPage() {
    const title = document.title.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    if (title.includes("runner") || path.includes("runner")) return configs.runner;
    if (title.includes("inventory") || path.includes("inventory")) return configs.inventory;
    if (title.includes("revenue") || path.includes("revenue")) return configs.revenue;
    if (title.includes("church") || path.includes("church")) return configs.church;
    if (title.includes("cookbook") || path.includes("cookbook")) return configs.cookbook;
    return configs.archive;
  }

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

  function logoMarkup() {
    return `
      <img class="notebook-logo-black" src="../../assets/tco-logo-black.png" alt="TCO">
      <img class="notebook-logo-white" src="../../assets/tco-logo-white.png" alt="TCO">
    `;
  }

  function installLogo() {
    if (document.querySelector(".notebook-logo-lockup")) return;
    const logo = document.createElement("a");
    logo.className = "notebook-logo-lockup";
    logo.href = "#";
    logo.setAttribute("aria-label", "The Creative Origin");
    logo.innerHTML = logoMarkup();

    const sidebar = document.querySelector(".sidebar");
    const brand = sidebar?.querySelector(".brand, .logo, h1");
    if (sidebar && brand) {
      brand.insertAdjacentElement("afterend", logo);
      return;
    }

    const topbar = document.querySelector(".topbar") || document.querySelector(".shell-header") || document.querySelector(".workspace-top");
    if (topbar) {
      topbar.appendChild(logo);
      return;
    }

    const main = document.querySelector("main") || document.querySelector(".workspace");
    if (main) main.insertAdjacentElement("afterbegin", logo);
  }

  function installThemeControls() {
    if (document.querySelector(".notebook-theme-group")) return;
    const group = document.createElement("div");
    group.className = "notebook-theme-group";
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", "Theme");
    group.innerHTML = modes.map((mode) => (
      `<button type="button" data-theme-choice="${mode}">${mode}</button>`
    )).join("");
    group.addEventListener("click", (event) => {
      const button = event.target.closest("[data-theme-choice]");
      if (button) applyTheme(button.dataset.themeChoice);
    });

    const target = document.querySelector(".sidebar-note") ||
      document.querySelector(".sidebar") ||
      document.querySelector(".topbar") ||
      document.querySelector(".shell-header") ||
      document.querySelector(".workspace-top");

    if (target) target.appendChild(group);
  }

  function installStatusStrip() {
    if (document.querySelector(".notebook-status-strip")) return;
    const config = configForPage();
    const strip = document.createElement("section");
    strip.className = "notebook-status-strip";
    strip.setAttribute("aria-label", "Demo status");
    strip.innerHTML = `
      <article><span>Notebook</span><strong>${config.name}</strong></article>
      <article><span>Status</span><strong>${config.status}</strong></article>
      <article><span>Flow</span><strong>${config.flow}</strong></article>
      <article><span>Data</span><strong>${config.record}</strong></article>
    `;

    const main = document.querySelector("main") || document.querySelector(".workspace");
    if (main) {
      const afterHero = main.children.length > 1 ? main.children[1] : null;
      main.insertBefore(strip, afterHero);
    }
  }

  function installBottomNav() {
    if (document.querySelector(".notebook-bottom-nav")) return;
    const config = configForPage();
    const nav = document.createElement("nav");
    nav.className = "notebook-bottom-nav";
    nav.setAttribute("aria-label", "Notebook navigation");
    nav.innerHTML = `
      <a href="${config.home}" class="active">Home</a>
      <a href="${config.records}">Records</a>
      <a class="notebook-bottom-mark" href="#" aria-label="The Creative Origin">${logoMarkup()}</a>
      <a href="${config.statusAnchor}">Status</a>
      <a href="${config.settings}">Settings</a>
    `;
    document.body.appendChild(nav);
  }

  function markLegacyChrome() {
    document.body.classList.add("inventory-notebook-skin");
    document.querySelectorAll(".boh-detail-band,.boh-freshness-band,.theme-dock,.tco-logo-lockup")
      .forEach((node) => node.remove());
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if ((localStorage.getItem(storageKey) || "system") === "system") applyTheme("system");
  });

  document.addEventListener("DOMContentLoaded", () => {
    markLegacyChrome();
    installLogo();
    installThemeControls();
    installStatusStrip();
    installBottomNav();
    applyTheme(localStorage.getItem(storageKey) || "system");
  });
})();
