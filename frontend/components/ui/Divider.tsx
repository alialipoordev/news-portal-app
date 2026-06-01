import { cn } from "@/utils/cn";

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal', className,
}) => (
  <span
    role="separator"
    aria-hidden="true"
    className={cn(
      orientation === 'horizontal'
        ? 'block w-full h-px bg-border'
        : 'inline-block w-px self-stretch bg-border',
      className,
    )}
  />
);