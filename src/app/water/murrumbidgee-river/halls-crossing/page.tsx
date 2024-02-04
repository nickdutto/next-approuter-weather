import WaterStationContainer from '~/components/water/WaterStationContainer';
import { murrumbidgee_halls_crossing } from '~/data/waterdata-stations';
import { getStationWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getStationWaterData({
    id: murrumbidgee_halls_crossing.id,
    name: murrumbidgee_halls_crossing.name,
    waterwayName: murrumbidgee_halls_crossing.waterwayName,
    dischargeId: murrumbidgee_halls_crossing.dischargeId,
    levelId: murrumbidgee_halls_crossing.levelId,
    timezone: murrumbidgee_halls_crossing.timezone,
    subDateRange: { days: 7 },
  });

  const dischargeQualitySteps = {
    low: 0,
    medium: 0,
    high: 0,
    veryHigh: 0,
    extreme: 0,
  };

  const levelQualitySteps = {
    low: 0,
    medium: 0,
    high: 0,
    veryHigh: 0,
    extreme: 0,
  };

  return (
    <WaterStationContainer
      stationWaterData={waterData}
      dischargeQualitySteps={dischargeQualitySteps}
      levelQualitySteps={levelQualitySteps}
      dischargeChartYScale={{ defaultMin: 1, defaultMax: 160 }}
      levelChartYScale={{ defaultMin: 1, defaultMax: 6 }}
    />
  );
};

export default Page;
