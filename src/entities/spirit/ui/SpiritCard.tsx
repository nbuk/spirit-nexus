import { FC, ReactNode } from 'react';
import cn from 'classnames';
import { Spirit, SpiritStatus } from '../model/types';
import styles from './SpiritCard.module.scss';

const statusMap: Record<SpiritStatus, string> = {
  [SpiritStatus.ACTIVE]: 'Active',
  [SpiritStatus.CAPTURED]: 'Captured',
};

interface SpiritCardProps {
  className?: string;
  data: Spirit;
  renderActions: (spirit: Spirit) => ReactNode;
}

export const SpiritCard: FC<SpiritCardProps> = (props) => {
  const { className, data, renderActions } = props;
  const { name, location, status, threatLevel } = data;

  return (
    <div className={cn(styles.spiritCard, className)}>
      <p className={styles.name}>{name}</p>

      <div className={styles.content}>
        <div className={styles.row}>
          <span>Location:</span>
          <p>{location}</p>
        </div>

        <div className={styles.row}>
          <span>Status:</span>
          <p>{statusMap[status]}</p>
        </div>

        <div className={styles.row}>
          <span>Threat level:</span>
          <div
            className={cn(
              styles.threatLevel,
              styles[`threatLevel--${threatLevel.toLowerCase()}`],
            )}
          />
        </div>
      </div>

      <div className={styles.actions}>{renderActions(data)}</div>
    </div>
  );
};
