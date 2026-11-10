import { createFileRoute } from "@tanstack/react-router";
import { OpportunityPage } from "@/components/kuri/pages";

export const Route = createFileRoute("/opportunity/$id")({
  head: () => ({ meta: [{ title: "Opportunity detail | Kuri" }, { name: "description", content: "See project timing, verified contacts, sources, and next steps for a construction sales opportunity." }, { property: "og:title", content: "Opportunity detail | Kuri" }, { property: "og:description", content: "See project timing, verified contacts, sources, and next steps for a construction sales opportunity." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: OpportunityRoute,
});

function OpportunityRoute() {
  const { id } = Route.useParams();
  return <OpportunityPage id={id} />;
}