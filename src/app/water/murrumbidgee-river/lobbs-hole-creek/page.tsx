import WaterStationContainer from '~/components/water/WaterStationContainer';
import { murrumbidgee_lobbs_hole_creek } from '~/data/waterdata-stations';
import { getStationWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getStationWaterData({
    id: murrumbidgee_lobbs_hole_creek.id,
    name: murrumbidgee_lobbs_hole_creek.name,
    waterwayName: murrumbidgee_lobbs_hole_creek.waterwayName,
    dischargeId: murrumbidgee_lobbs_hole_creek.dischargeId,
    levelId: murrumbidgee_lobbs_hole_creek.levelId,
    timezone: murrumbidgee_lobbs_hole_creek.timezone,
    subDateRange: { days: 7 },
  });

  return (
    <WaterStationContainer
      stationWaterData={waterData}
      levelQualitySteps={murrumbidgee_lobbs_hole_creek.qualitySteps.level}
      dischargeQualitySteps={murrumbidgee_lobbs_hole_creek.qualitySteps.discharge}
      levelChartYScale={murrumbidgee_lobbs_hole_creek.chartYScale.level}
      dischargeChartYScale={murrumbidgee_lobbs_hole_creek.chartYScale.discharge}
    />
  );
};

export default Page;
