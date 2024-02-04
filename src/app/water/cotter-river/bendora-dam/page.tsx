import WaterStationContainer from '~/components/water/WaterStationContainer';
import { cotter_bendora_dam } from '~/data/waterdata-stations';
import { getStationWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getStationWaterData({
    id: cotter_bendora_dam.id,
    name: cotter_bendora_dam.name,
    waterwayName: cotter_bendora_dam.waterwayName,
    dischargeId: cotter_bendora_dam.dischargeId,
    levelId: cotter_bendora_dam.levelId,
    timezone: cotter_bendora_dam.timezone,
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
      dischargeChartYScale={{ defaultMin: 1, defaultMax: 20 }}
      levelChartYScale={{ defaultMin: 1, defaultMax: 3 }}
    />
  );
};

export default Page;
