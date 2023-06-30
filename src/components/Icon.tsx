import { LucideIcon, LucideProps } from 'lucide-react';

type IconProps = {
  icon: LucideIcon;
  size?: string | number;
} & LucideProps;

const Icon = ({ icon: IconComponent, size = 20, ...restProps }: IconProps) => {
  return <IconComponent size={size} {...restProps} />;
};

export default Icon;
