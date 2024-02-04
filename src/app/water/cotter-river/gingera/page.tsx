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

  return (
    <WaterStationContainer
      stationWaterData={waterData}
      levelQualitySteps={cotter_gingera.qualitySteps.level}
      dischargeQualitySteps={cotter_gingera.qualitySteps.discharge}
      levelChartYScale={cotter_gingera.chartYScale.level}
      dischargeChartYScale={cotter_gingera.chartYScale.discharge}
    />
  );
};

export default Page;
