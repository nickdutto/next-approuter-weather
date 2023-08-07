'use client';

import { type LineProps } from '@nivo/line';

import dynamic from 'next/dynamic';

import ChartTooltip from '~/components/chart/ChartTooltip';

const ResponsiveLine = dynamic(() => import('@nivo/line').then((m) => m.ResponsiveLine), {
  ssr: false,
});

interface Props {
  data: LineProps['data'];
  min?: number;
  max?: number;
  fieldName: string;
  fieldUnit: string;
  tickSteps?: number;
}

const LowHighLineChart = ({ data, min, max, fieldName, fieldUnit, tickSteps = 24 }: Props) => {
  const tickValues = data[0].data.filter((_, i) => i % tickSteps === 0).map((d) => d.x);

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 20, bottom: 120, left: 60 }}
      xScale={{ format: '%Y-%m-%dT%H:%M:%S.%L%Z', type: 'time', precision: 'minute' }}
      xFormat="time:%d/%m/%Y-%H:%M"
      yScale={{
        type: 'linear',
        min: min ? min : 'auto',
        max: max ? max : 'auto',
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
      colors={{ datum: 'color' }}
      theme={{
        textColor: '#a1a1aa',
        grid: { line: { stroke: '#27272a' } },
        axis: { ticks: { line: { stroke: '#27272a' } } },
        crosshair: { line: { stroke: '#71717a' } },
      }}
      markers={tickValues.map((tick) => ({
        axis: 'x',
        value: tick!,
        lineStyle: { stroke: '#27272a' },
      }))}
      pointLabelYOffset={-12}
      useMesh={true}
      tooltip={({ point }) => (
        <ChartTooltip point={point} fieldUnit={fieldUnit} xElemCount={data[0].data.length} />
      )}
    />
  );
};

export default LowHighLineChart;
