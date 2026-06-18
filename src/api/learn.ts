import { api, mockDelay, USE_MOCK } from "./axios";
import { LESSONS, type Lesson } from "@/mock/lessons";

export async function fetchLesson(topic: string): Promise<Lesson> {
  if (USE_MOCK) {
    const found = LESSONS.find((l) => l.id === topic) ?? LESSONS[0]!;
    return mockDelay(found);
  }
  const { data } = await api.get<Lesson>(`/learn/${topic}`);
  return data;
}

export async function fetchLessonList(): Promise<Lesson[]> {
  if (USE_MOCK) return mockDelay(LESSONS);
  const { data } = await api.get<Lesson[]>(`/learn`);
  return data;
}

export async function patchLearnProgress(topic: string): Promise<void> {
  if (USE_MOCK) {
    void topic;
    return mockDelay(undefined);
  }
  await api.patch(`/learn/progress`, { topic });
}
