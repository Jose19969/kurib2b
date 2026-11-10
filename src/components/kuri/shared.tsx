import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, ArrowUpRight, AudioLines, Check, ChevronDown, Command, Mic, Search, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { builders, projects, stages, type OpportunityProject, type ProductKind } from "@/data/mock";

export const productInfo = (project: OpportunityProject, kind: ProductKind) => kind === "switches" ? project.switches : project.solar;
export const productName = (kind: ProductKind) => kind === "switches" ? "Smart switches" : "Rooftop solar";

export function ScoreRing({ score, label, small = false }: { score: number; label: string; small?: boolean }) {
  return <div className={`score-ring ${small ? "score-ring-small" : ""}`} style={{ "--score": `${score * 3.6}deg` } as React.CSSProperties} aria-label={`${label} ${score}`}>
    <div className="score-ring-inner"><strong>{score}</strong><span>{label}</span></div>
  </div>;
}

export function StatusPill({ status }: { status: string }) {
  const className = status === "Pitch now" ? "status-pill status-now" : status === "This month" ? "status-pill status-month" : status === "Follow up" ? "status-pill status-follow" : status === "Plan ahead" ? "status-pill status-plan" : "status-pill status-closed";
  return <span className={className}>{status}</span>;
}

export function StageStrip({ current, win, caption, compact = false }: { current: number; win?: [number, number]; caption?: string; compact?: boolean }) {
  const inWindow = (i: number) => !!win && i >= win[0] && i <= win[1];
  return <div className={`stage-wrap ${compact ? "stage-compact" : ""}`}>
    <div className="stage-strip">{stages.map((stage, i) => <div className={`stage-segment ${i < current ? "stage-done" : i === current ? "stage-current" : inWindow(i) ? "stage-window" : "stage-future"}`} key={stage}><span>{stage}</span>{i === current && !compact && <small>Now</small>}</div>)}</div>
    {caption && <p className="stage-caption">{caption}</p>}
  </div>;
}

export function TrustTag({ text, kind }: { text: string; kind: "verified" | "conflict" | "ai" }) {
  const Icon = kind === "verified" ? Check : kind === "conflict" ? Activity : Sparkles;
  return <span className={`trust-tag trust-${kind}`}><Icon size={13} strokeWidth={2.3} />{text}</span>;
}

export function AiLabel() { return <span className="ai-label"><Sparkles size={12} /> Kuri AI</span>; }

export function VerdictPanel({ project, kind, expanded = false }: { project: OpportunityProject; kind: ProductKind; expanded?: boolean }) {
  const details = productInfo(project, kind);
  const [open, setOpen] = useState(false);
  const breakdown = kind === "switches" ? [["Stage timing fit", 30, 30], ["Project size & value", 22, 25], ["Decision-maker reachable", 16, 20], ["Data confidence", 10, 15], ["Developer fit", 8, 10]] : [["Stage timing fit", 8, 30], ["Project size & value", 22, 25], ["Decision-maker reachable", 12, 20], ["Data confidence", 10, 15], ["Developer fit", 9, 10]];
  return <section className="verdict-panel">
    <div className="verdict-top"><span className="verdict-eyebrow">KURI VERDICT · {productName(kind).toUpperCase()}</span><StatusPill status={details.status} /></div>
    <p className="verdict-headline">{kind === "switches" ? project.id === "green-meadows" ? "Get on the electrical spec list before conduit work starts." : details.reason : project.id === "green-meadows" ? "Too early to quote. Re-engage near the roof slab, around Mar 2027." : details.reason}</p>
    <div className="verdict-score"><ScoreRing score={details.score} label={productName(kind)} /><div><AiLabel /><p className="verdict-window">Window {details.windowText}</p><button className="text-action" onClick={() => setOpen(!open)}>{open ? "Hide score breakdown" : `Why ${details.score}?`} <ChevronDown size={14} className={open ? "rotate-180" : ""} /></button></div></div>
    {open && <div className="score-breakdown">{breakdown.map(([label, value, max]) => <div className="score-row" key={label}><span>{label}</span><div className="score-bar"><i style={{ width: `${Number(value) / Number(max) * 100}%` }} /></div><b>{value}/{max}</b></div>)}<p>Weights are provisional until enough wins and losses calibrate them.</p></div>}
    <StageStrip current={project.stageIndex} win={details.win} caption={`Your window: ${details.windowText}`} />
  </section>;
}

