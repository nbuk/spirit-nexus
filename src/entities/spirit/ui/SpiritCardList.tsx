import { FC, ReactNode } from 'react';
import { Skeleton } from '@/shared/ui/skeleton';
import { SpiritCard } from './SpiritCard';
import { type Spirit } from '../model/types';
import styles from './SpiritCardList.module.scss';

interface SpiritCardListProps {
  data?: Spirit[];
  isLoading: boolean;
  renderActions: (spirit: Spirit) => ReactNode;
}

export const SpiritCardList: FC<SpiritCardListProps> = (props) => {
  const { data, isLoading, renderActions } = props;

  if (isLoading) {
    return (
      <ul className={styles.list}>
        {new Array(8).fill('').map((_, i) => (
          <Skeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className={styles.list}>
      {data?.map((spirit) => (
        <SpiritCard
          key={spirit.id}
          className={styles.card}
          data={spirit}
          renderActions={renderActions}
        />
      ))}
    </ul>
  );
};
