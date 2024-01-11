'use server';

import { type sub } from 'date-fns';

import { getToFromDates } from '~/lib/utils';
import { type WaterData, WaterDataResValidator } from '~/lib/validators/WaterDataValidator';
import { baseWaterDataParams } from '~/lib/water';

type StationDefaults = {
  id: number;
  name: string;
  waterwayName: string;
};

export type Latest = {
  timestamp: string | number | null;
  value: number;
};

export type LatestWaterData = {
  discharge: Latest;
  level: Latest;
};

type getWaterDataParams = StationDefaults & {
  dischargeId: number;
  levelId: number;
  timezone: string;
  subDateRange: Parameters<typeof sub>[1];
};

type GetWaterDataStationInfoParams = StationDefaults & {
  waterData: Omit<WaterData, 'data'>;
  fromDate: string;
  toDate: string;
  timezone: string;
};

export const getBOMWaterData = async (urlSearchParams: URLSearchParams) => {
  const res = await fetch(
    `http://www.bom.gov.au/waterdata/services?${urlSearchParams.toString()}`,
    {
      next: {
        revalidate: 3600,
      },
    },
  ).then((res) => res.json());

  const waterData = WaterDataResValidator.parse(res);

  return waterData[0];
};

export const getWaterData = async ({
  id,
  name,
  waterwayName,
  dischargeId,
  levelId,
  timezone,
  subDateRange,
}: getWaterDataParams) => {
  const { fromDate, toDate } = getToFromDates(timezone, subDateRange);

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

  const discharge = await getBOMWaterData(dischargeParams);
  const level = await getBOMWaterData(levelParams);
  const stationInfo = await getWaterDataStationInfo({
    waterData: discharge,
    id: id,
    name: name,
    waterwayName: waterwayName,
    fromDate: fromDate,
    toDate: toDate,
    timezone: timezone,
  });

  const filteredDischargeData = discharge.data.filter((data) => data[1] !== null);
  const filteredLevelData = level.data.filter((data) => data[1] !== null);

  const latestDischargeData = filteredDischargeData.at(-1);
  const latestLevelData = filteredLevelData.at(-1);

  return {
    station: stationInfo,
    discharge: { ...discharge, data: filteredDischargeData },
    level: { ...level, data: filteredLevelData },
    latest: {
      discharge: {
        timestamp: latestDischargeData?.[0] ?? null,
        value: Number(latestDischargeData?.[1]) ?? 0,
      },
      level: {
        timestamp: latestLevelData?.[0] ?? null,
        value: Number(latestLevelData?.[1]) ?? 0,
      },
    } satisfies LatestWaterData,
  };
};

export const getWaterDataStationInfo = async ({
  waterData,
  id,
  name,
  waterwayName,
  fromDate,
  toDate,
  timezone,
}: GetWaterDataStationInfoParams) => {
  return {
    id: id,
    name: name,
    waterwayName: waterwayName,
    owner: waterData.DATA_OWNER_NAME ?? 'N/A',
    latitude: waterData.station_latitude,
    longitude: waterData.station_longitude,
    fromDate: fromDate,
    toDate: toDate,
    timezone: timezone,
  };
};
