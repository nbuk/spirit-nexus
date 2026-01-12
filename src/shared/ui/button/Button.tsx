import { ComponentProps, FC } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

export interface ButtonProps extends ComponentProps<'button'> {
  className?: string;
}

export const Button: FC<ButtonProps> = (props) => {
  const { className, ...rest } = props;

  return <button className={cn(styles.button, className)} {...rest} />;
};
