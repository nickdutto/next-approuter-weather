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

  return (
    <WaterStationContainer
      stationWaterData={waterData}
      levelQualitySteps={cotter_vanitys_crossing.qualitySteps.level}
      dischargeQualitySteps={cotter_vanitys_crossing.qualitySteps.discharge}
      levelChartYScale={cotter_vanitys_crossing.chartYScale.level}
      dischargeChartYScale={cotter_vanitys_crossing.chartYScale.discharge}
    />
  );
};

export default Page;
