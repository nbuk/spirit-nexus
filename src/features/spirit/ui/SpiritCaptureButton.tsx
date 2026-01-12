import { FC } from 'react';
import { Button, ButtonProps } from '@/shared/ui/button';
import { useSpiritCapture } from '../lib/useSpiritCapture';

interface SpiritCaptureButtonProps extends ButtonProps {
  spiritId: number;
}

export const SpiritCaptureButton: FC<SpiritCaptureButtonProps> = (props) => {
  const { disabled, spiritId, ...rest } = props;
  const { handleCapture, isPending } = useSpiritCapture();

  const handleClick = () => {
    handleCapture(spiritId);
  };

  return (
    <Button disabled={disabled || isPending} onClick={handleClick} {...rest}>
      Capture
    </Button>
  );
};
