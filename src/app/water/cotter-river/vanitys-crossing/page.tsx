import WaterStationContainer from '~/components/water/WaterStationContainer';
import { cotter_vanitys_crossing } from '~/data/waterdata-stations';
import { getStationWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getStationWaterData({
    id: cotter_vanitys_crossing.id,
    name: cotter_vanitys_crossing.name,
    waterwayName: cotter_vanitys_crossing.waterwayName,
    dischargeId: cotter_vanitys_crossing.dischargeId,
    levelId: cotter_vanitys_crossing.levelId,
    timezone: cotter_vanitys_crossing.timezone,
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
      dischargeChartYScale={{ defaultMin: 1, defaultMax: 30 }}
      levelChartYScale={{ defaultMin: 1, defaultMax: 3 }}
    />
  );
};

export default Page;
