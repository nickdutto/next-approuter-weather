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

  return (
    <WaterStationContainer
      stationWaterData={waterData}
      levelQualitySteps={murrumbidgee_mittagang_crossing.qualitySteps.level}
      dischargeQualitySteps={murrumbidgee_mittagang_crossing.qualitySteps.discharge}
      levelChartYScale={murrumbidgee_mittagang_crossing.chartYScale.level}
      dischargeChartYScale={murrumbidgee_mittagang_crossing.chartYScale.discharge}
    />
  );
};

export default Page;
