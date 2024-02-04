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

  return (
    <WaterStationContainer
      stationWaterData={waterData}
      levelQualitySteps={murrumbidgee_billilingra.qualitySteps.level}
      dischargeQualitySteps={murrumbidgee_billilingra.qualitySteps.discharge}
      levelChartYScale={murrumbidgee_billilingra.chartYScale.level}
      dischargeChartYScale={murrumbidgee_billilingra.chartYScale.discharge}
    />
  );
};

export default Page;
