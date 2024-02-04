import WaterStationContainer from '~/components/water/WaterStationContainer';
import { orroral_orroral_rd_crossing } from '~/data/waterdata-stations';
import { getStationWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getStationWaterData({
    id: orroral_orroral_rd_crossing.id,
    name: orroral_orroral_rd_crossing.name,
    waterwayName: orroral_orroral_rd_crossing.waterwayName,
    dischargeId: orroral_orroral_rd_crossing.dischargeId,
    levelId: orroral_orroral_rd_crossing.levelId,
    timezone: orroral_orroral_rd_crossing.timezone,
    subDateRange: { days: 7 },
  });

  return (
    <WaterStationContainer
      stationWaterData={waterData}
      levelQualitySteps={orroral_orroral_rd_crossing.qualitySteps.level}
      dischargeQualitySteps={orroral_orroral_rd_crossing.qualitySteps.discharge}
      levelChartYScale={orroral_orroral_rd_crossing.chartYScale.level}
      dischargeChartYScale={orroral_orroral_rd_crossing.chartYScale.discharge}
    />
  );
};

export default Page;
