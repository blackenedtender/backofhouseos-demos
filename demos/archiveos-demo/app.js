const state = {
  data: null,
  query: "",
  selectedAsset: null,
  preflightRan: false
};

const glyphs = {
  photo: "IMG",
  image: "PNG",
  video: "VID",
  design: "AI",
  document: "PDF"
};

const statusClass = (status) => `status-${status.toLowerCase().replace(/\s+/g, "-")}`;

async function loadData() {
  const response = await fetch("sample-data.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Unable to load sample-data.json");
  }
  return response.json();
}

function setText(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function renderMetrics() {
  const stats = state.data.stats;
  setText("metric-sources", stats.sourcesScanned);
  setText("metric-assets", stats.assetsIndexed.toLocaleString());
  setText("metric-reviews", stats.reviewActions);
  setText("metric-approved", stats.approvedForExport);
}

function filteredAssets() {
  const query = state.query.trim().toLowerCase();
  if (!query) return state.data.assets;
  return state.data.assets.filter((asset) => {
    const haystack = [
      asset.title,
      asset.kind,
      asset.memory,
      asset.status,
      asset.tags.join(" ")
    ].join(" ").toLowerCase();
    return haystack.includes(query);
  });
}

function renderBoard() {
  const board = document.getElementById("asset-board");
  const assets = filteredAssets();

  board.innerHTML = assets.map((asset) => `
    <article class="asset-card" style="--asset-color: ${asset.color}; --asset-accent: ${asset.accent}">
      <div class="asset-art">
        <span class="asset-kind">${asset.kind}</span>
        <span class="asset-glyph">${glyphs[asset.kind] || "ARC"}</span>
      </div>
      <div class="asset-body">
        <div>
          <h3>${asset.title}</h3>
          <p>${asset.memory}</p>
        </div>
        <div class="asset-meta">
          <span class="pill ${statusClass(asset.status)}">${asset.status}</span>
          <span class="pill">${asset.versions} version${asset.versions === 1 ? "" : "s"} found</span>
          <span class="pill">${asset.privacy}</span>
        </div>
        <div class="card-actions">
          <button class="button primary" type="button" data-resolve="${asset.id}">
            Resolve versions
          </button>
          <button class="button" type="button" data-set="${asset.id}">
            ${asset.set ? "In set" : "Add to set"}
          </button>
        </div>
      </div>
    </article>
  `).join("");

  if (!assets.length) {
    board.innerHTML = `<p class="empty">No sample assets matched this recall search.</p>`;
  }
}

function renderQueue() {
  const queue = document.getElementById("queue");
  const selected = state.data.assets.filter((asset) => asset.set);

  queue.innerHTML = selected.map((asset) => `
    <div class="queue-item">
      <div>
        <strong>${asset.title}</strong>
        <span>${asset.kind} / ${asset.status}</span>
      </div>
      <span>${asset.versions} versions</span>
    </div>
  `).join("");
}

function renderPreflight() {
  const list = document.getElementById("preflight-list");
  const report = state.data.exportReport;
  const base = [
    "No originals will be moved, renamed, or deleted.",
    "Exports are copy-only.",
    "Private and unresolved demo items are blocked."
  ];
  const items = state.preflightRan ? [...base, ...report.warnings] : base;
  list.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function renderJobs() {
  const jobs = document.getElementById("jobs-list");
  jobs.innerHTML = state.data.jobs.map((job) => `
    <div class="job-item">
      <div>
        <strong>${job.name}</strong>
        <span>${job.detail}</span>
      </div>
      <span class="pill">${job.state}</span>
    </div>
  `).join("");
}

function renderExport() {
  const report = state.data.exportReport;
  setText("export-rule", report.rule);
  setText("approved-count", report.approvedCopies);
  setText("blocked-count", report.blockedItems);
  document.getElementById("warnings").innerHTML = report.warnings
    .map((warning) => `<li>${warning}</li>`)
    .join("");
}

function openModal(assetId) {
  const asset = state.data.assets.find((item) => item.id === assetId);
  if (!asset) return;

  state.selectedAsset = asset;
  setText("modal-title", `${asset.versions} versions found`);
  setText(
    "modal-copy",
    `${asset.title}: choose the representative version while preserving every original source.`
  );

  const versionList = document.getElementById("version-list");
  versionList.innerHTML = Array.from({ length: asset.versions }).map((_, index) => {
    const version = index + 1;
    const label = version === 1 ? "recommended representative" : "preserved source variant";
    return `
      <div class="version-item" style="--asset-color: ${asset.color}">
        <div class="version-thumb" aria-hidden="true"></div>
        <div>
          <strong>${asset.title} v${version}</strong>
          <span>${label}</span>
        </div>
        <span class="pill">${version === 1 ? "candidate" : "kept"}</span>
      </div>
    `;
  }).join("");

  const modal = document.getElementById("modal");
  modal.hidden = false;
  document.getElementById("close-modal").focus();
}

function closeModal() {
  document.getElementById("modal").hidden = true;
  state.selectedAsset = null;
}

function bindEvents() {
  document.getElementById("search").addEventListener("input", (event) => {
    state.query = event.target.value;
    renderBoard();
  });

  document.getElementById("asset-board").addEventListener("click", (event) => {
    const resolveButton = event.target.closest("[data-resolve]");
    const setButton = event.target.closest("[data-set]");

    if (resolveButton) {
      openModal(resolveButton.dataset.resolve);
    }

    if (setButton) {
      const asset = state.data.assets.find((item) => item.id === setButton.dataset.set);
      if (asset && asset.status !== "Private") {
        asset.set = !asset.set;
        renderBoard();
        renderQueue();
      }
    }
  });

  document.getElementById("run-preflight").addEventListener("click", () => {
    state.preflightRan = true;
    renderPreflight();
  });

  document.getElementById("close-modal").addEventListener("click", closeModal);
  document.getElementById("keep-reviewing").addEventListener("click", closeModal);
  document.getElementById("mark-canonical").addEventListener("click", () => {
    if (state.selectedAsset) {
      state.selectedAsset.status = "Canonical";
      state.selectedAsset.set = true;
      renderBoard();
      renderQueue();
    }
    closeModal();
  });

  document.getElementById("modal").addEventListener("click", (event) => {
    if (event.target.id === "modal") closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !document.getElementById("modal").hidden) {
      closeModal();
    }
  });
}

function renderAll() {
  renderMetrics();
  renderBoard();
  renderQueue();
  renderPreflight();
  renderJobs();
  renderExport();
}

loadData()
  .then((data) => {
    state.data = data;
    renderAll();
    bindEvents();
  })
  .catch((error) => {
    document.body.innerHTML = `
      <main class="load-error">
        <h1>ArchiveOS demo could not load.</h1>
        <p>${error.message}</p>
        <p>Run this folder through a local static server so sample-data.json can be loaded.</p>
      </main>
    `;
  });
