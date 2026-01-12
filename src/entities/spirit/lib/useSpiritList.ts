'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Spirit, spiritQueries } from '@/entities/spirit';
import { useEffect } from 'react';
import { z } from 'zod';
import { SpiritSchema } from '../model/types';

const SpiritUpdatedEventSchema = z.object({
  type: z.string(),
  spirit: SpiritSchema,
  timestamp: z.number(),
});

export const useSpiritList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(spiritQueries.list());

  useEffect(() => {
    const eventSource = new EventSource('/api/spirits/sse');

    eventSource.onopen = () => {
      console.log('SSE connection opened');
    };

    eventSource.onmessage = (event) => {
      try {
        const data = SpiritUpdatedEventSchema.parse(JSON.parse(event.data));
        queryClient.setQueryData<Spirit[]>([spiritQueries.baseKey], (old) =>
          old?.map((spirit) => {
            if (spirit.id === data.spirit.id) {
              return data.spirit;
            }
            return spirit;
          }),
        );
      } catch (e) {
        console.error(e);
      }
    };

    return () => eventSource.close();
  }, []);

  return { data, isLoading };
};
