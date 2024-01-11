import WaterStationContainer from '~/components/water/WaterStationContainer';
import { murrumbidgee_mt_macdonald } from '~/data/waterdata-stations';
import { getWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getWaterData({
    id: murrumbidgee_mt_macdonald.id,
    name: murrumbidgee_mt_macdonald.name,
    waterwayName: murrumbidgee_mt_macdonald.waterwayName,
    dischargeId: murrumbidgee_mt_macdonald.dischargeId,
    levelId: murrumbidgee_mt_macdonald.levelId,
    timezone: murrumbidgee_mt_macdonald.timezone,
    subDateRange: { days: 7 },
  });

  const dischargeQualitySteps = {
    low: 10,
    medium: 15,
    high: 20,
    veryHigh: 30,
    extreme: 40,
  };

  const levelQualitySteps = {
    low: 1.4,
    medium: 1.5,
    high: 1.6,
    veryHigh: 1.7,
    extreme: 1.8,
  };
  return (
    <WaterStationContainer
      station={waterData.station}
      dischargeData={waterData.discharge}
      levelData={waterData.level}
      latest={waterData.latest}
      dischargeQualitySteps={dischargeQualitySteps}
      levelQualitySteps={levelQualitySteps}
      dischargeChartYScale={{ defaultMin: 1, defaultMax: 40 }}
      levelChartYScale={{ defaultMin: 1, defaultMax: 2 }}
    />
  );
};

export default Page;
