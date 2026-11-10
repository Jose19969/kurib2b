import { createFileRoute } from "@tanstack/react-router";
import { BuildersPage } from "@/components/kuri/pages";

export const Route = createFileRoute("/builders")({
  head: () => ({ meta: [{ title: "Builders | Kuri" }, { name: "description", content: "Manage builder relationships and see the next opportunity window across your territory." }, { property: "og:title", content: "Builders | Kuri" }, { property: "og:description", content: "Manage builder relationships and see the next opportunity window across your territory." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: BuildersPage,
});