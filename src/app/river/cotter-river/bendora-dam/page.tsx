import RiverInfoCard from '~/components/river/RiverInfoCard';
import RiverTablesContainer from '~/components/river/RiverTablesContainer';
import { cotter_bendora_dam } from '~/data/waterdata-stations';
import { getRiverData } from '~/server/river';

const Page = async () => {
  const riverData = await getRiverData({
    dischargeId: cotter_bendora_dam.dischargeId,
    levelId: cotter_bendora_dam.levelId,
    timeZone: cotter_bendora_dam.timezone,
    subDateRange: { days: 7 },
  });

  return (
    <main className="flex flex-col gap-4">
      <RiverInfoCard
        station={{
          id: riverData.discharge[0].station_no,
          name: cotter_bendora_dam.name,
          riverName: cotter_bendora_dam.waterwayName,
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
