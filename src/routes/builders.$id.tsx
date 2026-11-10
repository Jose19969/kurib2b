import { createFileRoute } from "@tanstack/react-router";
import { BuilderDetailPage } from "@/components/kuri/pages";

export const Route = createFileRoute("/builders/$id")({
  head: () => ({ meta: [{ title: "Builder profile | Kuri" }, { name: "description", content: "Review builder relationships, active construction projects, and buying signals." }, { property: "og:title", content: "Builder profile | Kuri" }, { property: "og:description", content: "Review builder relationships, active construction projects, and buying signals." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: BuilderDetailRoute,
});

function BuilderDetailRoute() {
  const { id } = Route.useParams();
  return <BuilderDetailPage id={id} />;
}