import WaterStationContainer from '~/components/water/WaterStationContainer';
import { murrumbidgee_angle_crossing } from '~/data/waterdata-stations';
import { getWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getWaterData({
    id: murrumbidgee_angle_crossing.id,
    name: murrumbidgee_angle_crossing.name,
    waterwayName: murrumbidgee_angle_crossing.waterwayName,
    dischargeId: murrumbidgee_angle_crossing.dischargeId,
    levelId: murrumbidgee_angle_crossing.levelId,
    timezone: murrumbidgee_angle_crossing.timezone,
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
      dischargeChartYScale={{ defaultMin: 1, defaultMax: 80 }}
      levelChartYScale={{ defaultMin: 1, defaultMax: 5 }}
    />
  );
};

export default Page;
