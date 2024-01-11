import WaterStationContainer from '~/components/water/WaterStationContainer';
import { cotter_corin_dam } from '~/data/waterdata-stations';
import { getWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getWaterData({
    id: cotter_corin_dam.id,
    name: cotter_corin_dam.name,
    waterwayName: cotter_corin_dam.waterwayName,
    dischargeId: cotter_corin_dam.dischargeId,
    levelId: cotter_corin_dam.levelId,
    timezone: cotter_corin_dam.timezone,
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
