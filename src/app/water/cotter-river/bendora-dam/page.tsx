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

  return (
    <WaterStationContainer
      stationWaterData={waterData}
      levelQualitySteps={cotter_bendora_dam.qualitySteps.level}
      dischargeQualitySteps={cotter_bendora_dam.qualitySteps.discharge}
      levelChartYScale={cotter_bendora_dam.chartYScale.level}
      dischargeChartYScale={cotter_bendora_dam.chartYScale.discharge}
    />
  );
};

export default Page;
