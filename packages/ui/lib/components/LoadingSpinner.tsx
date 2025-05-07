import { RingLoader } from 'react-spinners';

interface ILoadingSpinnerProps {
  size?: number;
}

export const LoadingSpinner = ({ size }: ILoadingSpinnerProps) => (
  <div className={'flex min-h-screen items-center justify-center'}>
    <RingLoader size={size ?? 100} color={'aqua'} />
  </div>
);
