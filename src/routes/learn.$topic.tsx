import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useLearnStore } from "@/store/learnStore";
import { LESSONS } from "@/mock/lessons";

export const Route = createFileRoute("/learn/$topic")({
  head: ({ params }) => ({ meta: [{ title: `${params.topic} — Learn MyLang` }] }),
  component: LearnTopicRedirect,
});

function LearnTopicRedirect() {
  const { topic } = Route.useParams();
  const setActiveTopic = useLearnStore((s) => s.setActiveTopic);
  const navigate = useNavigate();

  useEffect(() => {
    const exists = LESSONS.some((l) => l.id === topic);
    setActiveTopic(exists ? topic : LESSONS[0]!.id);
    navigate({ to: "/learn", replace: true });
  }, [topic, setActiveTopic, navigate]);

  return null;
}
