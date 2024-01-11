'use client';

import { Tabs } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { WiFlood, WiSandstorm } from 'react-icons/wi';

import LineChart from '~/components/chart/LineChart';
import { type SerieWithColor } from '~/lib/weather';

type YScaleMinMax = {
  min: number;
  max: number;
};

type Props = {
  dischargeChartData: SerieWithColor[];
  levelChartData: SerieWithColor[];
  dischargeChartYScale: YScaleMinMax;
  levelChartYScale: YScaleMinMax;
};

const WaterDataChartsContainer = ({
  dischargeChartData,
  levelChartData,
  dischargeChartYScale,
  levelChartYScale,
}: Props) => {
  const [tab, setTab] = useState<string | null>(null);

  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (isMobile) {
      setTab('level');
    } else if (!isMobile) {
      setTab('both');
    }
  }, [isMobile]);

  const tabTabCn = (value: string, tabCount: '2' | '3', position: 'left' | 'middle' | 'right') => {
    return clsx([
      'gap-1 text-m-xs',
      tabCount === '2' && 'w-1/2',
      tabCount === '3' && 'w-1/3',
      position === 'left' && 'rounded-r-none',
      position === 'middle' && 'rounded-none',
      position === 'right' && 'rounded-l-none',
      value === tab && 'bg-[rgba(28,126,214,0.1)] text-m-blue-6',
      value !== tab && 'bg-m-night-5 text-m-dark-2',
    ]);
  };

  return (
    <>
      {isMobile === true && (
        <Tabs value={tab} onChange={setTab} variant="pills" radius="lg">
          <Tabs.List className="gap-0">
            <Tabs.Tab
              value="level"
              fw={600}
              leftSection={<WiFlood size={20} />}
              classNames={{
                tab: tabTabCn('level', '2', 'left'),
                tabSection: 'mr-0',
              }}
            >
              Water Course Level
            </Tabs.Tab>
            <Tabs.Tab
              value="discharge"
              fw={600}
              leftSection={<WiSandstorm size={20} />}
              classNames={{
                tab: tabTabCn('discharge', '2', 'right'),
                tabSection: 'mr-0',
              }}
            >
              Water Course Discharge
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="level" className="pt-2">
            <div className="w-full">
              <div className="h-[400px] w-full rounded-m-lg bg-m-night-7">
                <LineChart
                  data={levelChartData}
                  fieldName="Watercourse Level"
                  fieldUnit="m"
                  min={0}
                  max={levelChartYScale.max}
                />
              </div>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="discharge" className="pt-2">
            <div className="w-full">
              <div className="h-[400px] w-full rounded-m-lg bg-m-night-7">
                <LineChart
                  data={dischargeChartData}
                  fieldName="Watercourse Discharge"
                  fieldUnit="cumec"
                  min={0}
                  max={dischargeChartYScale.max}
                />
              </div>
            </div>
          </Tabs.Panel>
        </Tabs>
      )}
      {isMobile === false && (
        <Tabs value={tab} onChange={setTab} variant="pills" radius="lg">
          <Tabs.List className="gap-0">
            <Tabs.Tab
              value="level"
              fw={600}
              leftSection={<WiFlood size={20} />}
              classNames={{
                tab: tabTabCn('level', '3', 'left'),
                tabSection: 'mr-0',
              }}
            >
              Water Course Level
            </Tabs.Tab>
            <Tabs.Tab value="both" fw={600} className={tabTabCn('both', '3', 'middle')}>
              Both
            </Tabs.Tab>
            <Tabs.Tab
              value="discharge"
              fw={600}
              leftSection={<WiSandstorm size={20} />}
              classNames={{
                tab: tabTabCn('discharge', '3', 'right'),
                tabSection: 'mr-0',
              }}
            >
              Water Course Discharge
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="level" className="pt-2">
            <div className="w-full">
              <div className="h-[400px] w-full rounded-m-lg bg-m-night-7">
                <LineChart
                  data={levelChartData}
                  fieldName="Watercourse Level"
                  fieldUnit="m"
                  min={0}
                  max={levelChartYScale.max}
                />
              </div>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="both" className="flex gap-2 pt-2">
            <div className="flex w-full gap-2">
              <div className="h-[400px] w-full rounded-m-lg bg-m-night-7">
                {levelChartData && (
                  <LineChart
                    data={levelChartData}
                    fieldName="Watercourse Level"
                    fieldUnit="m"
                    min={0}
                    max={levelChartYScale.max}
                  />
                )}
              </div>
              <div className="h-[400px] w-full rounded-m-lg bg-m-night-7">
                {dischargeChartData && (
                  <LineChart
                    data={dischargeChartData}
                    fieldName="Watercourse Discharge"
                    fieldUnit="cumec"
                    min={0}
                    max={dischargeChartYScale.max}
                  />
                )}
              </div>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="discharge" className="pt-2">
            <div className="w-full">
              <div className="h-[400px] w-full rounded-m-lg bg-m-night-7">
                <LineChart
                  data={dischargeChartData}
                  fieldName="Watercourse Discharge"
                  fieldUnit="cumec"
                  min={0}
                  max={dischargeChartYScale.max}
                />
              </div>
            </div>
          </Tabs.Panel>
        </Tabs>
      )}
    </>
  );
};

export default WaterDataChartsContainer;
