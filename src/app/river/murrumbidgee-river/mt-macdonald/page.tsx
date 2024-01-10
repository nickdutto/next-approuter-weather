import LineChart from '~/components/chart/LineChart';
import RiverInfoCard from '~/components/river/RiverInfoCard';
import RiverTablesContainer from '~/components/river/RiverTablesContainer';
import { murrumbidgee_mt_macdonald } from '~/data/waterdata-stations';
import { getRiverData } from '~/server/river';
import { createRiverChartData, getRiverMinMaxValues } from '~/utils/river-utils';

const Page = async () => {
  const riverData = await getRiverData({
    dischargeId: murrumbidgee_mt_macdonald.dischargeId,
    levelId: murrumbidgee_mt_macdonald.levelId,
    timeZone: murrumbidgee_mt_macdonald.timezone,
    subDateRange: { days: 7 },
  });

  const dischargeChartData = createRiverChartData(
    riverData.discharge[0],
    'WatercourseDischarge',
    7,
    [{ low: 0, high: 2000, color: '#3b82f6' }],
  );
  const dischargeYScaleMinMax = getRiverMinMaxValues(riverData.discharge[0], {
    defaultMin: 1,
    defaultMax: 40,
  });
  const levelChartData = createRiverChartData(riverData.level[0], 'WatercourseDischarge', 7, [
    { low: 0, high: 2000, color: '#3b82f6' },
  ]);
  const levelYScaleMinMax = getRiverMinMaxValues(riverData.level[0], {
    defaultMin: 1,
    defaultMax: 2,
  });

  return (
    <main className="flex flex-col gap-4">
      <RiverInfoCard
        station={{
          id: riverData.discharge[0].station_no,
          name: murrumbidgee_mt_macdonald.name,
          riverName: murrumbidgee_mt_macdonald.waterwayName,
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
      <div className="flex w-full gap-2">
        <div className="h-[400px] w-full rounded-m-lg bg-m-night-7">
          {levelChartData && (
            <LineChart
              data={levelChartData}
              fieldName="Watercourse Discharge"
              fieldUnit="cumec"
              min={0}
              max={levelYScaleMinMax.max + 1}
              tickSteps={8}
            />
          )}
        </div>
        <div className="h-[400px] w-full rounded-m-lg bg-m-night-7">
          {dischargeChartData && (
            <LineChart
              data={dischargeChartData}
              fieldName="Watercourse Discharge"
              fieldUnit="cumec"
              min={0}
              max={dischargeYScaleMinMax.max + 10}
              tickSteps={8}
            />
          )}
        </div>
      </div>
      <RiverTablesContainer riverData={riverData} />
    </main>
  );
};

export default Page;
