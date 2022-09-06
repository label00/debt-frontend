import cn from 'classnames';

type BadgeColorsType = 'red' | 'green' | 'gray';

type BadgeProps = {
  children: string;
  color?: BadgeColorsType;
  className?: string;
};

const COLOR_STYLES: Record<BadgeColorsType, string> = {
  red: 'bg-red-500',
  green: 'bg-green-500',
  gray: 'bg-gray-500',
};

const Chip = ({ children, color = 'gray' }: BadgeProps) => (
  <div className={cn('pb-0.5 px-1 rounded font-bold text-xs text-white font-medium', COLOR_STYLES[color])}>
    {children}
  </div>
);

export { Chip };
export type { BadgeColorsType };
