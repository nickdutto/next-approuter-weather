import WaterStationContainer from '~/components/water/WaterStationContainer';
import { molonglo_sturt_island } from '~/data/waterdata-stations';
import { getWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getWaterData({
    id: molonglo_sturt_island.id,
    name: molonglo_sturt_island.name,
    waterwayName: molonglo_sturt_island.waterwayName,
    dischargeId: molonglo_sturt_island.dischargeId,
    levelId: molonglo_sturt_island.levelId,
    timezone: molonglo_sturt_island.timezone,
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
      station={waterData.station}
      dischargeData={waterData.discharge}
      levelData={waterData.level}
      latest={waterData.latest}
      dischargeQualitySteps={dischargeQualitySteps}
      levelQualitySteps={levelQualitySteps}
      dischargeChartYScale={{ defaultMin: 1, defaultMax: 60 }}
      levelChartYScale={{ defaultMin: 1, defaultMax: 4 }}
    />
  );
};

export default Page;
