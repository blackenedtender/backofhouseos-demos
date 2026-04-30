const state = {
  runs: [],
  filter: "all"
};

async function loadRuns() {
  const response = await fetch("sample-runs.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Unable to load sample-runs.json");
  }
  const data = await response.json();
  state.runs = data.runs;
}

function approvedRuns() {
  return state.runs.filter((run) => run.review_status === "approved");
}

function pendingRuns() {
  return state.runs.filter((run) => run.review_status === "pending");
}

function raceRun() {
  return approvedRuns().find((run) => run.type === "race") || approvedRuns()[0];
}

function setText(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function miles(value) {
  return `${Number(value).toFixed(1)} mi`;
}

function renderDashboard() {
  const approved = approvedRuns();
  const pending = pendingRuns();
  const total = approved.reduce((sum, run) => sum + run.distance_miles, 0);
  const longest = approved.reduce((best, run) => run.distance_miles > best.distance_miles ? run : best, approved[0]);
  const recent = [...approved].sort((a, b) => b.date.localeCompare(a.date))[0];

  setText("total-miles", total.toFixed(1));
  setText("longest-run", miles(longest.distance_miles));
  setText("pending-count", pending.length);
  setText("approved-count", approved.length);
  setText("recent-title", recent.title);
  setText("recent-meta", `${miles(recent.distance_miles)} / ${recent.pace} pace / ${recent.date}`);
}

function renderTrend() {
  const trend = document.getElementById("trend");
  const weekly = new Map();

  approvedRuns().forEach((run) => {
    weekly.set(run.week, (weekly.get(run.week) || 0) + run.distance_miles);
  });

  const values = Array.from(weekly.entries());
  const max = Math.max(...values.map(([, value]) => value));

  trend.innerHTML = values.map(([week, value]) => {
    const height = Math.max(16, Math.round((value / max) * 150));
    return `
      <div class="trend-bar">
        <span>${week.replace("2026-", "")}</span>
        <div class="bar" style="height: ${height}px" aria-hidden="true"></div>
        <strong>${value.toFixed(1)}</strong>
      </div>
    `;
  }).join("");
}

function renderImports() {
  const list = document.getElementById("import-list");
  list.innerHTML = pendingRuns().map((run) => `
    <article class="import-card">
      <div>
        <h3>${run.title}</h3>
        <p>${run.date} / ${miles(run.distance_miles)} / ${run.source}</p>
      </div>
      <span class="pill pending">pending</span>
    </article>
  `).join("");
}

function renderRuns() {
  const grid = document.getElementById("run-grid");
  const runs = approvedRuns()
    .filter((run) => state.filter === "all" || run.type === state.filter)
    .sort((a, b) => b.date.localeCompare(a.date));

  grid.innerHTML = runs.map((run) => `
    <article class="run-card">
      <div>
        <span class="pill approved">${run.type}</span>
        <h3>${run.title}</h3>
        <p>${run.date}</p>
      </div>
      <div class="run-stats">
        <span>${miles(run.distance_miles)}</span>
        <span>${run.pace} pace</span>
        <span>${run.elevation_ft} ft</span>
      </div>
      <p>${run.notes}</p>
    </article>
  `).join("");
}

function renderReview() {
  const list = document.getElementById("review-list");
  list.innerHTML = pendingRuns().map((run) => `
    <article class="review-card">
      <div>
        <h3>${run.title}</h3>
        <p>${run.notes}</p>
        <p>${miles(run.distance_miles)} / ${run.duration} / ${run.elevation_ft} ft</p>
      </div>
      <span class="pill pending">needs review</span>
    </article>
  `).join("");
}

function renderDetail() {
  const run = raceRun();
  setText("detail-title", run.title);
  setText("detail-notes", run.notes);
  setText("detail-distance", miles(run.distance_miles));
  setText("detail-duration", run.duration);
  setText("detail-pace", run.pace);
  setText("detail-elevation", `${run.elevation_ft} ft`);
}

function bindEvents() {
  document.getElementById("run-filter").addEventListener("change", (event) => {
    state.filter = event.target.value;
    renderRuns();
  });
}

function renderAll() {
  renderDashboard();
  renderTrend();
  renderImports();
  renderRuns();
  renderReview();
  renderDetail();
}

loadRuns()
  .then(() => {
    renderAll();
    bindEvents();
  })
  .catch((error) => {
    document.body.innerHTML = `
      <main class="load-error">
        <h1>RunnerOS demo could not load.</h1>
        <p>${error.message}</p>
        <p>Run this folder through a local static server so sample-runs.json can be loaded.</p>
      </main>
    `;
  });
