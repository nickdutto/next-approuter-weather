import WaterStationContainer from '~/components/water/WaterStationContainer';
import { murrumbidgee_mt_macdonald } from '~/data/waterdata-stations';
import { getStationWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getStationWaterData({
    id: murrumbidgee_mt_macdonald.id,
    name: murrumbidgee_mt_macdonald.name,
    waterwayName: murrumbidgee_mt_macdonald.waterwayName,
    dischargeId: murrumbidgee_mt_macdonald.dischargeId,
    levelId: murrumbidgee_mt_macdonald.levelId,
    timezone: murrumbidgee_mt_macdonald.timezone,
    subDateRange: { days: 7 },
  });

  return (
    <WaterStationContainer
      stationWaterData={waterData}
      levelQualitySteps={murrumbidgee_mt_macdonald.qualitySteps.level}
      dischargeQualitySteps={murrumbidgee_mt_macdonald.qualitySteps.discharge}
      levelChartYScale={murrumbidgee_mt_macdonald.chartYScale.level}
      dischargeChartYScale={murrumbidgee_mt_macdonald.chartYScale.discharge}
    />
  );
};

export default Page;
