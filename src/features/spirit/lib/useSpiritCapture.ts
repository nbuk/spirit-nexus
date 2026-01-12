import { useMutation, useQueryClient } from '@tanstack/react-query';
import { spiritCapture } from '../api/spirit-capture';
import { Spirit, spiritQueries, SpiritStatus } from '@/entities/spirit';
import { toast } from 'react-toastify';

export const useSpiritCapture = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: spiritCapture,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: [spiritQueries.baseKey] });
      const previousSpirits = queryClient.getQueryData<Spirit[]>([
        spiritQueries.baseKey,
      ]);
      queryClient.setQueryData<Spirit[]>([spiritQueries.baseKey], (old) =>
        old?.map((spirit) => {
          if (spirit.id === id) {
            return { ...spirit, status: SpiritStatus.CAPTURED };
          }
          return spirit;
        }),
      );
      return { previousSpirits };
    },
  });

  const handleCapture = (id: number) => {
    mutate(id, {
      onError: (_error, _id, ctx) => {
        if (ctx?.previousSpirits) {
          queryClient.setQueryData(
            [spiritQueries.baseKey],
            ctx.previousSpirits,
          );
        }
        toast.error('Failed to capture spirit', {
          hideProgressBar: true,
          theme: 'dark',
        });
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: [spiritQueries.baseKey],
        });
      },
    });
  };

  return { handleCapture, isPending };
};
