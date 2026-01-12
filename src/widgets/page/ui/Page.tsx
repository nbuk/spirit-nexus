import { FC, ReactNode } from 'react';
import styles from './Page.module.scss';

interface PageProps {
  children: ReactNode;
  title?: string;
}

export const Page: FC<PageProps> = (props) => {
  const { children, title } = props;
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {children}
      </div>
    </main>
  );
};
