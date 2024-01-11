import WaterStationContainer from '~/components/water/WaterStationContainer';
import { murrumbidgee_michelago_creek } from '~/data/waterdata-stations';
import { getWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getWaterData({
    id: murrumbidgee_michelago_creek.id,
    name: murrumbidgee_michelago_creek.name,
    waterwayName: murrumbidgee_michelago_creek.waterwayName,
    dischargeId: murrumbidgee_michelago_creek.dischargeId,
    levelId: murrumbidgee_michelago_creek.levelId,
    timezone: murrumbidgee_michelago_creek.timezone,
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
      levelChartYScale={{ defaultMin: 1, defaultMax: 6 }}
    />
  );
};

export default Page;
