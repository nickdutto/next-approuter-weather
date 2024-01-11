'use client';

import { Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { WiFlood, WiSandstorm } from 'react-icons/wi';

import WaterDataTable from '~/components/water/WaterDataTable';
import { type WaterData } from '~/lib/validators/WaterDataValidator';

type Props = {
  dischargeData: WaterData;
  levelData: WaterData;
};

const WaterDataTablesContainer = ({ dischargeData, levelData }: Props) => {
  const [tab, setTab] = useState<string | null>(null);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    if (isMobile) {
      setTab('level');
    } else if (isDesktop) {
      setTab('both');
    }
  }, [isMobile, isDesktop]);

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
          <TabsList className="gap-0">
            <TabsTab
              value="level"
              fw={600}
              leftSection={<WiFlood size={20} />}
              classNames={{
                tab: tabTabCn('level', '2', 'left'),
                tabSection: 'mr-0',
              }}
            >
              Water Course Level
            </TabsTab>
            <TabsTab
              value="discharge"
              fw={600}
              leftSection={<WiSandstorm size={20} />}
              classNames={{
                tab: tabTabCn('discharge', '2', 'right'),
                tabSection: 'mr-0',
              }}
            >
              Water Course Discharge
            </TabsTab>
          </TabsList>
          <TabsPanel value="level" className="pt-2">
            <WaterDataTable waterData={levelData} />
          </TabsPanel>
          <TabsPanel value="discharge" className="pt-2">
            <WaterDataTable waterData={dischargeData} />
          </TabsPanel>
        </Tabs>
      )}
      {isMobile === false && (
        <Tabs value={tab} onChange={setTab} variant="pills" radius="lg">
          <TabsList className="gap-0">
            <TabsTab
              value="level"
              fw={600}
              leftSection={<WiFlood size={20} />}
              classNames={{
                tab: tabTabCn('level', '3', 'left'),
                tabSection: 'mr-0',
              }}
            >
              Water Course Level
            </TabsTab>
            <TabsTab value="both" fw={600} className={tabTabCn('both', '3', 'middle')}>
              Both
            </TabsTab>
            <TabsTab
              value="discharge"
              fw={600}
              leftSection={<WiSandstorm size={20} />}
              classNames={{
                tab: tabTabCn('discharge', '3', 'right'),
                tabSection: 'mr-0',
              }}
            >
              Water Course Discharge
            </TabsTab>
          </TabsList>
          <TabsPanel value="level" className="pt-2">
            <WaterDataTable waterData={levelData} />
          </TabsPanel>
          <TabsPanel value="both" className="flex gap-2 pt-2">
            <WaterDataTable waterData={levelData} />
            <WaterDataTable waterData={dischargeData} />
          </TabsPanel>
          <TabsPanel value="discharge" className="pt-2">
            <WaterDataTable waterData={dischargeData} />
          </TabsPanel>
        </Tabs>
      )}
    </>
  );
};

export default WaterDataTablesContainer;
