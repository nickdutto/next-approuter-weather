'use client';

import { DatumValue, LineProps } from '@nivo/line';

import dynamic from 'next/dynamic';

import ChartTooltip from '~/components/chart/ChartTooltip';

const ResponsiveLine = dynamic(() => import('@nivo/line').then((m) => m.ResponsiveLine), {
  ssr: false,
});

type Props = {
  data: LineProps['data'];
  min?: number;
  max?: number;
  fieldName: string;
  fieldUnit: string;
};

const LineChart = ({ data, min, max, fieldName, fieldUnit }: Props) => {
  const tickValues = data[0].data.filter((_, i) => i % 24 === 0).map((d) => d.x);

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 20, bottom: 90, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: min ? min : 'auto',
        max: max ? max : 'auto',
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="natural"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickValues: tickValues,
        tickSize: 5,
        tickPadding: 0,
        tickRotation: 90,
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 0,
        tickRotation: 0,
        legend: `${fieldName} (${fieldUnit})`,
        legendOffset: -45,
        legendPosition: 'middle',
      }}
      enablePoints={false}
      enableGridX={false}
      colors={{ scheme: 'category10' }}
      theme={{
        textColor: '#a1a1aa',
        grid: { line: { stroke: '#27272a' } },
        axis: { ticks: { line: { stroke: '#27272a' } } },
        crosshair: { line: { stroke: '#71717a' } },
      }}
      markers={tickValues.map((tick, i) => ({
        axis: 'x',
        value: tick as DatumValue,
        lineStyle: { stroke: '#27272a' },
      }))}
      pointLabelYOffset={-12}
      useMesh={true}
      tooltip={({ point }) => <ChartTooltip point={point} fieldUnit={fieldUnit} />}
    />
  );
};

export default LineChart;
