(function () {
  "use strict";

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const STAGE_LABELS = ["Capture", "Preserve", "Structure", "Review", "Approve", "Surface", "Receipt"];

  const MODULES = [
    {
      key: "revenuedeskos",
      name: "RevenueDeskOS",
      subtitle: "Revenue intake reviewed before response",
      status: "LIVE",
      group: "live",
      route: "/revenuedeskos/",
      stages: [
        "An RFP arrives as a long, scattered email thread.",
        "The original message is kept verbatim; nothing rewritten.",
        "Scope, value, owner, and deadline are pulled into fields.",
        "Missing context is flagged; a reviewer is assigned.",
        "Response direction is approved before any draft moves.",
        "The signed-off brief becomes the working response packet.",
        "Trail kept. Client RFP material is not shown here."
      ],
      ai: "Drafts a structured brief from raw RFP text.",
      human: "Approves response direction and the final brief.",
      sealed: "Client documents, stakeholder details, prior bid history."
    },
    {
      key: "archiveos",
      name: "ArchiveOS",
      subtitle: "Source preserved, versions reviewed, recall earned",
      status: "LIVE",
      group: "live",
      route: "/archiveos/",
      stages: [
        "A messy folder of sources is dropped in for indexing.",
        "Originals are checksummed and left untouched on disk.",
        "Versions, captions, and metadata are extracted to a record.",
        "Conflicting versions surface for human resolution.",
        "A representative version is approved as canonical.",
        "Recall and export expose only approved copies.",
        "Change log kept. Original source stays as-is."
      ],
      ai: "Suggests version groupings and recall keywords.",
      human: "Resolves conflicting versions and picks the representative one.",
      sealed: "Private filenames, local paths, full source manifests."
    },
    {
      key: "inventoryos",
      name: "InventoryOS",
      subtitle: "Item intake reviewed before listing",
      status: "LIVE",
      group: "live",
      route: "/inventoryos/",
      stages: [
        "An item enters intake from photos and a short note.",
        "Photos and source notes are preserved as the record's basis.",
        "Title, category, condition, and price draft are extracted.",
        "Condition and pricing are flagged for operator review.",
        "Listing readiness is approved on the item record.",
        "Status surfaces as ready-to-list on the operator wall.",
        "History trail kept. Sourcing context not exposed."
      ],
      ai: "Drafts title, category, and a price suggestion.",
      human: "Confirms condition, price, and listing readiness.",
      sealed: "Real operator inventory, marketplace records, sourcing notes."
    },
    {
      key: "runneros",
      name: "RunnerOS",
      subtitle: "A private archive of effort",
      status: "LIVE",
      group: "snapshot",
      route: "/runneros/",
      stages: [
        "A run import enters the queue from an external source.",
        "Raw activity data is preserved as the import record.",
        "Distance, pace, shoe, route, and race context are extracted.",
        "Imports stay in review and do not change dashboard truth.",
        "Approval promotes the run into the personal record.",
        "Dashboard and recall update to include the approved run.",
        "Health and exact GPS stay private; shares stay generic."
      ],
      ai: "Drafts shoe, route, and race context from raw fields.",
      human: "Approves each run before it counts toward memory.",
      sealed: "Health data, exact GPS routes, training-load history."
    },
    {
      key: "churchos",
      name: "ChurchOS",
      subtitle: "Sunday operations, sanitized snapshot",
      status: "SNAPSHOT",
      group: "snapshot",
      route: "/churchos/",
      stages: [
        "A new Sunday service week is opened on the planner.",
        "Service items, songbook references, and notes are attached.",
        "Roles are assigned to demo people, not real members.",
        "The packet is reviewed for unapproved or missing items.",
        "Approval converts the packet into the working program.",
        "Public-facing program is derived from approved state.",
        "Reference archive preserved. Member data not in this demo."
      ],
      ai: "Drafts call-to-worship language and packet copy.",
      human: "Approves service order, role access, and program output.",
      sealed: "Member records, contact details, live church identity."
    },
    {
      key: "cookbookos",
      name: "CookbookOS",
      subtitle: "Manuscript-to-canon, concept demo",
      status: "CONCEPT",
      group: "snapshot",
      route: "/cookbookos/",
      stages: [
        "A scanned cookbook page enters as a manuscript record.",
        "The page image is preserved as the source of truth.",
        "OCR drafts ingredients and steps as a candidate recipe.",
        "Uncertain lines surface for a human reading.",
        "The reviewed recipe is approved as a canon entry.",
        "Canon is searchable and linked back to its source page.",
        "Unreviewed drafts remain candidates; source stays archival."
      ],
      ai: "OCRs the page and drafts a structured recipe.",
      human: "Reads uncertain lines and approves canon status.",
      sealed: "Family pages, source archives, full OCR confidence logs."
    },
    {
      key: "manillaos",
      name: "ManillaOS",
      subtitle: "Authority review and canon promotion",
      status: "HELD",
      group: "held",
      route: "",
      stages: [
        "A candidate source enters the review queue.",
        "The original document is preserved and frozen.",
        "Evidence and interpretation are separated from source.",
        "A reviewer reads evidence and assigns a verdict.",
        "Approval promotes the candidate to a canon record.",
        "Registry surfaces the new record with its full receipt.",
        "Unapproved candidates remain non-authoritative."
      ],
      ai: "Drafts interpretation and suggests evidence pulls.",
      human: "Assigns verdicts and promotes candidates to canon.",
      sealed: "Source workbook content, reviewer notes, authority history."
    },
    {
      key: "canonos",
      name: "CanonOS",
      subtitle: "Operating doctrine and term registry",
      status: "HELD",
      group: "held",
      route: "",
      stages: [
        "A new term is proposed as a candidate definition.",
        "Existing canon and related terms surface as context.",
        "Definition, boundary, and module links are drafted.",
        "Reviewers read the boundary and check for conflict.",
        "Approval marks the term canonical.",
        "Registry updates and dependent modules can reference it.",
        "AI-drafted text remains candidate until reviewed."
      ],
      ai: "Drafts definitions and suggests related terms.",
      human: "Approves boundaries and confirms canonical entries.",
      sealed: "Private doctrine drafts, internal naming history."
    },
    {
      key: "jobradaros",
      name: "JobRadarOS",
      subtitle: "A decision desk for role review",
      status: "HELD",
      group: "held",
      route: "",
      stages: [
        "A role sighting enters the review queue from a feed.",
        "Source URL, company, and posting text are preserved.",
        "Match angle, fit, and a resume direction are drafted.",
        "Company context and recency are checked for freshness.",
        "A verdict is assigned and the application angle approved.",
        "An application packet is produced with proof of fit.",
        "Rejected or stale roles are archived for audit."
      ],
      ai: "Drafts match angles, resume cuts, and outreach drafts.",
      human: "Sets verdict, freshness, and what actually goes out.",
      sealed: "Personal search data, applied-to records, scoring history."
    },
    {
      key: "mediaos",
      name: "MediaOS",
      subtitle: "A capture inbox that becomes memory",
      status: "HELD",
      group: "held",
      route: "",
      stages: [
        "A screenshot or link is captured into the inbox.",
        "The original capture and its source are preserved.",
        "A short description, type, and project are drafted.",
        "A human reviews whether the capture is worth keeping.",
        "Approval promotes the capture into project memory.",
        "Recall surfaces media against related work.",
        "Raw captures remain available but never become canon."
      ],
      ai: "Drafts descriptions and classifies capture types.",
      human: "Decides what becomes memory and what is discarded.",
      sealed: "Original media files, exact source URLs, private folders."
    }
  ];

  // -------------------- DOM --------------------
  const root = document.documentElement;
  const body = document.body;
  const groupLists = {
    live: document.querySelector('.module-list[data-group="live"]'),
    snapshot: document.querySelector('.module-list[data-group="snapshot"]'),
    held: document.querySelector('.module-list[data-group="held"]')
  };
  const loopSpine = document.getElementById("loop-spine");
  const loopStations = Array.from(document.querySelectorAll(".loop-stations li"));
  const trailItems = Array.from(document.querySelectorAll(".evidence-trail li"));
  const previewTitle = document.getElementById("preview-title");
  const previewSubtitle = document.getElementById("preview-subtitle");
  const previewStatus = document.getElementById("preview-status");
  const previewLink = document.getElementById("preview-link");
  const previewHeld = document.getElementById("preview-held");
  const prevAi = document.getElementById("prev-ai");
  const prevHuman = document.getElementById("prev-human");
  const prevSealed = document.getElementById("prev-sealed");

  if (!groupLists.live || !loopStations.length || !trailItems.length) return;

  // -------------------- Build module list --------------------
  const moduleEntries = [];
  let rank = 0;
  MODULES.forEach((m) => {
    rank += 1;
    const list = groupLists[m.group] || groupLists.live;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `module-entry status-${m.status.toLowerCase()}`;
    btn.dataset.module = m.key;
    btn.dataset.status = m.status;
    btn.dataset.group = m.group;
    btn.dataset.route = m.route || "";
    btn.setAttribute("aria-pressed", "false");
    btn.innerHTML = `
      <span class="module-rank">${String(rank).padStart(2, "0")}</span>
      <span class="module-status">${m.status}</span>
      <span class="module-title">${m.name}</span>
      <span class="module-purpose">${m.subtitle}</span>`;
    btn.addEventListener("click", () => runModule(m.key));
    btn.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "mouse" || e.pointerType === "pen") runModule(m.key);
    });
    btn.addEventListener("focus", () => runModule(m.key));
    btn.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); focusEntry(moduleEntries.indexOf(btn) + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); focusEntry(moduleEntries.indexOf(btn) - 1); }
    });
    list.appendChild(btn);
    moduleEntries.push(btn);
  });

  function focusEntry(i) {
    const next = moduleEntries[(i + moduleEntries.length) % moduleEntries.length];
    if (next) next.focus();
  }

  // -------------------- Run controller --------------------
  let runTimer = null;
  let currentKey = null;
  const STEP_MS = REDUCED ? 0 : 360;

  function clearRun() {
    if (runTimer) { clearTimeout(runTimer); runTimer = null; }
  }

  function setProgress(stage) {
    const pct = (stage / 6) * 100;
    root.style.setProperty("--loop-progress", `${pct}%`);
  }

  function lightStage(stage) {
    loopStations[stage] && loopStations[stage].classList.add("is-lit");
    if (trailItems[stage]) trailItems[stage].classList.add("is-lit");
    setProgress(stage);
    if (stage === 6) loopSpine && loopSpine.classList.add("is-complete");
  }

  function paintModule(data) {
    if (!data) return;
    body.dataset.activeModule = data.key;

    moduleEntries.forEach((btn) => {
      const active = btn.dataset.module === data.key;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    previewTitle.textContent = data.name;
    previewSubtitle.textContent = data.subtitle;
    previewStatus.textContent = data.status;
    previewStatus.className = `preview-status status-${data.status.toLowerCase()}`;

    trailItems.forEach((li, i) => {
      const em = li.querySelector("em");
      if (em) em.textContent = data.stages[i] || "";
      li.classList.remove("is-lit");
    });
    loopStations.forEach((li) => li.classList.remove("is-lit"));
    loopSpine && loopSpine.classList.remove("is-complete");

    if (prevAi)     prevAi.textContent = data.ai || "";
    if (prevHuman)  prevHuman.textContent = data.human || "";
    if (prevSealed) prevSealed.textContent = data.sealed || "";

    if (data.route) {
      previewLink.href = data.route;
      previewLink.textContent = "Open demo";
      previewLink.hidden = false;
      previewHeld.hidden = true;
    } else {
      previewLink.hidden = true;
      previewLink.removeAttribute("href");
      previewHeld.hidden = false;
    }
  }

  function runModule(key) {
    if (key === currentKey && runTimer) return;
    clearRun();
    const data = MODULES.find((m) => m.key === key);
    if (!data) return;
    currentKey = key;
    paintModule(data);
    setProgress(0);

    if (REDUCED) {
      for (let i = 0; i < 7; i++) lightStage(i);
      return;
    }

    let i = 0;
    function tick() {
      lightStage(i);
      i++;
      if (i < 7) runTimer = setTimeout(tick, STEP_MS);
      else runTimer = null;
    }
    tick();
  }

  // -------------------- Boot --------------------
  function boot() {
    const first = MODULES[0];
    paintModule(first);
    setProgress(0);
    if (REDUCED) {
      for (let i = 0; i < 7; i++) lightStage(i);
      currentKey = first.key;
      return;
    }
    setTimeout(() => runModule(first.key), 520);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
