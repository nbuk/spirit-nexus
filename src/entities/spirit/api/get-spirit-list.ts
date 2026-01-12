import { api } from '@/shared/api/cleint';
import { Spirit, SpiritSchema } from '../model/types';

const SpiritResponseSchema = SpiritSchema.array();

export const getSpiritList = async () => {
  const response = await api.get<Spirit[]>('/spirits');
  return SpiritResponseSchema.parse(response.data);
};
