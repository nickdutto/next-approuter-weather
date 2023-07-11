import { type IconType, type IconBaseProps } from 'react-icons';

type IconProps = {
  icon: IconType;
  size?: string | number;
} & IconBaseProps;

const Icon = ({ icon: IconComponent, size = 20, ...restProps }: IconProps) => {
  return <IconComponent size={size} {...restProps} />;
};

export default Icon;
