import WaterStationContainer from '~/components/water/WaterStationContainer';
import { molonglo_coppins_crossing } from '~/data/waterdata-stations';
import { getStationWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getStationWaterData({
    id: molonglo_coppins_crossing.id,
    name: molonglo_coppins_crossing.name,
    waterwayName: molonglo_coppins_crossing.waterwayName,
    dischargeId: molonglo_coppins_crossing.dischargeId,
    levelId: molonglo_coppins_crossing.levelId,
    timezone: molonglo_coppins_crossing.timezone,
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
      dischargeChartYScale={{ defaultMin: 1, defaultMax: 60 }}
      levelChartYScale={{ defaultMin: 1, defaultMax: 4 }}
    />
  );
};

export default Page;
