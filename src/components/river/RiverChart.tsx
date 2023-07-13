import { type Serie } from '@nivo/line';

import { useEffect, useState } from 'react';

import LineChart from '~/components/chart/LineChart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { type RiverData } from '~/types/types';
import { createRiverChartData, getRiverMinMaxValues } from '~/utils/river-utils';

interface Props {
  title: string;
  chartId: string;
  fieldName: string;
  fieldUnit: string;
  riverData: RiverData;
  minMaxY: {
    defaultMin: number;
    defaultMax: number;
  };
}

const RiverChart = ({ title, chartId, fieldName, fieldUnit, riverData, minMaxY }: Props) => {
  const [chartData, setChartData] = useState<Serie | null>(null);
  const [timeRange, setTimeRange] = useState('30');

  const yScaleMinMax = getRiverMinMaxValues(riverData, minMaxY);

  useEffect(() => {
    setChartData(createRiverChartData(riverData, chartId, parseInt(timeRange)));
  }, [timeRange, riverData, chartId]);

  return (
    <div className="h-[400px] bg-zinc-950">
      <h3 className="pt-2 text-center font-semibold text-blue-400">{title}</h3>
      <Select defaultValue={timeRange} onValueChange={setTimeRange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Time Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="30">30 Days</SelectItem>
          <SelectItem value="20">20 Days</SelectItem>
          <SelectItem value="14">14 Days</SelectItem>
          <SelectItem value="7">7 Days</SelectItem>
          <SelectItem value="5">5 Days</SelectItem>
        </SelectContent>
      </Select>
      {chartData && (
        <LineChart
          data={[chartData]}
          fieldName={fieldName}
          fieldUnit={fieldUnit}
          min={yScaleMinMax.min}
          max={yScaleMinMax.max}
          tickSteps={24}
        />
      )}
    </div>
  );
};

export default RiverChart;
