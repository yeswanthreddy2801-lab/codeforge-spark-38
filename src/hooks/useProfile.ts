import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "@/api/profile";

export function useProfile(username: string) {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: () => fetchProfile(username),
    staleTime: 60_000,
  });
}
