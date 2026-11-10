import { createFileRoute } from "@tanstack/react-router";
import { BriefPage } from "@/components/kuri/pages";

export const Route = createFileRoute("/brief")({
  head: () => ({ meta: [{ title: "Weekly field brief | Kuri" }, { name: "description", content: "A weekly editorial summary of timing, pipeline, missed windows, and team activity." }, { property: "og:title", content: "Weekly field brief | Kuri" }, { property: "og:description", content: "A weekly editorial summary of timing, pipeline, missed windows, and team activity." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: BriefPage,
});