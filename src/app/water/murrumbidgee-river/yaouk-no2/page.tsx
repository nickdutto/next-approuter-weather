import WaterStationContainer from '~/components/water/WaterStationContainer';
import { murrumbidgee_yaouk_no2 } from '~/data/waterdata-stations';
import { getWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getWaterData({
    id: murrumbidgee_yaouk_no2.id,
    name: murrumbidgee_yaouk_no2.name,
    waterwayName: murrumbidgee_yaouk_no2.waterwayName,
    dischargeId: murrumbidgee_yaouk_no2.dischargeId,
    levelId: murrumbidgee_yaouk_no2.levelId,
    timezone: murrumbidgee_yaouk_no2.timezone,
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
      dischargeChartYScale={{ defaultMin: 1, defaultMax: 10 }}
      levelChartYScale={{ defaultMin: 1, defaultMax: 2 }}
    />
  );
};

export default Page;
