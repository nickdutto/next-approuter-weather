import WaterStationContainer from '~/components/water/WaterStationContainer';
import { gudgenby_tennent } from '~/data/waterdata-stations';
import { getStationWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getStationWaterData({
    id: gudgenby_tennent.id,
    name: gudgenby_tennent.name,
    waterwayName: gudgenby_tennent.waterwayName,
    dischargeId: gudgenby_tennent.dischargeId,
    levelId: gudgenby_tennent.levelId,
    timezone: gudgenby_tennent.timezone,
    subDateRange: { days: 7 },
  });

  return (
    <WaterStationContainer
      stationWaterData={waterData}
      levelQualitySteps={gudgenby_tennent.qualitySteps.level}
      dischargeQualitySteps={gudgenby_tennent.qualitySteps.discharge}
      levelChartYScale={gudgenby_tennent.chartYScale.level}
      dischargeChartYScale={gudgenby_tennent.chartYScale.discharge}
    />
  );
};

export default Page;
