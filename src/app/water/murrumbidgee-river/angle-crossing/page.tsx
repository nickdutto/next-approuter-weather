import WaterStationContainer from '~/components/water/WaterStationContainer';
import { murrumbidgee_angle_crossing } from '~/data/waterdata-stations';
import { getStationWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getStationWaterData({
    id: murrumbidgee_angle_crossing.id,
    name: murrumbidgee_angle_crossing.name,
    waterwayName: murrumbidgee_angle_crossing.waterwayName,
    dischargeId: murrumbidgee_angle_crossing.dischargeId,
    levelId: murrumbidgee_angle_crossing.levelId,
    timezone: murrumbidgee_angle_crossing.timezone,
    subDateRange: { days: 7 },
  });

  return (
    <WaterStationContainer
      stationWaterData={waterData}
      levelQualitySteps={murrumbidgee_angle_crossing.qualitySteps.level}
      dischargeQualitySteps={murrumbidgee_angle_crossing.qualitySteps.discharge}
      levelChartYScale={murrumbidgee_angle_crossing.chartYScale.level}
      dischargeChartYScale={murrumbidgee_angle_crossing.chartYScale.discharge}
    />
  );
};

export default Page;
