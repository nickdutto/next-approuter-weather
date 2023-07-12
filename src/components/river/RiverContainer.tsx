'use client';

import RiverTable from '~/components/river/RiverTable';
import { type RiverData } from '~/types/types';
import { mergeRiverData } from '~/utils/river-utils';

type Props = {
  watercourseDischarge: RiverData[];
  waterLevel: RiverData[];
};

const RiverContainer = ({ watercourseDischarge, waterLevel }: Props) => {
  const mergedRiverData = mergeRiverData(watercourseDischarge[0], waterLevel[0]);

  return (
    <div className="flex w-full flex-col gap-2">
      <RiverTable riverData={mergedRiverData} />
    </div>
  );
};

export default RiverContainer;
