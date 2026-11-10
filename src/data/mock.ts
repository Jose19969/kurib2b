export type ProductKind = "switches" | "solar";
export type TrustKind = "verified" | "conflict" | "ai";
export type ProductView = {
  score: number;
  status: string;
  reason: string;
  contact: string;
  role: string;
  trust: string;
  trustKind: TrustKind;
  /** Plain-language sales window for this product */
  windowText: string;
  /** Stage indexes (see `stages`) where this product's sales window sits */
  win: [number, number];
};
export type OpportunityProject = {
  id: string;
  name: string;
  locality: string;
  city: string;
  units: string;
  height: string;
  sqft: string;
  value: string;
  developer: string;
  stage: string;
  stageIndex: number;
  progress: string;
  /** Product this project is queued for on Today; omit to keep it off the call list */
  queueProduct?: ProductKind;
  switches: ProductView;
  solar: ProductView;
};

// Stage indexes: 0 Site · 1 Sub · 2 Super · 3 Façade · 4 MEP · 5 Finish
const SWITCH_WIN: [number, number] = [2, 4];
const SOLAR_WIN: [number, number] = [3, 3];

export const projects: OpportunityProject[] = [
  {
    id: "green-meadows", name: "Green Meadows Residency", locality: "Saravanampatti", city: "Coimbatore", units: "120 apartments", height: "G+14", sqft: "~80,000 sq ft", value: "₹42 Cr", developer: "Arun Constructions", stage: "Superstructure", stageIndex: 2, progress: "9th of 14 slabs", queueProduct: "switches",
    switches: { score: 86, status: "Pitch now", reason: "Electrical drawings aren't frozen yet. Get on the spec list before conduit work starts.", contact: "Ravi K.", role: "MEP consultant", trust: "Verified 6 days ago · 3 sources agree", trustKind: "verified", windowText: "open now, closes in ~4–8 weeks", win: SWITCH_WIN },
    solar: { score: 61, status: "Plan ahead", reason: "Common-area solar looks promising. Re-engage closer to the roof slab.", contact: "Arun Kumar", role: "MD, Arun Constructions", trust: "Verified 30 days ago", trustKind: "verified", windowText: "opens ~Feb 2027, at the roof slab", win: SOLAR_WIN },
  },
  {
    id: "marina-heights", name: "Marina Heights", locality: "OMR", city: "Chennai", units: "210 apartments", height: "S+18", sqft: "~156,000 sq ft", value: "₹78 Cr", developer: "Marina Urban", stage: "Superstructure", stageIndex: 2, progress: "12th of 18 slabs", queueProduct: "switches",
    switches: { score: 84, status: "Pitch now", reason: "Premium tower. One automation package could cover all 210 homes.", contact: "Deepak V.", role: "Electrical contractor", trust: "Contractor name: 2 sources conflict", trustKind: "conflict", windowText: "open now, closes in ~3–6 weeks", win: SWITCH_WIN },
    solar: { score: 58, status: "Plan ahead", reason: "Roof completion is still several months away. Keep it on the radar.", contact: "Vinod R.", role: "Projects head, Marina Urban", trust: "Verified 8 days ago", trustKind: "verified", windowText: "opens mid-2027, at the roof slab", win: SOLAR_WIN },
  },
  {
    id: "lotus-towers", name: "Lotus Towers", locality: "Peelamedu", city: "Coimbatore", units: "84 apartments", height: "G+11", sqft: "~58,000 sq ft", value: "₹28 Cr", developer: "Lotus Habitat", stage: "Façade", stageIndex: 3, progress: "Roof slab cast", queueProduct: "solar",
    switches: { score: 54, status: "Follow up", reason: "The electrical spec may already be set. Confirm the switch brand before quoting.", contact: "Meena S.", role: "Architect", trust: "Verified 3 days ago", trustKind: "verified", windowText: "closing soon, conduit may already be laid", win: SWITCH_WIN },
    solar: { score: 81, status: "Pitch now", reason: "Roof is complete and the solar structure layout is being finalised this month.", contact: "Meena S.", role: "Architect", trust: "Verified 3 days ago", trustKind: "verified", windowText: "open now, layout being finalised this month", win: SOLAR_WIN },
  },
  {
    id: "sri-sai-villas", name: "Sri Sai Villas", locality: "Vadavalli", city: "Coimbatore", units: "36 villas", height: "G+2", sqft: "~42,000 sq ft", value: "₹19 Cr", developer: "Sai Habitat", stage: "Superstructure", stageIndex: 2, progress: "Brickwork, phase 1", queueProduct: "switches",
    switches: { score: 78, status: "This month", reason: "Villa buyers expect automation. The spec is decided at next month's meeting.", contact: "Senthil R.", role: "Purchase head", trust: "AI-extracted · not yet verified", trustKind: "ai", windowText: "opens at next month's spec meeting", win: [2, 3] },
    solar: { score: 65, status: "Plan ahead", reason: "Good roof area. Revisit as the villa roofs are cast.", contact: "Senthil R.", role: "Purchase head", trust: "AI-extracted · not yet verified", trustKind: "ai", windowText: "opens as the villa roofs are cast", win: SOLAR_WIN },
  },
  {
    id: "orchid-enclave", name: "Orchid Enclave", locality: "Ramanathapuram", city: "Coimbatore", units: "64 apartments", height: "G+8", sqft: "~48,000 sq ft", value: "₹24 Cr", developer: "Orchid Estates", stage: "Superstructure", stageIndex: 2, progress: "5th of 8 slabs", queueProduct: "solar",
    switches: { score: 59, status: "Follow up", reason: "Check the electrical drawings are still open before investing time.", contact: "Anitha P.", role: "Projects director", trust: "Verified 12 days ago", trustKind: "verified", windowText: "open, but confirm drawings aren't frozen", win: SWITCH_WIN },
    solar: { score: 72, status: "Follow up", reason: "Anitha asked for a common-area solar ROI sheet on 3 Nov. Send it today.", contact: "Anitha P.", role: "Projects director", trust: "Verified 12 days ago", trustKind: "verified", windowText: "opens at the roof slab; ROI sheet due today", win: SOLAR_WIN },
  },
  {
    id: "velan-hostel", name: "Velan Workers' Hostel", locality: "Avinashi Road", city: "Tiruppur", units: "300-bed hostel", height: "G+4", sqft: "~34,000 sq ft", value: "₹16 Cr", developer: "Velan Industries", stage: "Foundation", stageIndex: 1, progress: "Footings complete", queueProduct: "solar",
    switches: { score: 42, status: "Plan ahead", reason: "Too early for switches. Check back closer to wiring.", contact: "Murugan T.", role: "Owner's engineer", trust: "Verified 20 days ago", trustKind: "verified", windowText: "opens at wiring, ~5 months away", win: SWITCH_WIN },
    solar: { score: 69, status: "Plan ahead", reason: "Large flat roof and daytime load make a strong payback story.", contact: "Murugan T.", role: "Owner's engineer", trust: "Verified 20 days ago", trustKind: "verified", windowText: "opens at the roof slab, ~4 months away", win: SOLAR_WIN },
  },
  // Missed windows (shown on the owner's Brief, not on Today's call list)
  {
    id: "skyline-residences", name: "Skyline Residences", locality: "Porur", city: "Chennai", units: "150 apartments", height: "S+16", sqft: "~110,000 sq ft", value: "₹58 Cr", developer: "Skyline Developers", stage: "MEP", stageIndex: 4, progress: "Wiring started 12 Oct",
    switches: { score: 88, status: "Window closed", reason: "Scored 88 while the window was open, but nobody was assigned. Wiring started on 12 Oct.", contact: "Prakash S.", role: "MEP consultant", trust: "Verified 15 days ago", trustKind: "verified", windowText: "closed on 12 Oct, wiring has started", win: SWITCH_WIN },
    solar: { score: 66, status: "Follow up", reason: "Roof is done. Check whether rooftop solar is already budgeted.", contact: "Prakash S.", role: "MEP consultant", trust: "Verified 15 days ago", trustKind: "verified", windowText: "open, if solar isn't budgeted yet", win: [3, 4] },
  },
  {
    id: "emerald-court", name: "Emerald Court", locality: "Singanallur", city: "Coimbatore", units: "72 apartments", height: "G+9", sqft: "~52,000 sq ft", value: "₹26 Cr", developer: "Emerald Homes", stage: "Façade", stageIndex: 3, progress: "Roof cast 20 Oct",
    switches: { score: 48, status: "Window closed", reason: "Conduit work finished before the project was picked up.", contact: "Ganesh P.", role: "Projects manager", trust: "Verified 9 days ago", trustKind: "verified", windowText: "closed, conduit work is complete", win: SWITCH_WIN },
    solar: { score: 79, status: "Window closed", reason: "Roof was cast on 20 Oct. One call went unanswered and no follow-up was logged; a solar vendor has likely been chosen.", contact: "Ganesh P.", role: "Projects manager", trust: "Verified 9 days ago", trustKind: "verified", windowText: "closed, vendor likely chosen", win: SOLAR_WIN },
  },
  {
    id: "kumaran-mills", name: "Kumaran Mills Quarters", locality: "Palladam Road", city: "Tiruppur", units: "220-bed staff quarters", height: "G+3", sqft: "~30,000 sq ft", value: "₹12 Cr", developer: "Kumaran Mills", stage: "Finishing", stageIndex: 5, progress: "Roof complete, plastering",
    switches: { score: 40, status: "Window closed", reason: "Wiring is complete.", contact: "Selvam K.", role: "Owner's engineer", trust: "Verified 21 days ago", trustKind: "verified", windowText: "closed, wiring is complete", win: SWITCH_WIN },
    solar: { score: 77, status: "Window closed", reason: "The roof was ready while the assigned rep was on leave, and the project was never reassigned.", contact: "Selvam K.", role: "Owner's engineer", trust: "Verified 21 days ago", trustKind: "verified", windowText: "closed while the rep was on leave", win: SOLAR_WIN },
  },
  {
    id: "arun-villas", name: "Arun Villas", locality: "Thudiyalur", city: "Coimbatore", units: "24 villas", height: "G+1", sqft: "~36,000 sq ft", value: "₹15 Cr", developer: "Arun Constructions", stage: "Finishing", stageIndex: 5, progress: "Finishing started",
    switches: { score: 74, status: "Window closed", reason: "Finishing started before the contact was verified, so wiring was done without us.", contact: "Senthil M.", role: "Purchase head", trust: "AI-extracted · not yet verified", trustKind: "ai", windowText: "closed, finishing has started", win: SWITCH_WIN },
    solar: { score: 77, status: "Pitch now", reason: "Villa roofs are complete. Rooftop systems can still be offered to each buyer.", contact: "Senthil M.", role: "Purchase head", trust: "Verified 4 days ago", trustKind: "verified", windowText: "open now, offer to villa buyers", win: [3, 5] },
  },
];

