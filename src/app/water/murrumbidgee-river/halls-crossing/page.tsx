import WaterStationContainer from '~/components/water/WaterStationContainer';
import { murrumbidgee_halls_crossing } from '~/data/waterdata-stations';
import { getStationWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getStationWaterData({
    id: murrumbidgee_halls_crossing.id,
    name: murrumbidgee_halls_crossing.name,
    waterwayName: murrumbidgee_halls_crossing.waterwayName,
    dischargeId: murrumbidgee_halls_crossing.dischargeId,
    levelId: murrumbidgee_halls_crossing.levelId,
    timezone: murrumbidgee_halls_crossing.timezone,
    subDateRange: { days: 7 },
  });

  return (
    <WaterStationContainer
      stationWaterData={waterData}
      levelQualitySteps={murrumbidgee_halls_crossing.qualitySteps.level}
      dischargeQualitySteps={murrumbidgee_halls_crossing.qualitySteps.discharge}
      levelChartYScale={murrumbidgee_halls_crossing.chartYScale.level}
      dischargeChartYScale={murrumbidgee_halls_crossing.chartYScale.discharge}
    />
  );
};

export default Page;
