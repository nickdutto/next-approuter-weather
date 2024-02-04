'use client';

import { Tabs } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { WiFlood, WiSandstorm } from 'react-icons/wi';

import LineChart from '~/components/chart/LineChart';
import { type DefaultChartYScale } from '~/data/waterdata-stations';
import { type WaterData } from '~/lib/validators/WaterDataValidator';
import { createWaterChartData, getWaterMinMaxValues } from '~/lib/water';

type Props = {
  discharge: WaterData;
  level: WaterData;
  dischargeChartOptions: {
    low: number;
    high: number;
    color: string;
  };
  levelChartOptions: {
    low: number;
    high: number;
    color: string;
  };
  dischargeChartYScale: DefaultChartYScale;
  levelChartYScale: DefaultChartYScale;
};

const WaterDataChartsContainer = ({
  discharge,
  level,
  dischargeChartOptions,
  levelChartOptions,
  dischargeChartYScale,
  levelChartYScale,
}: Props) => {
  const [tab, setTab] = useState<string | null>(null);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const levelChartData = useMemo(() => {
    const chartData = createWaterChartData(level, 'WatercourseLevel', 7, [levelChartOptions]);

    const yScale = getWaterMinMaxValues(level.data, 'level', levelChartYScale);

    return {
      data: chartData,
      yScale: yScale,
    };
  }, [level, levelChartOptions, levelChartYScale]);

  const dischargeChartData = useMemo(() => {
    const chartData = createWaterChartData(discharge, 'WatercourseDischarge', 7, [
      dischargeChartOptions,
    ]);

    const yScale = getWaterMinMaxValues(discharge.data, 'discharge', dischargeChartYScale);

    return {
      data: chartData,
      yScale: yScale,
    };
  }, [discharge, dischargeChartOptions, dischargeChartYScale]);

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

  console.log(dischargeChartData.yScale);

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
                  data={levelChartData.data}
                  fieldName="Watercourse Level"
                  fieldUnit="m"
                  min={0}
                  max={levelChartData.yScale.max}
                />
              </div>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="discharge" className="pt-2">
            <div className="w-full">
              <div className="h-[400px] w-full rounded-m-lg bg-m-night-7">
                <LineChart
                  data={dischargeChartData.data}
                  fieldName="Watercourse Discharge"
                  fieldUnit="cumec"
                  min={0}
                  max={dischargeChartData.yScale.max}
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
                  data={levelChartData.data}
                  fieldName="Watercourse Level"
                  fieldUnit="m"
                  min={0}
                  max={levelChartData.yScale.max}
                />
              </div>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="both" className="flex gap-2 pt-2">
            <div className="flex w-full gap-2">
              <div className="h-[400px] w-full rounded-m-lg bg-m-night-7">
                {levelChartData && (
                  <LineChart
                    data={levelChartData.data}
                    fieldName="Watercourse Level"
                    fieldUnit="m"
                    min={0}
                    max={levelChartData.yScale.max}
                  />
                )}
              </div>
              <div className="h-[400px] w-full rounded-m-lg bg-m-night-7">
                {dischargeChartData && (
                  <LineChart
                    data={dischargeChartData.data}
                    fieldName="Watercourse Discharge"
                    fieldUnit="cumec"
                    min={0}
                    max={dischargeChartData.yScale.max}
                  />
                )}
              </div>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="discharge" className="pt-2">
            <div className="w-full">
              <div className="h-[400px] w-full rounded-m-lg bg-m-night-7">
                <LineChart
                  data={dischargeChartData.data}
                  fieldName="Watercourse Discharge"
                  fieldUnit="cumec"
                  min={0}
                  max={dischargeChartData.yScale.max}
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
