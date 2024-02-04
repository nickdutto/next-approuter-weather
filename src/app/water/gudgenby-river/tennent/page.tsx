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
      dischargeChartYScale={{ defaultMin: 1, defaultMax: 20 }}
      levelChartYScale={{ defaultMin: 1, defaultMax: 4 }}
    />
  );
};

export default Page;
