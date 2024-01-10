import RiverInfoCard from '~/components/river/RiverInfoCard';
import RiverTablesContainer from '~/components/river/RiverTablesContainer';
import { orroral_orroral_rd_crossing } from '~/data/waterdata-stations';
import { getRiverData } from '~/server/river';

const Page = async () => {
  const riverData = await getRiverData({
    dischargeId: orroral_orroral_rd_crossing.dischargeId,
    levelId: orroral_orroral_rd_crossing.levelId,
    timeZone: orroral_orroral_rd_crossing.timezone,
    subDateRange: { days: 7 },
  });

  return (
    <main className="flex flex-col gap-4">
      <RiverInfoCard
        station={{
          id: riverData.discharge[0].station_no,
          name: orroral_orroral_rd_crossing.name,
          riverName: orroral_orroral_rd_crossing.waterwayName,
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
      <RiverTablesContainer riverData={riverData} />
    </main>
  );
};

export default Page;
