import { apiClient, unwrap } from './client';
import type { ValidateMissionResponse } from './types';

export const missionsApi = {
  validate: async (missionId: string, code?: string, runAsync = false) => {
    const res = await apiClient.post<{ data: ValidateMissionResponse }>(
      `/missions/${missionId}/validate`,
      { code, async: runAsync },
    );
    return unwrap(res);
  },
};
