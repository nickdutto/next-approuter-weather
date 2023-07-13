'use client';

import { type Serie } from '@nivo/line';

import { useEffect, useState } from 'react';

import LineChart from '~/components/chart/LineChart';
import RiverTable from '~/components/river/RiverTable';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { type RiverData } from '~/types/types';
import { createRiverChartData, getRiverMinMaxValues, mergeRiverData } from '~/utils/river-utils';

interface Props {
  riverData: {
    discharge: RiverData[];
    level: RiverData[];
  };
}

const RiverContainer = ({ riverData }: Props) => {
  const [dischargeTimeRange, setDischargeTimeRange] = useState('30');
  const [levelTimeRange, setLevelTimeRange] = useState('30');
  const [dischargeData, setDischargeData] = useState<Serie | null>(null);
  const [levelData, setLevelData] = useState<Serie | null>(null);

  const mergedRiverData = mergeRiverData(riverData.discharge[0], riverData.level[0]);
  const dischargeMinMaxY = getRiverMinMaxValues(riverData.discharge[0], { defaultMin: 1 });
  const levelMinMaxY = getRiverMinMaxValues(riverData.level[0], { defaultMin: 1, defaultMax: 2 });

  useEffect(() => {
    setDischargeData(
      createRiverChartData(
        riverData.discharge[0],
        'Watercourse Discharge',
        parseInt(dischargeTimeRange),
      ),
    );
  }, [dischargeTimeRange, riverData.discharge]);

  useEffect(() => {
    setLevelData(createRiverChartData(riverData.level[0], 'Water Level', parseInt(levelTimeRange)));
  }, [levelTimeRange, riverData.level]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-col gap-2">
        <div className="h-[400px] bg-zinc-950">
          <h3 className="pt-2 text-center font-semibold text-blue-400">
            Watercourse Discharge (cumec)
          </h3>
          <Select defaultValue={dischargeTimeRange} onValueChange={setDischargeTimeRange}>
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
          {dischargeData && (
            <LineChart
              data={[dischargeData]}
              fieldName="Watercourse Discharge"
              fieldUnit="cumec"
              min={dischargeMinMaxY.min}
              max={dischargeMinMaxY.max}
              tickSteps={24}
            />
          )}
        </div>
        <div className="h-[400px] bg-zinc-950">
          <h3 className="pt-2 text-center font-semibold text-blue-400">River Level (m)</h3>
          <Select defaultValue={levelTimeRange} onValueChange={setLevelTimeRange}>
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
          {levelData && (
            <LineChart
              data={[levelData]}
              fieldName="Watercourse Level"
              fieldUnit="m"
              min={1}
              max={levelMinMaxY.max}
              tickSteps={24}
            />
          )}
        </div>
      </div>
      <RiverTable riverData={mergedRiverData} />
    </div>
  );
};

export default RiverContainer;
