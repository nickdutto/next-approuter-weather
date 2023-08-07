'use client';

import RiverChart from '~/components/river/RiverChart';
import RiverTable from '~/components/river/RiverTable';
import { ScrollArea } from '~/components/ui/scroll-area';
import { type RiverData } from '~/types/types';
import { mergeRiverData } from '~/utils/river-utils';

interface Props {
  riverData: {
    discharge: RiverData[];
    level: RiverData[];
  };
}

const RiverContainer = ({ riverData }: Props) => {
  const mergedRiverData = mergeRiverData(riverData.discharge[0], riverData.level[0]);

  return (
    <div className="flex w-full flex-col lg:flex-row lg:gap-2 lg:p-[8px]">
      <div className="flex w-full flex-col gap-2">
        <RiverChart
          title="Watercourse Discharge (cumec)"
          chartId="WatercourseDischarge"
          fieldName="Watercourse Discharge"
          fieldUnit="cumec"
          riverData={riverData.discharge[0]}
          minMaxY={{ defaultMin: 1, defaultMax: 40 }}
        />
        <RiverChart
          title="River Level (m)"
          chartId="WaterLevel"
          fieldName="Water Level"
          fieldUnit="m"
          riverData={riverData.level[0]}
          minMaxY={{ defaultMin: 1, defaultMax: 2 }}
        />
      </div>
      <ScrollArea className="lg:h-[calc(100vh-66px)] lg:w-[400px]" type="always">
        <RiverTable riverData={mergedRiverData} />
      </ScrollArea>
    </div>
  );
};

export default RiverContainer;