export const builders = [
  { id: "arun-constructions", name: "Arun Constructions", city: "Coimbatore", status: "Warm", contact: "9 days ago", projects: "4 active · 2 completed", window: "Green Meadows · switches open now" },
  { id: "marina-urban", name: "Marina Urban", city: "Chennai", status: "Active", contact: "4 days ago", projects: "3 active · 1 completed", window: "Marina Heights · switches open now" },
  { id: "lotus-habitat", name: "Lotus Habitat", city: "Coimbatore", status: "New contact", contact: "No contact yet", projects: "2 active · 0 completed", window: "Lotus Towers · solar open now" },
  { id: "sai-habitat", name: "Sai Habitat", city: "Coimbatore", status: "Growing", contact: "2 weeks ago", projects: "2 active · 1 completed", window: "Sri Sai Villas · switches next month" },
  { id: "orchid-estates", name: "Orchid Estates", city: "Coimbatore", status: "Follow up", contact: "12 days ago", projects: "2 active · 0 completed", window: "Orchid Enclave · solar follow-up" },
  { id: "velan-industries", name: "Velan Industries", city: "Tiruppur", status: "Watching", contact: "20 days ago", projects: "1 active · 0 completed", window: "Velan Hostel · plan ahead" },
];

// Green Meadows decision network, ordered by the stage at which each person's decision happens
export const people = [
  { name: "Meena S.", title: "Architect", detail: "Design intent, set before superstructure", stage: "Substructure", trust: "Verified 3d", score: 84 },
  { name: "Ravi K.", title: "MEP consultant", detail: "Writes the electrical spec and switch shortlist", stage: "Superstructure", trust: "Verified 6d", score: 92 },
  { name: "Arun Kumar", title: "Managing director", detail: "Approves premium features", stage: "Superstructure", trust: "Verified 30d", score: 89 },
  { name: "Deepak V.", title: "Electrical contractor", detail: "Switch brand at conduit and wiring", stage: "MEP", trust: "2 sources conflict", score: 41 },
  { name: "Senthil M.", title: "Purchase head", detail: "Price and terms", stage: "Finishing", trust: "Verified 4d", score: 73 },
];

export const stages = ["Site", "Sub", "Super", "Façade", "MEP", "Finish"];

/** Best open opportunity for a project: prefers products whose window isn't closed */
export const bestFit = (p: OpportunityProject): ProductKind => {
  const open = (k: ProductKind) => (k === "switches" ? p.switches : p.solar).status !== "Window closed";
  if (open("switches") !== open("solar")) return open("switches") ? "switches" : "solar";
  return p.switches.score >= p.solar.score ? "switches" : "solar";
};
