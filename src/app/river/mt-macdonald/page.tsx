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

  return {
    discharge: dischargeData,
    level: levelData,
    fromDate: fromDate,
    toDate: toDate,
    timeZone: timeZone,
  };
};

const Page = async () => {
  const riverData = await getRiverData();

  const filteredDischargeData = riverData.discharge[0].data.filter((data) => data[1] !== null);
  const filteredLevelData = riverData.level[0].data.filter((data) => data[1] !== null);

  const lastDischarge = filteredDischargeData[filteredDischargeData.length - 1];
  const lastLevel = filteredLevelData[filteredLevelData.length - 1];

  const dischargeQuality = (discharge: number) => {
    return clsx([
      'h-[16px] w-[16px] rounded-full',
      discharge <= 10 && 'bg-blue-500',
      discharge > 10 && discharge <= 15 && 'bg-green-500',
      discharge > 15 && discharge <= 20 && 'bg-yellow-500',
      discharge > 20 && discharge <= 30 && 'bg-orange-500',
      discharge > 30 && 'bg-red-500',
    ]);
  };

  const levelQuality = (level: number) => {
    return clsx([
      'h-[16px] w-[16px] rounded-full',
      level <= 1.4 && 'bg-blue-500',
      level > 1.4 && level <= 1.5 && 'bg-green-500',
      level > 1.5 && level <= 1.6 && 'bg-yellow-500',
      level > 1.6 && level <= 1.7 && 'bg-orange-500',
      level > 1.7 && 'bg-red-500',
    ]);
  };

  return (
    <main className="flex flex-col gap-4">
      <div className="pt-4">
        <div className="flex items-center justify-between rounded-m-lg bg-m-night-7 p-4">
          <div>
            <h2 className="text-2xl font-bold">{riverData.discharge[0].station_longname}</h2>
            <p>
              Latest Discharge:{' '}
              {formatInTimeZone(lastDischarge[0], riverData.timeZone, 'dd/MM/yy - HH:mm')}
            </p>
            <p>
              Latest Level: {formatInTimeZone(lastLevel[0], riverData.timeZone, 'dd/MM/yy - HH:mm')}
            </p>
            <div className="flex items-center gap-2">
              <p>Discharge Quality:</p>
              <div className={dischargeQuality(Number(lastDischarge[1]))} />
            </div>
            <div className="flex items-center gap-2">
              <p>Level Quality:</p>
              <div className={levelQuality(Number(lastLevel[1]))} />
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
        <NewRiverTable riverData={[{ ...riverData.discharge[0], data: filteredDischargeData }]} />
      </div>
    </main>
  );
};

export default Page;
