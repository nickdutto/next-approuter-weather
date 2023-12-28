import RiverInfoCard from '~/components/river/RiverInfoCard';
import RiverTable from '~/components/river/RiverTable';
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
    ts_id: '1091010',
  });
  const levelParams = new URLSearchParams({
    ...baseWaterDataParams,
    from: fromDate,
    to: toDate,
    ts_id: '1117010',
  });

  const dischargeData = await getDischargeData(dischargeParams);
  const levelData = await getLevelData(levelParams);

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

const Page = async () => {
  const riverData = await getRiverData();

  return (
    <main className="flex flex-col gap-4">
      <RiverInfoCard
        station={{
          id: riverData.discharge[0].station_no,
          name: riverData.discharge[0].station_longname,
          owner: riverData.discharge[0].DATA_OWNER_NAME,
          latitude: riverData.discharge[0].station_latitude,
          longitude: riverData.discharge[0].station_longitude,
          fromDate: riverData.fromDate,
          toDate: riverData.toDate,
          timeZone: riverData.timeZone,
        }}
        dischargeQualitySteps={{
          low: 10,
          medium: 15,
          high: 20,
          veryHigh: 30,
          extreme: 40,
        }}
        levelQualitySteps={{
          low: 1.4,
          medium: 1.5,
          high: 1.6,
          veryHigh: 1.7,
          extreme: 1.8,
        }}
        latest={riverData.latest}
      />
      <div className="flex gap-2">
        <RiverTable riverData={riverData.level} />
        <RiverTable riverData={riverData.discharge} />
      </div>
    </main>
  );
};

export default Page;
