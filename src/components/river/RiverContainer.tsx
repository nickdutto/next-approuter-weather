'use client';

import LineChart from '~/components/chart/LineChart';
import RiverTable from '~/components/river/RiverTable';
import { type RiverData } from '~/types/types';
import { createRiverChartData, getRiverMinMaxValues, mergeRiverData } from '~/utils/river-utils';

interface Props {
  riverData: {
    discharge: RiverData[];
    level: RiverData[];
  };
}

const RiverContainer = ({ riverData }: Props) => {
  const mergedRiverData = mergeRiverData(riverData.discharge[0], riverData.level[0]);
  const dischargeMinMaxY = getRiverMinMaxValues(riverData.discharge[0], { defaultMin: 1 });
  const levelMinMaxY = getRiverMinMaxValues(riverData.level[0], { defaultMin: 1, defaultMax: 2 });

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-col gap-2">
        <div className="h-[400px] bg-zinc-950">
          <h3 className="pt-2 text-center font-semibold text-blue-400">
            Watercourse Discharge (cumec)
          </h3>
          <LineChart
            data={[createRiverChartData(riverData.discharge[0], 'Watercourse Discharge')]}
            fieldName="Watercourse Discharge"
            fieldUnit="cumec"
            min={dischargeMinMaxY.min}
            max={dischargeMinMaxY.max}
            tickSteps={24}
          />
        </div>
        <div className="h-[400px] bg-zinc-950">
          <h3 className="pt-2 text-center font-semibold text-blue-400">River Level (m)</h3>
          <LineChart
            data={[createRiverChartData(riverData.level[0], 'Water Level')]}
            fieldName="Watercourse Level"
            fieldUnit="m"
            min={1}
            max={levelMinMaxY.max}
            tickSteps={24}
          />
        </div>
      </div>
      <RiverTable riverData={mergedRiverData} />
    </div>
  );
};

export default RiverContainer;
