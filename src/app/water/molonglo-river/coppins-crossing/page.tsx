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

  return (
    <WaterStationContainer
      stationWaterData={waterData}
      levelQualitySteps={molonglo_coppins_crossing.qualitySteps.level}
      dischargeQualitySteps={molonglo_coppins_crossing.qualitySteps.discharge}
      levelChartYScale={molonglo_coppins_crossing.chartYScale.level}
      dischargeChartYScale={molonglo_coppins_crossing.chartYScale.discharge}
    />
  );
};

export default Page;
