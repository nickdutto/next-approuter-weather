import WaterStationContainer from '~/components/water/WaterStationContainer';
import { cotter_corin_dam } from '~/data/waterdata-stations';
import { getStationWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getStationWaterData({
    id: cotter_corin_dam.id,
    name: cotter_corin_dam.name,
    waterwayName: cotter_corin_dam.waterwayName,
    dischargeId: cotter_corin_dam.dischargeId,
    levelId: cotter_corin_dam.levelId,
    timezone: cotter_corin_dam.timezone,
    subDateRange: { days: 7 },
  });

  return (
    <WaterStationContainer
      stationWaterData={waterData}
      levelQualitySteps={cotter_corin_dam.qualitySteps.level}
      dischargeQualitySteps={cotter_corin_dam.qualitySteps.discharge}
      levelChartYScale={cotter_corin_dam.chartYScale.level}
      dischargeChartYScale={cotter_corin_dam.chartYScale.discharge}
    />
  );
};

export default Page;
