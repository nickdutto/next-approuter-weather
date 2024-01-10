'use server';

import { type sub } from 'date-fns';

import { baseWaterDataParams } from '~/lib/river';
import { getToFromDates } from '~/lib/utils';
import { type RiverData } from '~/types/types';

export const getBOMWaterData = async (urlSearchParams: URLSearchParams) => {
  const res = await fetch(
    `http://www.bom.gov.au/waterdata/services?${urlSearchParams.toString()}`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  return (await res.json()) as RiverData[];
};

type GetRiverDataParams = {
  dischargeId: number;
  levelId: number;
  timeZone: string;
  subDateRange: Parameters<typeof sub>[1];
};

export const getRiverData = async ({
  dischargeId,
  levelId,
  timeZone,
  subDateRange,
}: GetRiverDataParams) => {
  const { fromDate, toDate } = getToFromDates(timeZone, subDateRange);

  const dischargeParams = new URLSearchParams({
    ...baseWaterDataParams,
    from: fromDate,
    to: toDate,
    ts_id: dischargeId.toString(),
  });
  const levelParams = new URLSearchParams({
    ...baseWaterDataParams,
    from: fromDate,
    to: toDate,
    ts_id: levelId.toString(),
  });

  const dischargeData = await getBOMWaterData(dischargeParams);
  const levelData = await getBOMWaterData(levelParams);

  const filteredDischargeData = dischargeData[0].data.filter((data) => data[1] !== null);
  const filteredLevelData = levelData[0].data.filter((data) => data[1] !== null);

  const latestDischarge = filteredDischargeData.at(-1);
  const latestLevel = filteredLevelData.at(-1);

  return {
    discharge: [{ ...dischargeData[0], data: filteredDischargeData }],
    level: [{ ...levelData[0], data: filteredLevelData }],
    latest: {
      discharge: {
        timestamp: latestDischarge?.[0],
        value: Number(latestDischarge?.[1]) ?? 0,
      },
      level: {
        timestamp: latestLevel?.[0],
        value: Number(latestLevel?.[1]) ?? 0,
      },
    },
    fromDate: fromDate,
    toDate: toDate,
    timeZone: timeZone,
  };
};
