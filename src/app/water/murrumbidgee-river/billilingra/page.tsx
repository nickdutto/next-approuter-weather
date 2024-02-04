import WaterStationContainer from '~/components/water/WaterStationContainer';
import { murrumbidgee_billilingra } from '~/data/waterdata-stations';
import { getStationWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getStationWaterData({
    id: murrumbidgee_billilingra.id,
    name: murrumbidgee_billilingra.name,
    waterwayName: murrumbidgee_billilingra.waterwayName,
    dischargeId: murrumbidgee_billilingra.dischargeId,
    levelId: murrumbidgee_billilingra.levelId,
    timezone: murrumbidgee_billilingra.timezone,
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
      stationWaterData={waterData}
      dischargeQualitySteps={dischargeQualitySteps}
      levelQualitySteps={levelQualitySteps}
      dischargeChartYScale={{ defaultMin: 1, defaultMax: 60 }}
      levelChartYScale={{ defaultMin: 1, defaultMax: 4 }}
    />
  );
};

export default Page;
