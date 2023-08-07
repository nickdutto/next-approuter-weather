import { type PointTooltipProps } from '@nivo/line';

import clsx from 'clsx';
import { formatInTimeZone } from 'date-fns-tz';

interface Props {
  point: PointTooltipProps['point'];
  fieldUnit: string;
  xElemCount: number;
}

const ChartTooltip = ({ point, fieldUnit, xElemCount }: Props) => {
  const isFirstHalf = point.index < xElemCount / 2;
  const formattedDay = formatInTimeZone(point.data.x, 'Australia/Canberra', 'EEEE');
  const formattedDate = formatInTimeZone(point.data.x, 'Australia/Canberra', 'dd/MM/yy: HH:mm');

  const className = clsx([
    'absolute flex w-[150px] flex-col items-center gap-1 rounded-md bg-zinc-900 py-2',
    isFirstHalf && 'right-30 left-0',
    !isFirstHalf && 'left-30 right-0',
  ]);

  return (
    <div className={className}>
      <p className="text-center text-xs font-light text-zinc-400">
        {formattedDay}
        <br />
        {formattedDate}
      </p>
      <div className="text-zinc-300">
        <span className="text-lg font-semibold">{Number(point.data.yFormatted).toFixed(2)}</span>
        <span className="text-sm text-zinc-400">{fieldUnit}</span>
      </div>
    </div>
  );
};

export default ChartTooltip;
