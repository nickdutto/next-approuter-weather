import WaterStationContainer from '~/components/water/WaterStationContainer';
import { molonglo_sturt_island } from '~/data/waterdata-stations';
import { getStationWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getStationWaterData({
    id: molonglo_sturt_island.id,
    name: molonglo_sturt_island.name,
    waterwayName: molonglo_sturt_island.waterwayName,
    dischargeId: molonglo_sturt_island.dischargeId,
    levelId: molonglo_sturt_island.levelId,
    timezone: molonglo_sturt_island.timezone,
    subDateRange: { days: 7 },
  });

  return (
    <WaterStationContainer
      stationWaterData={waterData}
      levelQualitySteps={molonglo_sturt_island.qualitySteps.level}
      dischargeQualitySteps={molonglo_sturt_island.qualitySteps.discharge}
      levelChartYScale={molonglo_sturt_island.chartYScale.level}
      dischargeChartYScale={molonglo_sturt_island.chartYScale.discharge}
    />
  );
};

export default Page;
