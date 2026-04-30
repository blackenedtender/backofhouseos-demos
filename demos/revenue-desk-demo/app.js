const state = {
  data: null,
  status: "all",
  selected: null
};

async function loadData() {
  const response = await fetch("sample-data.json", { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load sample-data.json");
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

function rfpText(opportunity) {
  return `Context: ${opportunity.client_name} is requesting ${opportunity.opportunity_name}. Vertical: ${opportunity.vertical}. Value: ${opportunity.deal_value}. Due: ${opportunity.due_date}. Asks: ${opportunity.requested_assets.join("; ")}.`;
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

  document.getElementById("record-reuse").innerHTML = opportunity.reuse_candidates
    .map((item) => `<li>${item}</li>`)
    .join("");

  document.getElementById("record-timeline").innerHTML = opportunity.timeline
    .map((event) => `<li>${event}</li>`)
    .join("");

  document.getElementById("rfp-text").value = rfpText(opportunity);
  renderSampleButtons();
}

function renderSampleButtons() {
  const holder = document.getElementById("sample-buttons");
  holder.innerHTML = state.data.opportunities.map((opportunity) => `
    <button type="button" data-sample="${opportunity.id}" aria-pressed="${state.selected?.id === opportunity.id}">
      ${opportunity.opportunity_name}
    </button>
  `).join("");
}

function renderLibrary() {
  const table = document.getElementById("library-table");
  table.innerHTML = state.data.opportunities.map((opportunity) => `
    <div class="library-row">
      <strong>${opportunity.opportunity_name}</strong>
      <span>${opportunity.client_name}</span>
      <span>${opportunity.review_status}</span>
      <span>${opportunity.reuse_candidates.length} reuse links</span>
    </div>
  `).join("");
}

function renderGovernance() {
  document.getElementById("governance-list").innerHTML = state.data.governance
    .map((item) => `<div class="governance-item">${item}</div>`)
    .join("");
}

function generateSummary() {
  const opportunity = state.selected || state.data.opportunities[0];
  const missing = opportunity.missing_fields.length
    ? `Missing fields: ${opportunity.missing_fields.join(", ")}.`
    : "No required fields are missing.";

  document.getElementById("draft-output").innerHTML = `
    <strong>${opportunity.opportunity_name}</strong><br>
    ${opportunity.generated_brief_summary}<br><br>
    Owner: ${opportunity.owner}. Checklist: ${opportunity.checklist_score}%. ${missing}
  `;
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

  document.getElementById("sample-buttons").addEventListener("click", (event) => {
    const button = event.target.closest("[data-sample]");
    if (!button) return;
    const opportunity = state.data.opportunities.find((item) => item.id === button.dataset.sample);
    if (opportunity) renderRecord(opportunity);
  });

  document.getElementById("generate-summary").addEventListener("click", generateSummary);
  document.getElementById("save-project").addEventListener("click", () => {
    document.getElementById("draft-output").innerHTML += "<br><br><strong>Saved to sample Projects board.</strong>";
  });
}

function renderAll() {
  renderMetrics();
  renderOpportunities();
  renderLibrary();
  renderGovernance();
  renderRecord(state.data.opportunities[0]);
  generateSummary();
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
