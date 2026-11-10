import { createFileRoute } from "@tanstack/react-router";
import { TodayPage } from "@/components/kuri/pages";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Today’s opportunities | Kuri" }, { name: "description", content: "A clear, timely call queue for construction sales across Coimbatore, Chennai, and Tiruppur." }, { property: "og:title", content: "Today’s opportunities | Kuri" }, { property: "og:description", content: "A clear, timely call queue for construction sales across Coimbatore, Chennai, and Tiruppur." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: TodayPage,
});
