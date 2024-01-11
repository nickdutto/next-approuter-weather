import WaterStationContainer from '~/components/water/WaterStationContainer';
import { murrumbidgee_lobbs_hole_creek } from '~/data/waterdata-stations';
import { getWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getWaterData({
    id: murrumbidgee_lobbs_hole_creek.id,
    name: murrumbidgee_lobbs_hole_creek.name,
    waterwayName: murrumbidgee_lobbs_hole_creek.waterwayName,
    dischargeId: murrumbidgee_lobbs_hole_creek.dischargeId,
    levelId: murrumbidgee_lobbs_hole_creek.levelId,
    timezone: murrumbidgee_lobbs_hole_creek.timezone,
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
      dischargeChartYScale={{ defaultMin: 1, defaultMax: 100 }}
      levelChartYScale={{ defaultMin: 1, defaultMax: 6 }}
    />
  );
};

export default Page;
