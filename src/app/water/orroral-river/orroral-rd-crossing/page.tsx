import WaterStationContainer from '~/components/water/WaterStationContainer';
import { orroral_orroral_rd_crossing } from '~/data/waterdata-stations';
import { getWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getWaterData({
    id: orroral_orroral_rd_crossing.id,
    name: orroral_orroral_rd_crossing.name,
    waterwayName: orroral_orroral_rd_crossing.waterwayName,
    dischargeId: orroral_orroral_rd_crossing.dischargeId,
    levelId: orroral_orroral_rd_crossing.levelId,
    timezone: orroral_orroral_rd_crossing.timezone,
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
      dischargeChartYScale={{ defaultMin: 1, defaultMax: 8 }}
      levelChartYScale={{ defaultMin: 1, defaultMax: 4 }}
    />
  );
};

export default Page;
