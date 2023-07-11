import { PointTooltipProps } from '@nivo/line';

import { format, parse } from 'date-fns';

type Props = {
  point: PointTooltipProps['point'];
};

const ChartTooltip = ({ point }: Props) => {
  const date = parse(point.data.xFormatted as string, 'dd/MM/yy-HH:mm', new Date());
  const formattedDate = format(date, 'EEEE - dd/MM/yy: HH:mm');

  return (
    <div className="flex flex-col items-center rounded-md bg-zinc-800 p-2">
      <div className="mb-2">{formattedDate}</div>
      <div>{point.data.yFormatted}hPa</div>
    </div>
  );
};

export default ChartTooltip;
