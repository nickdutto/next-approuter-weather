import WaterStationContainer from '~/components/water/WaterStationContainer';
import { cotter_gingera } from '~/data/waterdata-stations';
import { getStationWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getStationWaterData({
    id: cotter_gingera.id,
    name: cotter_gingera.name,
    waterwayName: cotter_gingera.waterwayName,
    dischargeId: cotter_gingera.dischargeId,
    levelId: cotter_gingera.levelId,
    timezone: cotter_gingera.timezone,
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
      dischargeChartYScale={{ defaultMin: 1, defaultMax: 10 }}
      levelChartYScale={{ defaultMin: 1, defaultMax: 2 }}
    />
  );
};

export default Page;
