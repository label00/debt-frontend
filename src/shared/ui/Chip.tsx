import cn from 'classnames';

type ChipColors = 'red' | 'green' | 'gray';

type ChipSize = 'sm' | 'md' | 'lg';

type ChipProps = {
  children: string;
  color?: ChipColors;
  size?: ChipSize;
  className?: string;
};

const DEFAULT_STYLES = 'font-bold text-white font-medium capitalize';

const COLOR_STYLES: Record<ChipColors, string> = {
  red: 'bg-red-500',
  green: 'bg-green-500',
  gray: 'bg-gray-500',
};

const SIZE_STYLES: Record<ChipSize, string> = {
  sm: 'pb-0.5 px-1 text-xs rounded',
  md: 'pb-0.5 px-2 text-md rounded-md',
  lg: 'todo',
};

const Chip = ({ children, color = 'gray', size = 'md' }: ChipProps) => (
  <div className={cn(DEFAULT_STYLES, SIZE_STYLES[size], COLOR_STYLES[color])}>{children}</div>
);

export { Chip };
export type { ChipColors };
