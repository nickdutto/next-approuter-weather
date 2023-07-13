import { type Serie } from '@nivo/line';

import { formatInTimeZone } from 'date-fns-tz';

import { type RiverData } from '~/types/types';

export type MergedRiverData = {
  date: string;
  discharge?: number;
  level?: number;
}[];

export const createRiverChartData = (riverData: RiverData, name: string): Serie => {
  const mappedData = riverData.data.map((data) => {
    return {
      x: formatInTimeZone(data[0], 'Australia/Canberra', 'dd/MM/yy-HH:mm'),
      y: data[1],
    };
  });

  return {
    id: name,
    data: mappedData,
  };
};

export const getRiverMinMaxValues = (
  riverData: RiverData,
  { defaultMin = 0, defaultMax = 40 } = {},
) => {
  const mappedData = riverData.data
    .filter((data) => typeof data[1] === 'number')
    .map((data) => {
      return data[1]!;
    });

  const min = Math.min(...mappedData);
  const max = Math.max(...mappedData);

  return {
    min: min < defaultMin ? min : defaultMin,
    max: max > defaultMax ? max : defaultMax,
  };
};

export const mergeRiverData = (discharge: RiverData, level: RiverData) => {
  const mergedArray: MergedRiverData = [];
  const dischargeMap = new Map(discharge.data);
  const levelMap = new Map(level.data);
  const allDates = new Set([...dischargeMap.keys(), ...levelMap.keys()]);
  for (const date of allDates) {
    const dischargeValue = dischargeMap.get(date);
    const levelValue = levelMap.get(date);

    if (dischargeValue ?? levelValue) {
      mergedArray.push({
        date,
        discharge: dischargeValue,
        level: levelValue,
      });
    }
  }

  return mergedArray;
};
