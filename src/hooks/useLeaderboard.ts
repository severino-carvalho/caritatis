import { useQuery } from "@tanstack/react-query";
import type { LeaderboardData } from "@/data/types";
import { mockLeaderboard } from "@/data/mocks";

export function useLeaderboard() {
  return useQuery<LeaderboardData>({
    queryKey: ["leaderboard"],
    queryFn: async () => mockLeaderboard,
  });
}
