export type ProductKind = "switches" | "solar";
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
  window: string;
  switches: { score: number; status: string; reason: string; contact: string; role: string; trust: string; trustKind: "verified" | "conflict" | "ai" };
  solar: { score: number; status: string; reason: string; contact: string; role: string; trust: string; trustKind: "verified" | "conflict" | "ai" };
};

export const projects: OpportunityProject[] = [
  { id: "green-meadows", name: "Green Meadows Residency", locality: "Saravanampatti", city: "Coimbatore", units: "120 apartments", height: "G+14", sqft: "~80,000 sq ft", value: "₹42 Cr", developer: "Arun Constructions", stage: "Superstructure", stageIndex: 2, progress: "9th of 14 slabs", window: "4–8 weeks", switches: { score: 86, status: "Pitch now", reason: "Electrical drawings aren't frozen yet — get on the spec list before conduit work starts.", contact: "Ravi K.", role: "MEP consultant", trust: "Verified 6 days ago · 3 sources agree", trustKind: "verified" }, solar: { score: 61, status: "Plan ahead", reason: "Common-area solar looks promising; re-engage closer to the roof slab.", contact: "Arun Kumar", role: "Developer · MD", trust: "Verified 6 days ago · 3 sources agree", trustKind: "verified" } },
  { id: "marina-heights", name: "Marina Heights", locality: "OMR", city: "Chennai", units: "210 apartments", height: "S+18", sqft: "~156,000 sq ft", value: "₹78 Cr", developer: "Marina Urban", stage: "Superstructure", stageIndex: 2, progress: "12th of 18 slabs", window: "3–6 weeks", switches: { score: 84, status: "Pitch now", reason: "A premium automation package could cover all 210 homes.", contact: "Deepak V.", role: "Electrical contractor", trust: "Contractor name: 2 sources conflict", trustKind: "conflict" }, solar: { score: 58, status: "Plan ahead", reason: "Roof completion is still several months away; keep this on the radar.", contact: "Arun Kumar", role: "Developer · MD", trust: "Stage verified 8 days ago", trustKind: "verified" } },
  { id: "lotus-towers", name: "Lotus Towers", locality: "Peelamedu", city: "Coimbatore", units: "84 apartments", height: "G+11", sqft: "~58,000 sq ft", value: "₹28 Cr", developer: "Lotus Habitat", stage: "Roof slab", stageIndex: 3, progress: "Roof slab cast", window: "Open this month", switches: { score: 54, status: "Follow up", reason: "Electrical specification may already be set; verify the switch brand before quoting.", contact: "Meena S.", role: "Architect", trust: "Verified 3 days ago", trustKind: "verified" }, solar: { score: 81, status: "Pitch now", reason: "Roof is complete; solar structure layout is being finalised this month.", contact: "Meena S.", role: "Architect", trust: "Verified 3 days ago", trustKind: "verified" } },
  { id: "sri-sai-villas", name: "Sri Sai Villas", locality: "Vadavalli", city: "Coimbatore", units: "36 villas", height: "G+2", sqft: "~42,000 sq ft", value: "₹19 Cr", developer: "Sai Habitat", stage: "Brickwork", stageIndex: 2, progress: "Brickwork · phase 1", window: "Next month", switches: { score: 78, status: "This month", reason: "Villa buyers expect automation; specification comes up at next month's meeting.", contact: "Senthil R.", role: "Purchase head", trust: "AI-extracted · not yet verified", trustKind: "ai" }, solar: { score: 65, status: "Plan ahead", reason: "Roof-area potential is good; revisit as the villa roofs take shape.", contact: "Senthil R.", role: "Purchase head", trust: "AI-extracted · not yet verified", trustKind: "ai" } },
  { id: "orchid-enclave", name: "Orchid Enclave", locality: "Ramanathapuram", city: "Coimbatore", units: "64 apartments", height: "G+8", sqft: "~48,000 sq ft", value: "₹24 Cr", developer: "Orchid Estates", stage: "Superstructure", stageIndex: 2, progress: "5th of 8 slabs", window: "4–6 weeks", switches: { score: 59, status: "Follow up", reason: "Confirm whether the electrical drawings are still open before investing time.", contact: "Anitha P.", role: "Projects director", trust: "Verified 12 days ago", trustKind: "verified" }, solar: { score: 72, status: "Follow up", reason: "Anitha asked for a common-area solar ROI sheet on 3 Nov — send it today.", contact: "Anitha P.", role: "Projects director", trust: "Verified 12 days ago", trustKind: "verified" } },
  { id: "velan-hostel", name: "Velan Workers' Hostel", locality: "Avinashi Road", city: "Tiruppur", units: "G+4 hostel", height: "G+4", sqft: "~34,000 sq ft", value: "₹16 Cr", developer: "Velan Industries", stage: "Foundation", stageIndex: 1, progress: "Foundation", window: "Opens near roof slab", switches: { score: 42, status: "Window closed", reason: "Too early to shortlist switches; check back closer to wiring.", contact: "Murugan T.", role: "Owner's engineer", trust: "Verified 20 days ago", trustKind: "verified" }, solar: { score: 69, status: "Plan ahead", reason: "Large flat roof and daytime load make a strong payback story.", contact: "Murugan T.", role: "Owner's engineer", trust: "Verified 20 days ago", trustKind: "verified" } },
];

export const builders = [
  { id: "arun-constructions", name: "Arun Constructions", city: "Coimbatore", status: "Warm", contact: "9 days ago", projects: "4 active · 2 completed", window: "Green Meadows · switches open now" },
  { id: "marina-urban", name: "Marina Urban", city: "Chennai", status: "Active", contact: "4 days ago", projects: "3 active · 1 completed", window: "Marina Heights · switches open now" },
  { id: "lotus-habitat", name: "Lotus Habitat", city: "Coimbatore", status: "New contact", contact: "No contact yet", projects: "2 active · 0 completed", window: "Lotus Towers · solar open now" },
  { id: "sai-habitat", name: "Sai Habitat", city: "Coimbatore", status: "Growing", contact: "2 weeks ago", projects: "2 active · 1 completed", window: "Sri Sai Villas · switches next month" },
  { id: "orchid-estates", name: "Orchid Estates", city: "Coimbatore", status: "Follow up", contact: "12 days ago", projects: "2 active · 0 completed", window: "Orchid Enclave · solar follow-up" },
  { id: "velan-industries", name: "Velan Industries", city: "Tiruppur", status: "Watching", contact: "20 days ago", projects: "1 active · 0 completed", window: "Velan Hostel · plan ahead" },
];

export const people = [
  { name: "Ravi K.", title: "MEP consultant", detail: "Writes the electrical spec and switch shortlist", stage: "Superstructure", trust: "Verified 6d", score: 92 },
  { name: "Deepak V.", title: "Electrical contractor", detail: "Switch brand at conduit and wiring", stage: "MEP", trust: "2 sources conflict", score: 71 },
  { name: "Meena S.", title: "Architect", detail: "Design intent before superstructure", stage: "Site", trust: "Verified 3d", score: 84 },
  { name: "Senthil M.", title: "Purchase head", detail: "Price and terms at finishing", stage: "Finish", trust: "Verified 4d", score: 73 },
  { name: "Arun Kumar", title: "Managing director", detail: "Final approval on premium features", stage: "Façade", trust: "Verified 30d", score: 89 },
];

export const stages = ["Site", "Sub", "Super", "Façade", "MEP", "Finish"];