import clsx from 'clsx';
import { formatInTimeZone } from 'date-fns-tz';

import NewRiverTable from '~/components/river/NewRiverTable';
import { baseWaterDataParams } from '~/lib/river';
import { getToFromDates } from '~/lib/utils';
import { type RiverData } from '~/types/types';

const getDischargeData = async (urlSearchParams: URLSearchParams) => {
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

const getLevelData = async (urlSearchParams: URLSearchParams) => {
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

const getRiverData = async () => {
  const timeZone = 'Australia/Canberra';
  const { fromDate, toDate } = getToFromDates(timeZone, { days: 7 });

  const dischargeParams = new URLSearchParams({
    ...baseWaterDataParams,
    from: fromDate,
    to: toDate,
    ts_id: '1795010',
  });
  const levelParams = new URLSearchParams({
    ...baseWaterDataParams,
    from: fromDate,
    to: toDate,
    ts_id: '1821010',
  });

  const dischargeData = await getDischargeData(dischargeParams);
  const levelData = await getLevelData(levelParams);

  const filteredDischargeData = dischargeData[0].data.filter((data) => data[1] !== null);
  const filteredLevelData = levelData[0].data.filter((data) => data[1] !== null);

  const lastDischarge = filteredDischargeData.at(-1);
  const lastLevel = filteredLevelData.at(-1);

  return {
    discharge: [{ ...dischargeData[0], data: filteredDischargeData }],
    level: [{ ...levelData[0], data: filteredLevelData }],
    last: {
      discharge: {
        timestamp: lastDischarge?.[0],
        value: Number(lastDischarge?.[1]) ?? 0,
      },
      level: {
        timestamp: lastLevel?.[0],
        value: Number(lastLevel?.[1]) ?? 0,
      },
    },
    fromDate: fromDate,
    toDate: toDate,
    timeZone: timeZone,
  };
};

const Page = async () => {
  const riverData = await getRiverData();

  const dischargeQuality = riverQualityCn(riverData.last.discharge.value, {
    low: 10,
    medium: 15,
    high: 20,
    veryHigh: 30,
    extreme: 40,
  });

  const levelQuality = riverQualityCn(riverData.last.level.value, {
    low: 1.4,
    medium: 1.5,
    high: 1.6,
    veryHigh: 1.7,
    extreme: 1.8,
  });

  return (
    <main className="flex flex-col gap-4">
      <div className="pt-4">
        <div className="flex items-center justify-between rounded-m-lg bg-m-night-7 p-4">
          <div>
            <h2 className="text-2xl font-bold">{riverData.discharge[0].station_longname}</h2>
            <p>
              Latest Discharge:{' '}
              {riverData.last.discharge.timestamp &&
                formatInTimeZone(
                  riverData.last.discharge.timestamp,
                  riverData.timeZone,
                  'dd/MM/yy - HH:mm',
                )}
            </p>
            <p>
              Latest Level:{' '}
              {riverData.last.level.timestamp &&
                formatInTimeZone(
                  riverData.last.level.timestamp,
                  riverData.timeZone,
                  'dd/MM/yy - HH:mm',
                )}
            </p>
            <div className="flex items-center gap-2">
              <p>Discharge Quality:</p>
              <div className="relative flex h-4 w-4">
                <div
                  className={cn(dischargeQuality, 'relative inline-flex h-4 w-4 rounded-full')}
                />
                <div
                  className={cn(
                    dischargeQuality,
                    'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                  )}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p>Level Quality:</p>
              <div className="relative flex h-4 w-4">
                <div className={cn(levelQuality, 'relative inline-flex h-4 w-4 rounded-full')} />
                <div
                  className={cn(
                    levelQuality,
                    'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                  )}
                />
              </div>
            </div>
          </div>
          <div>
            <p>
              <span className="font-semibold">Station:</span> {riverData.discharge[0].station_no}
            </p>
            <p>
              <span className="font-semibold">Latitude:</span>{' '}
              {riverData.discharge[0].station_latitude}
            </p>
            <p>
              <span className="font-semibold">Longitude:</span>{' '}
              {riverData.discharge[0].station_longitude}
            </p>
            <p>
              <span className="font-semibold">Owner:</span> {riverData.discharge[0].DATA_OWNER_NAME}
            </p>
            <p>
              <span className="font-semibold">Range:</span>{' '}
              {formatInTimeZone(riverData.fromDate, riverData.timeZone, 'dd/MM/yy')} -{' '}
              {formatInTimeZone(riverData.toDate, riverData.timeZone, 'dd/MM/yy')}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <NewRiverTable riverData={riverData.level} />
        <NewRiverTable riverData={riverData.discharge} />
      </div>
    </main>
  );
};

export default Page;
