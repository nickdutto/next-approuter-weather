import WaterStationContainer from '~/components/water/WaterStationContainer';
import { murrumbidgee_mittagang_crossing } from '~/data/waterdata-stations';
import { getStationWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getStationWaterData({
    id: murrumbidgee_mittagang_crossing.id,
    name: murrumbidgee_mittagang_crossing.name,
    waterwayName: murrumbidgee_mittagang_crossing.waterwayName,
    dischargeId: murrumbidgee_mittagang_crossing.dischargeId,
    levelId: murrumbidgee_mittagang_crossing.levelId,
    timezone: murrumbidgee_mittagang_crossing.timezone,
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
      dischargeChartYScale={{ defaultMin: 1, defaultMax: 30 }}
      levelChartYScale={{ defaultMin: 1, defaultMax: 3 }}
    />
  );
};

export default Page;
