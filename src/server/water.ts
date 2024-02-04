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

export type StationInfo = {
  id: number;
  name: string;
  waterwayName: string;
  owner: string;
  latitude?: number;
  longitude?: number;
  fromDate: string;
  toDate: string;
  timezone: string;
};

export type Latest = {
  timestamp: string | number | null;
  value: number;
};

export type LatestWaterData = {
  discharge: Latest;
  level: Latest;
};

export type StationWaterData = {
  station: StationInfo;
  waterData: {
    discharge: WaterData;
    level: WaterData;
    latest: LatestWaterData;
  } | null;
};

type WaterDataParams = StationDefaults & {
  dischargeId: number;
  levelId: number;
  timezone: string;
  subDateRange: Parameters<typeof sub>[1];
};

type StationInfoParams = StationDefaults & {
  waterData: Omit<WaterData, 'data'> | null;
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

  const waterData = WaterDataResValidator.safeParse(res);

  return waterData;
};

export const getWaterDataStationInfo = ({
  waterData,
  id,
  name,
  waterwayName,
  fromDate,
  toDate,
  timezone,
}: StationInfoParams) => {
  return {
    id: id,
    name: name,
    waterwayName: waterwayName,
    owner: waterData?.DATA_OWNER_NAME ?? 'N/A',
    latitude: waterData?.station_latitude,
    longitude: waterData?.station_longitude,
    fromDate: fromDate,
    toDate: toDate,
    timezone: timezone,
  };
};

export const getStationWaterData = async ({
  id,
  name,
  waterwayName,
  dischargeId,
  levelId,
  timezone,
  subDateRange,
}: WaterDataParams): Promise<StationWaterData> => {
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
  const stationInfo = getWaterDataStationInfo({
    waterData: discharge.success ? discharge.data[0] : null,
    id: id,
    name: name,
    waterwayName: waterwayName,
    fromDate: fromDate,
    toDate: toDate,
    timezone: timezone,
  });

  if (!discharge.success || !level.success) {
    return { station: stationInfo, waterData: null };
  }

  const filteredDischargeData = discharge.data[0].data.filter((data) => data[1] !== null);
  const filteredLevelData = level.data[0].data.filter((data) => data[1] !== null);

  const latestDischargeData = filteredDischargeData.at(-1);
  const latestLevelData = filteredLevelData.at(-1);

  return {
    station: stationInfo,
    waterData: {
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
      },
    },
  };
};
