import { PointTooltipProps } from '@nivo/line';

import { format, parse } from 'date-fns';

type Props = {
  point: PointTooltipProps['point'];
};

const ChartTooltip = ({ point }: Props) => {
  const date = parse(point.data.xFormatted as string, 'dd/MM/yy-HH:mm', new Date());
  const formattedDate = format(date, 'EEEE - dd/MM/yy: HH:mm');

  return (
    <div className="flex flex-col items-center rounded-md bg-zinc-900 p-2">
      <div className="mb-2 text-xs text-zinc-400">{formattedDate}</div>
      <div className="text-zinc-200">
        {Number(point.data.yFormatted).toFixed(1)}
        <span className="text-xs text-zinc-400">hPa</span>
      </div>
    </div>
  );
};

export default ChartTooltip;
