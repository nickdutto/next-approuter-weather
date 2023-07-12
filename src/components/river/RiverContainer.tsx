'use client';

import LineChart from '~/components/chart/LineChart';
import RiverTable from '~/components/river/RiverTable';
import { type RiverData } from '~/types/types';
import { createRiverChartData, getRiverMinMaxValues, mergeRiverData } from '~/utils/river-utils';

type Props = {
  watercourseDischarge: RiverData[];
  waterLevel: RiverData[];
};

const RiverContainer = ({ watercourseDischarge, waterLevel }: Props) => {
  const mergedRiverData = mergeRiverData(watercourseDischarge[0], waterLevel[0]);
  const dischargeMinMaxY = getRiverMinMaxValues(watercourseDischarge[0], { defaultMin: 1 });

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-col gap-2">
        <div className="h-[400px] bg-zinc-950">
          <h3 className="pt-2 text-center font-semibold text-blue-400">
            Watercourse Discharge (cumec)
          </h3>
          <LineChart
            data={[createRiverChartData(watercourseDischarge[0], 'Watercourse Discharge')]}
            fieldName="Watercourse Discharge"
            fieldUnit="cumec"
            min={dischargeMinMaxY.min}
            max={dischargeMinMaxY.max}
            tickSteps={24}
          />
        </div>
      </div>
      <RiverTable riverData={mergedRiverData} />
    </div>
  );
};

export default RiverContainer;
