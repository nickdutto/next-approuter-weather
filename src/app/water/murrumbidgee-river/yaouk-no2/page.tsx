import WaterStationContainer from '~/components/water/WaterStationContainer';
import { murrumbidgee_yaouk_no2 } from '~/data/waterdata-stations';
import { getStationWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getStationWaterData({
    id: murrumbidgee_yaouk_no2.id,
    name: murrumbidgee_yaouk_no2.name,
    waterwayName: murrumbidgee_yaouk_no2.waterwayName,
    dischargeId: murrumbidgee_yaouk_no2.dischargeId,
    levelId: murrumbidgee_yaouk_no2.levelId,
    timezone: murrumbidgee_yaouk_no2.timezone,
    subDateRange: { days: 7 },
  });

  return (
    <WaterStationContainer
      stationWaterData={waterData}
      levelQualitySteps={murrumbidgee_yaouk_no2.qualitySteps.level}
      dischargeQualitySteps={murrumbidgee_yaouk_no2.qualitySteps.discharge}
      levelChartYScale={murrumbidgee_yaouk_no2.chartYScale.level}
      dischargeChartYScale={murrumbidgee_yaouk_no2.chartYScale.discharge}
    />
  );
};

export default Page;
