import { useMutation } from '@tanstack/react-query';
import { missionsApi } from '@/shared/api/missions.api';

export function useValidateMission() {
  return useMutation({
    mutationFn: ({ missionId, code, runAsync }: { missionId: string; code?: string; runAsync?: boolean }) =>
      missionsApi.validate(missionId, code, runAsync),
  });
}
