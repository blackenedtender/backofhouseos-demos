const state = {
  data: null,
  status: "all",
  selected: null,
  featured: null
};

function shortDate(iso) {
  if (!iso) return "";
  const d = new Date(String(iso) + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function shortMoney(value) {
  if (!value) return "";
  const n = Number(String(value).replace(/[^0-9]/g, ""));
  if (!n) return String(value);
  if (n >= 1000000) {
    const m = n / 1000000;
    return "$" + (Math.round(m * 10) / 10).toString().replace(/\.0$/, "") + "M";
  }
  if (n >= 1000) return "$" + Math.round(n / 1000) + "K";
  return String(value);
}

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function loadData() {
  const response = await fetch("/revenuedeskos/sample-data.json", { cache: "no-store" });
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

function nextActionLabel(opportunity) {
  if (opportunity.missing_fields && opportunity.missing_fields.length) {
    return "Awaiting: " + opportunity.missing_fields.join(", ");
  }
  if (opportunity.review_status === "approved") return "Response direction approved";
  if (opportunity.review_status === "ready for approval") return "Ready for final approval";
  if (opportunity.review_status === "pending review") return "Awaiting reviewer";
  return opportunity.review_state || opportunity.review_status;
}

function renderOpportunities() {
  const grid = document.getElementById("opportunity-grid");
  const items = filteredOpportunities();
  if (state.featured && !items.find((o) => o.id === state.featured)) {
    state.featured = items.length ? items[0].id : null;
  }
  grid.innerHTML = items.map((opportunity) => {
    const isFeatured = opportunity.id === state.featured;
    const status = escapeHtml(opportunity.review_status);
    const company = escapeHtml(opportunity.client_name) + " · " + escapeHtml(opportunity.vertical);
    const meta = shortMoney(opportunity.deal_value) + " · due " + shortDate(opportunity.due_date);
    const next = escapeHtml(nextActionLabel(opportunity));
    return `
      <article class="opportunity-card ${isFeatured ? "is-featured" : ""}" data-opportunity="${opportunity.id}" tabindex="0" aria-pressed="${isFeatured}">
        <header class="opp-head">
          <span class="pill ${statusClass(opportunity.review_status)}">${status}</span>
          <span class="opp-meta" aria-hidden="${!isFeatured}">${escapeHtml(meta)}</span>
        </header>
        <h3>${escapeHtml(opportunity.opportunity_name)}</h3>
        <p class="opp-company">${company}</p>
        ${isFeatured ? `<p class="opp-summary">${escapeHtml(opportunity.generated_brief_summary)}</p>` : ""}
        <p class="opp-next"><span class="opp-next-label">Next</span>${next}</p>
        ${isFeatured ? `<a class="opp-open" href="#record" data-open="${opportunity.id}">Inspect full record →</a>` : ""}
      </article>
    `;
  }).join("");
}

function setFlowStep(step) {
  const stepEls = document.querySelectorAll(".flow-step");
  stepEls.forEach((el) => {
    const n = Number(el.dataset.step);
    el.classList.toggle("is-active", n === step);
    el.classList.toggle("is-passed", n < step);
  });
}

function renderFlowPanels(opportunity) {
  const sourceEl = document.getElementById("flow-source");
  if (sourceEl) sourceEl.textContent = opportunity.source_excerpt;

  const structuredEl = document.getElementById("flow-structured");
  if (structuredEl) {
    structuredEl.innerHTML = opportunity.structured_fields
      .map((field) => `<li>${escapeHtml(field)}</li>`)
      .join("");
  }

  const blockerStateEl = document.getElementById("flow-blocker-state");
  const blockersEl = document.getElementById("flow-blockers");
  if (blockerStateEl && blockersEl) {
    const missing = opportunity.missing_fields || [];
    if (missing.length === 0) {
      blockerStateEl.textContent = "No blockers · final approval only.";
      blockerStateEl.className = "panel-body flow-blocker-state is-clear";
      blockersEl.innerHTML = "";
    } else {
      blockerStateEl.textContent = missing.length + " blocker" + (missing.length === 1 ? "" : "s") + " on this record.";
      blockerStateEl.className = "panel-body flow-blocker-state is-blocked";
      blockersEl.innerHTML = missing
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("");
    }
  }

  const draftEl = document.getElementById("flow-draft");
  if (draftEl) {
    draftEl.innerHTML =
      `<p class="draft-summary">${escapeHtml(opportunity.generated_brief_summary)}</p>` +
      `<ul class="panel-list">` +
      opportunity.draft_brief_fragments.map((f) => `<li>${escapeHtml(f)}</li>`).join("") +
      `</ul>`;
    delete draftEl.dataset.generated;
  }

  const saveState = document.getElementById("save-state");
  if (saveState) {
    saveState.hidden = true;
    delete saveState.dataset.saved;
  }

  setFlowStep(opportunity.missing_fields && opportunity.missing_fields.length ? 3 : 2);
}

function renderRecord(opportunity) {
  state.selected = opportunity;
  state.featured = opportunity.id;

  setText("record-status", opportunity.review_status);
  const statusEl = document.getElementById("record-status");
  if (statusEl) statusEl.className = "pill " + statusClass(opportunity.review_status);

  setText("record-title", opportunity.opportunity_name);
  setText("record-company", `${opportunity.client_name} · ${opportunity.vertical}`);
  setText("record-summary", opportunity.generated_brief_summary);
  setText("record-source", opportunity.source_excerpt);
  setText("record-next", nextActionLabel(opportunity));

  setText("record-client", opportunity.client_name);
  setText("record-value", opportunity.deal_value);
  setText("record-due", shortDate(opportunity.due_date));
  setText("record-owner", opportunity.owner);
  setText("record-score", `${opportunity.checklist_score}%`);

  document.getElementById("record-fields").innerHTML = opportunity.structured_fields
    .map((field) => `<li>${escapeHtml(field)}</li>`)
    .join("");

  document.getElementById("record-draft").innerHTML = opportunity.draft_brief_fragments
    .map((fragment) => `<li>${escapeHtml(fragment)}</li>`)
    .join("");

  document.getElementById("record-reuse").innerHTML = opportunity.reuse_candidates
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  document.getElementById("record-timeline").innerHTML = opportunity.timeline
    .map((event) => `<li>${escapeHtml(event)}</li>`)
    .join("");

  const assetsEl = document.getElementById("record-assets");
  if (assetsEl) {
    assetsEl.innerHTML = opportunity.requested_assets
      .map((asset) => `<li>${escapeHtml(asset)}</li>`)
      .join("");
  }

  renderFlowPanels(opportunity);
  renderSampleButtons();
  renderOpportunities();
}

function renderSampleButtons() {
  const holder = document.getElementById("sample-buttons");
  if (!holder) return;
  holder.innerHTML = state.data.opportunities.map((opportunity) => {
    const active = state.selected && state.selected.id === opportunity.id;
    return `
      <button type="button" class="flow-chip ${active ? "is-active" : ""}" data-sample="${opportunity.id}" aria-pressed="${active ? "true" : "false"}" role="tab">
        <span class="flow-chip-client">${escapeHtml(opportunity.client_name)}</span>
        <span class="flow-chip-name">${escapeHtml(opportunity.opportunity_name)}</span>
      </button>
    `;
  }).join("");
}

function renderArtifacts() {
  const holder = document.getElementById("proof-artifacts");
  if (!holder) return;
  holder.innerHTML = state.data.artifacts.map((artifact) => `
    <article class="artifact-card">
      <img src="${artifact.image}" alt="${artifact.image_alt}" loading="lazy">
      <div class="artifact-meta"><span>${artifact.classification}</span></div>
      <h3>${artifact.title}</h3>
      <p>${artifact.summary}</p>
    </article>
  `).join("");
}

function renderLineageNote() {
  const note = state.data.demo.lineage_note;
  if (!note) return;
  setText(
    "lineage-copy",
    `${note.label}. Extracted structurally: ${note.extracted_structure.join(", ")}. Sanitized: ${note.sanitized.join(", ")}. Not exposed: ${note.not_exposed.join(", ")}.`
  );
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

function renderReviewQueue() {
  const queue = document.getElementById("review-queue");
  if (!queue) return;
  const reviewItems = state.data.opportunities.filter((opportunity) => opportunity.review_status !== "approved");
  queue.innerHTML = reviewItems.map((opportunity) => {
    const missing = opportunity.missing_fields.length
      ? opportunity.missing_fields.join(", ")
      : "Final approval";
    return `
      <article class="review-item">
        <span class="pill ${statusClass(opportunity.review_status)}">${escapeHtml(opportunity.review_status)}</span>
        <strong>${escapeHtml(opportunity.opportunity_name)}</strong>
        <p>${escapeHtml(missing)}</p>
      </article>
    `;
  }).join("");
}

function generateSummary() {
  const opportunity = state.selected || state.data.opportunities[0];
  const missing = opportunity.missing_fields && opportunity.missing_fields.length
    ? `<p class="draft-note">Open blockers: ${escapeHtml(opportunity.missing_fields.join(", "))}.</p>`
    : `<p class="draft-note">No blockers — ready for final approval.</p>`;

  const draftEl = document.getElementById("flow-draft");
  if (draftEl) {
    draftEl.innerHTML =
      `<p class="draft-title">${escapeHtml(opportunity.opportunity_name)}</p>` +
      `<p class="draft-summary">${escapeHtml(opportunity.generated_brief_summary)}</p>` +
      `<ul class="panel-list">` +
      opportunity.draft_brief_fragments.map((f) => `<li>${escapeHtml(f)}</li>`).join("") +
      `</ul>` +
      missing +
      `<p class="draft-foot">Synthetic draft only. Nothing is submitted or sent.</p>`;
    draftEl.dataset.generated = "true";
  }
  setFlowStep(4);
}

function bindEvents() {
  document.getElementById("status-filter").addEventListener("change", (event) => {
    state.status = event.target.value;
    renderOpportunities();
  });

  document.getElementById("opportunity-grid").addEventListener("click", (event) => {
    const open = event.target.closest("[data-open]");
    if (open) {
      // Let the anchor navigate to #record; just ensure the right opportunity is rendered.
      const opportunity = state.data.opportunities.find((item) => item.id === open.dataset.open);
      if (opportunity) renderRecord(opportunity);
      return;
    }
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
    const saveState = document.getElementById("save-state");
    if (!saveState) return;
    if (!saveState.dataset.saved) {
      saveState.textContent = "Sample saved locally for this demo session.";
      saveState.hidden = false;
      saveState.dataset.saved = "true";
      return;
    }
    saveState.textContent = "Sample already saved in this browser session.";
  });
}

function renderAll() {
  renderMetrics();
  renderOpportunities();
  renderArtifacts();
  renderLineageNote();
  renderLibrary();
  renderGovernance();
  renderReviewQueue();
  renderRecord(state.data.opportunities[0]);
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
