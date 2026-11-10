import { createFileRoute } from "@tanstack/react-router";
import { ExplorePage } from "@/components/kuri/pages";

export const Route = createFileRoute("/explore")({
  head: () => ({ meta: [{ title: "Explore projects | Kuri" }, { name: "description", content: "Discover construction projects across Tamil Nadu when each product's buying window is open." }, { property: "og:title", content: "Explore projects | Kuri" }, { property: "og:description", content: "Discover construction projects across Tamil Nadu when each product's buying window is open." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: ExplorePage,
});