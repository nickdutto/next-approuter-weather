import WaterStationContainer from '~/components/water/WaterStationContainer';
import { condor_creek_threeways } from '~/data/waterdata-stations';
import { getWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getWaterData({
    id: condor_creek_threeways.id,
    name: condor_creek_threeways.name,
    waterwayName: condor_creek_threeways.waterwayName,
    dischargeId: condor_creek_threeways.dischargeId,
    levelId: condor_creek_threeways.levelId,
    timezone: condor_creek_threeways.timezone,
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
      dischargeChartYScale={{ defaultMin: 1, defaultMax: 2 }}
      levelChartYScale={{ defaultMin: 1, defaultMax: 2 }}
    />
  );
};

export default Page;