export function KuriFrame({ children }: { children: ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [role, setRole] = useState("Rep");
  const [query, setQuery] = useState("");
  const [logStep, setLogStep] = useState(1);
  const [checks, setChecks] = useState([true, true, true, true]);
  const [listening, setListening] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setCommandOpen(true); }
      if (event.key === "Escape") { setCommandOpen(false); setLogOpen(false); }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  const ask = (question: string) => {
    setQuery(question);
    setAnswer(question.toLowerCase().includes("marina") ? "Deepak V. is listed as the electrical contractor at Marina Heights. Two sources disagree on the company name, so confirm before outreach." : question.toLowerCase().includes("lost") ? "Arun Heights was lost after wiring was complete. The team reached the project after the smart-switch window had closed." : "Green Meadows and Marina Heights both have smart-switch windows open. Green Meadows is verified; Marina Heights has a conflicting contractor record.");
  };
  const shownProjects = projects.filter(p => `${p.name} ${p.locality} ${p.city}`.toLowerCase().includes(query.toLowerCase()));
  const resetLog = () => { setLogOpen(true); setLogStep(1); setListening(false); };

  return <div className="kuri-app">
    <header className="topbar"><Link to="/" className="brand-mark"><span className="brand-icon"><Activity size={16} /></span>Kuri</Link>
      <nav className="top-nav" aria-label="Main navigation"><Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "nav-link nav-active" }} className="nav-link">Today</Link><Link to="/explore" activeProps={{ className: "nav-link nav-active" }} className="nav-link">Explore</Link><Link to="/builders" activeProps={{ className: "nav-link nav-active" }} className="nav-link">Builders</Link><Link to="/brief" activeProps={{ className: "nav-link nav-active" }} className="nav-link">Brief</Link></nav>
      <div className="top-actions"><Button variant="outline" className="ask-button" onClick={() => setCommandOpen(true)}><Search size={15} /><span>Ask Kuri</span><kbd><Command size={11} /> K</kbd></Button><label className="role-switch"><span className="sr-only">View role</span><select value={role} onChange={e => { setRole(e.target.value); if (e.target.value === "Owner") toast("Owner view selected"); }}><option>Rep</option><option>Manager</option><option>Owner</option></select><ChevronDown size={13} /></label><button className="avatar-button" aria-label="Karthik Raman profile">KR</button></div>
    </header>
    <main className="page-shell">{children}</main>
    <footer className="site-footer"><span>Kuri · Built for better-timed conversations</span><span>Prototype · sample data</span></footer>
    <Button size="icon" className="floating-log" aria-label="Log update" title="Log update" onClick={resetLog}><Mic size={21} /></Button>

    <Dialog open={commandOpen} onOpenChange={setCommandOpen}><DialogContent className="command-dialog"><DialogHeader><DialogTitle>Ask Kuri</DialogTitle><DialogDescription>Find the right project, person, or moment.</DialogDescription></DialogHeader><div className="command-input"><Search size={18} /><input autoFocus placeholder="Ask about your pipeline…" value={query} onChange={e => { setQuery(e.target.value); setAnswer(""); }} /><kbd>ESC</kbd></div>{answer ? <div className="command-answer"><AiLabel /><p>{answer}</p><div className="answer-results">{shownProjects.slice(0, 2).map(p => <Link key={p.id} to="/opportunity/$id" params={{ id: p.id }} onClick={() => setCommandOpen(false)}><span><b>{p.name}</b><small>{p.locality}, {p.city}</small></span><ArrowUpRight size={16} /></Link>)}</div><TrustTag text="Research notes · updated this week" kind="verified" /></div> : <div className="suggestions"><p>TRY ASKING</p>{["Which projects open a wiring window this month?", "Who decides electrical at Marina Heights?", "Show builders we lost on timing"].map(q => <button key={q} onClick={() => ask(q)}><Sparkles size={14} />{q}<span>↵</span></button>)}{query.trim() && <button onClick={() => ask(query)}><Search size={14} />Search “{query}”</button>}</div>}</DialogContent></Dialog>

    <Dialog open={logOpen} onOpenChange={setLogOpen}><DialogContent className="log-dialog"><DialogHeader><div className="log-kicker"><span>LOG UPDATE</span><span>0{logStep} / 03</span></div><DialogTitle>{logStep === 1 ? "Tell Kuri what happened." : logStep === 2 ? "Kuri heard · 38 sec" : "Saved. Kuri is on it."}</DialogTitle><DialogDescription>{logStep === 1 ? "Tamil or English — a quick voice note is all it takes." : logStep === 2 ? "Review what we found and choose what to save." : "Your update is in motion."}</DialogDescription></DialogHeader>
      {logStep === 1 && <div className="record-area"><span className="linked-project"><Activity size={13} /> Green Meadows Residency <ChevronDown size={12} /></span><button className={`record-button ${listening ? "record-live" : ""}`} aria-label={listening ? "Stop recording" : "Start recording"} onClick={() => setListening(!listening)}>{listening ? <AudioLines size={32} /> : <Mic size={30} />}</button><p>{listening ? "Listening… tap to stop" : "Start with a voice note"}</p><span className="record-hint">Your update helps keep the whole team in sync.</span>{listening && <Button className="save-button" onClick={() => { setListening(false); setLogStep(2); }}>Stop & review</Button>}</div>}
      {logStep === 2 && <div className="review-updates"><details><summary>Transcript <span>38 sec</span></summary><p>Just met Ravi at site. They're casting the 10th slab now. He wants a smart switch quote for all 120 flats by Friday. From now on purchase decisions go through Senthil.</p></details>{["Interested · quote requested", "Send smart switch quote · due Fri, 14 Nov", "10th floor slab in progress · sent for verification", "Senthil M. is now price contact on Arun projects"].map((item, i) => <label className="update-row" key={item}><Checkbox checked={checks[i] ?? false} onCheckedChange={v => setChecks(old => old.map((c, j) => j === i ? v === true : c))} /><span>{item}</span>{i === 2 && <small>New info</small>}</label>)}<div className="log-actions"><Button variant="ghost" onClick={() => setLogStep(1)}>Re-record</Button><Button className="save-button" onClick={() => setLogStep(3)}>Save {checks.filter(Boolean).length} updates</Button></div></div>}
      {logStep === 3 && <div className="saved-state"><span className="saved-check"><Check size={24} /></span><div><b>Reminder set</b><span>Smart-switch quote due Friday</span></div><div><b>Stage sent for verification</b><span>Your report counts as a source</span></div><div><b>Senthil added as price contact</b><span>Visible across Arun projects</span></div><div><b>Outcome added to learning data</b><span>Kuri will use this to improve timing</span></div><Button className="save-button" onClick={() => setLogOpen(false)}>Done</Button></div>}
    </DialogContent></Dialog>
  </div>;
}

