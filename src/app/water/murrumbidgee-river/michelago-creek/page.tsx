import WaterStationContainer from '~/components/water/WaterStationContainer';
import { murrumbidgee_michelago_creek } from '~/data/waterdata-stations';
import { getStationWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getStationWaterData({
    id: murrumbidgee_michelago_creek.id,
    name: murrumbidgee_michelago_creek.name,
    waterwayName: murrumbidgee_michelago_creek.waterwayName,
    dischargeId: murrumbidgee_michelago_creek.dischargeId,
    levelId: murrumbidgee_michelago_creek.levelId,
    timezone: murrumbidgee_michelago_creek.timezone,
    subDateRange: { days: 7 },
  });

  return (
    <WaterStationContainer
      stationWaterData={waterData}
      levelQualitySteps={murrumbidgee_michelago_creek.qualitySteps.level}
      dischargeQualitySteps={murrumbidgee_michelago_creek.qualitySteps.discharge}
      levelChartYScale={murrumbidgee_michelago_creek.chartYScale.level}
      dischargeChartYScale={murrumbidgee_michelago_creek.chartYScale.discharge}
    />
  );
};

export default Page;
