import { RingLoader } from 'react-spinners';

interface ILoadingSpinnerProps {
  size?: number;
}

export const LoadingSpinner = ({ size }: ILoadingSpinnerProps) => (
  <div className={'flex justify-center items-center min-h-screen'}>
    <RingLoader size={size ?? 100} color={'aqua'} />
  </div>
);