export function WindowActionDialog({ mode, onClose }: { mode: "not-fit" | "snooze"; onClose: () => void }) {
  return <Dialog open onOpenChange={open => { if (!open) onClose(); }}><DialogContent className="small-dialog"><DialogHeader><DialogTitle>{mode === "not-fit" ? "Why isn't this a fit?" : "Snooze this opportunity"}</DialogTitle><DialogDescription>{mode === "not-fit" ? "This helps Kuri find better matches." : "When should we bring it back?"}</DialogDescription></DialogHeader><div className="choice-list">{(mode === "not-fit" ? ["Too late", "Too small", "Already awarded", "No budget", "Wrong contact", "Other"] : ["Until next stage change", "2 weeks", "1 month"]).map(label => <button key={label} onClick={() => { toast(mode === "not-fit" ? "Thanks — this teaches Kuri what to recommend." : `We'll remind you: ${label.toLowerCase()}.`); onClose(); }}>{label}<ArrowUpRight size={14} /></button>)}</div></DialogContent></Dialog>;
}

export function EmptyState({ title, detail }: { title: string; detail: string }) { return <div className="empty-state"><span><Search size={19} /></span><b>{title}</b><p>{detail}</p></div>; }

export function DetailsDialog({ title, description, children, onClose }: { title: string; description: string; children: ReactNode; onClose: () => void }) {
  return <Dialog open onOpenChange={open => { if (!open) onClose(); }}><DialogContent className="small-dialog"><DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription></DialogHeader>{children}</DialogContent></Dialog>;
}

export function BuilderLink({ name }: { name: string }) {
  const builder = builders.find(b => b.name === name);
  return builder ? <Link className="inline-link" to="/builders/$id" params={{ id: builder.id }}>{name}<ArrowUpRight size={13} /></Link> : <span>{name}</span>;
}

export function Reveal({ children }: { children: ReactNode }) {
  return <AnimatePresence mode="wait"><motion.div initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}>{children}</motion.div></AnimatePresence>;
}