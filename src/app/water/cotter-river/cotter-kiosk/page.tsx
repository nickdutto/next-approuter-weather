import WaterStationContainer from '~/components/water/WaterStationContainer';
import { cotter_cotter_kiosk } from '~/data/waterdata-stations';
import { getWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getWaterData({
    id: cotter_cotter_kiosk.id,
    name: cotter_cotter_kiosk.name,
    waterwayName: cotter_cotter_kiosk.waterwayName,
    dischargeId: cotter_cotter_kiosk.dischargeId,
    levelId: cotter_cotter_kiosk.levelId,
    timezone: cotter_cotter_kiosk.timezone,
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
      dischargeChartYScale={{ defaultMin: 1, defaultMax: 30 }}
      levelChartYScale={{ defaultMin: 1, defaultMax: 3 }}
    />
  );
};

export default Page;
