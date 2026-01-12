'use client';
import { FC } from 'react';
import { SpiritCardList, SpiritStatus, useSpiritList } from '@/entities/spirit';
import { SpiritCaptureButton } from '@/features/spirit';
import { Page } from '@/widgets/page';

export const MonitoringPage: FC = () => {
  const { data, isLoading } = useSpiritList();

  return (
    <Page title={'Spirit Monitoring'}>
      <SpiritCardList
        data={data}
        isLoading={isLoading}
        renderActions={({ id, status }) => (
          <SpiritCaptureButton
            spiritId={id}
            disabled={status !== SpiritStatus.ACTIVE}
          />
        )}
      />
    </Page>
  );
};
