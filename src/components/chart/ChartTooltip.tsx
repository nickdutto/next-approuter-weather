import { PointTooltipProps } from '@nivo/line';

import { parse } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

type Props = {
  point: PointTooltipProps['point'];
  fieldUnit: string;
};

const ChartTooltip = ({ point, fieldUnit }: Props) => {
  const date = parse(point.data.xFormatted as string, 'dd/MM/yy-HH:mm', new Date());
  const formattedDate = formatInTimeZone(date, 'Australia/Canberra', 'EEEE - dd/MM/yy: HH:mm');

  return (
    <div className="flex flex-col items-center rounded-md bg-zinc-900 p-2">
      <div className="mb-2 text-xs text-zinc-400">{formattedDate}</div>
      <div className="text-zinc-200">
        {Number(point.data.yFormatted).toFixed(2)}
        <span className="text-xs text-zinc-400">{fieldUnit}</span>
      </div>
    </div>
  );
};

export default ChartTooltip;
