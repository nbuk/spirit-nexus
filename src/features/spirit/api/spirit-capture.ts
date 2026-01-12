import { api } from '@/shared/api/cleint';

export const spiritCapture = async (id: number) => {
  const response = await api.post<{ message: string }>('/spirits', { id });
  return response.data;
};
