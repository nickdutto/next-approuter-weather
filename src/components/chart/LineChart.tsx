'use client';

import { type LineProps } from '@nivo/line';

import dynamic from 'next/dynamic';

import ChartTooltip from '~/components/chart/ChartTooltip';

const ResponsiveLine = dynamic(() => import('@nivo/line').then((m) => m.ResponsiveLine), {
  ssr: false,
});

type Props = LineProps & {
  data: LineProps['data'];
  min: number | 'auto' | undefined;
  max: number | 'auto' | undefined;
  fieldName: string;
  fieldUnit: string;
};

const LineChart = ({ data, margin, min, max, fieldName, fieldUnit, ...props }: Props) => {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 20, bottom: 60, left: 60, ...margin }}
      xScale={{ format: '%Y-%m-%dT%H:%M:%S.%L%Z', type: 'time', precision: 'minute' }}
      xFormat="time:%d/%m/%Y-%H:%M"
      yScale={{
        type: 'linear',
        min: min,
        max: max,
      }}
      yFormat=" >-.2f"
      curve="natural"
      axisTop={null}
      axisRight={null}
      axisBottom={null}
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
        grid: { line: { stroke: '#26262B ' } },
        axis: {
          ticks: { line: { stroke: '#26262B ' }, text: { fill: '#909296' } },
          legend: { text: { fill: '#909296' } },
        },
        crosshair: { line: { stroke: '#62626f' } },
      }}
      pointLabelYOffset={-12}
      useMesh={true}
      tooltip={({ point }) => (
        <ChartTooltip point={point} fieldUnit={fieldUnit} xElemCount={data[0].data.length} />
      )}
      {...props}
    />
  );
};

export default LineChart;
