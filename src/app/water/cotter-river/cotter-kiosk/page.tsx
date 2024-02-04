import WaterStationContainer from '~/components/water/WaterStationContainer';
import { cotter_cotter_kiosk } from '~/data/waterdata-stations';
import { getStationWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getStationWaterData({
    id: cotter_cotter_kiosk.id,
    name: cotter_cotter_kiosk.name,
    waterwayName: cotter_cotter_kiosk.waterwayName,
    dischargeId: cotter_cotter_kiosk.dischargeId,
    levelId: cotter_cotter_kiosk.levelId,
    timezone: cotter_cotter_kiosk.timezone,
    subDateRange: { days: 7 },
  });

  return (
    <WaterStationContainer
      stationWaterData={waterData}
      levelQualitySteps={cotter_cotter_kiosk.qualitySteps.level}
      dischargeQualitySteps={cotter_cotter_kiosk.qualitySteps.discharge}
      levelChartYScale={cotter_cotter_kiosk.chartYScale.level}
      dischargeChartYScale={cotter_cotter_kiosk.chartYScale.discharge}
    />
  );
};

export default Page;
