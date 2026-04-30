const state = {
  data: null,
  status: "all",
  selected: null
};

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

function statusClass(status) {
  return status.toLowerCase().replace(/\s+/g, "-");
}

function filteredOpportunities() {
  if (state.status === "all") return state.data.opportunities;
  return state.data.opportunities.filter((opportunity) => opportunity.review_status === state.status);
}

function renderMetrics() {
  const metrics = state.data.metrics;
  setText("incoming-rfps", metrics.incoming_rfps);
  setText("cycle-time", metrics.average_cycle_time);
  setText("pass-rate", metrics.checklist_pass_rate);
  setText("pending-reviews", metrics.pending_reviews);
  setText("reuse-rate", metrics.reuse_rate);
  setText("velocity", metrics.response_velocity);
}

function renderOpportunities() {
  const grid = document.getElementById("opportunity-grid");
  grid.innerHTML = filteredOpportunities().map((opportunity) => `
    <article class="opportunity-card" data-opportunity="${opportunity.id}" tabindex="0">
      <div>
        <span class="pill ${statusClass(opportunity.review_status)}">${opportunity.review_status}</span>
        <h3>${opportunity.opportunity_name}</h3>
        <p>${opportunity.client_name} / ${opportunity.vertical}</p>
      </div>
      <p>${opportunity.generated_brief_summary}</p>
      <div class="pills">
        <span class="pill">${opportunity.deal_value}</span>
        <span class="pill">due ${opportunity.due_date}</span>
        <span class="pill">${opportunity.checklist_score}% checklist</span>
      </div>
    </article>
  `).join("");
}

function renderRecord(opportunity) {
  state.selected = opportunity;
  setText("record-title", opportunity.opportunity_name);
  setText("record-summary", opportunity.generated_brief_summary);
  setText("record-client", opportunity.client_name);
  setText("record-value", opportunity.deal_value);
  setText("record-due", opportunity.due_date);
  setText("record-owner", opportunity.owner);
  setText("record-score", `${opportunity.checklist_score}%`);

  document.getElementById("record-assets").innerHTML = opportunity.requested_assets
    .map((asset) => `<li>${asset}</li>`)
    .join("");

  document.getElementById("record-timeline").innerHTML = opportunity.timeline
    .map((event) => `<li>${event}</li>`)
    .join("");
}

function renderGovernance() {
  document.getElementById("governance-list").innerHTML = state.data.governance
    .map((item) => `<div class="governance-item">${item}</div>`)
    .join("");
}

function bindEvents() {
  document.getElementById("status-filter").addEventListener("change", (event) => {
    state.status = event.target.value;
    renderOpportunities();
  });

  document.getElementById("opportunity-grid").addEventListener("click", (event) => {
    const card = event.target.closest("[data-opportunity]");
    if (!card) return;
    const opportunity = state.data.opportunities.find((item) => item.id === card.dataset.opportunity);
    if (opportunity) renderRecord(opportunity);
  });

  document.getElementById("opportunity-grid").addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest("[data-opportunity]");
    if (!card) return;
    event.preventDefault();
    const opportunity = state.data.opportunities.find((item) => item.id === card.dataset.opportunity);
    if (opportunity) renderRecord(opportunity);
  });
}

function renderAll() {
  renderMetrics();
  renderOpportunities();
  renderRecord(state.data.opportunities[0]);
  renderGovernance();
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
        <h1>Revenue Desk demo could not load.</h1>
        <p>${error.message}</p>
        <p>Run this folder through a local static server so sample-data.json can be loaded.</p>
      </main>
    `;
  });
