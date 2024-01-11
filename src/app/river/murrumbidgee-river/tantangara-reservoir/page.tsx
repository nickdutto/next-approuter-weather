import WaterStationContainer from '~/components/water/WaterStationContainer';
import { murrumbidgee_tantangara_reservoir } from '~/data/waterdata-stations';
import { getWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getWaterData({
    id: murrumbidgee_tantangara_reservoir.id,
    name: murrumbidgee_tantangara_reservoir.name,
    waterwayName: murrumbidgee_tantangara_reservoir.waterwayName,
    dischargeId: murrumbidgee_tantangara_reservoir.dischargeId,
    levelId: murrumbidgee_tantangara_reservoir.levelId,
    timezone: murrumbidgee_tantangara_reservoir.timezone,
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
      dischargeChartYScale={{ defaultMin: 1, defaultMax: 20 }}
      levelChartYScale={{ defaultMin: 1, defaultMax: 3 }}
    />
  );
};

export default Page;
