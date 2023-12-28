'use client';

import { Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

import RiverTable from '~/components/river/RiverTable';
import { type RiverData } from '~/types/types';

type Props = {
  riverData: {
    discharge: RiverData[];
    level: RiverData[];
  };
};

const RiverTablesContainer = ({ riverData }: Props) => {
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
      'text-m-xs sm:text-m-sm',
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
        <Tabs variant="pills" value={tab} onChange={setTab}>
          <TabsList className="gap-0">
            <TabsTab value="level" fw={600} className={tabTabCn('level', '2', 'left')}>
              Water Course Level
            </TabsTab>
            <TabsTab value="discharge" fw={600} className={tabTabCn('discharge', '2', 'right')}>
              Water Course Discharge
            </TabsTab>
          </TabsList>
          <TabsPanel value="level" className="pt-2">
            <RiverTable riverData={riverData.level} />
          </TabsPanel>
          <TabsPanel value="discharge" className="pt-2">
            <RiverTable riverData={riverData.discharge} />
          </TabsPanel>
        </Tabs>
      )}
      {isMobile === false && (
        <Tabs variant="pills" value={tab} onChange={setTab}>
          <TabsList className="gap-0">
            <TabsTab value="level" fw={600} className={tabTabCn('level', '3', 'left')}>
              Water Course Level
            </TabsTab>
            <TabsTab value="both" fw={600} className={tabTabCn('both', '3', 'middle')}>
              Both
            </TabsTab>
            <TabsTab value="discharge" fw={600} className={tabTabCn('discharge', '3', 'right')}>
              Water Course Discharge
            </TabsTab>
          </TabsList>
          <TabsPanel value="level" className="pt-2">
            <RiverTable riverData={riverData.level} />
          </TabsPanel>
          <TabsPanel value="both" className="flex gap-2 pt-2">
            <RiverTable riverData={riverData.level} />
            <RiverTable riverData={riverData.discharge} />
          </TabsPanel>
          <TabsPanel value="discharge" className="pt-2">
            <RiverTable riverData={riverData.discharge} />
          </TabsPanel>
        </Tabs>
      )}
    </>
  );
};

export default RiverTablesContainer;
