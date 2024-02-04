import WaterStationContainer from '~/components/water/WaterStationContainer';
import { condor_creek_threeways } from '~/data/waterdata-stations';
import { getStationWaterData } from '~/server/water';

const Page = async () => {
  const waterData = await getStationWaterData({
    id: condor_creek_threeways.id,
    name: condor_creek_threeways.name,
    waterwayName: condor_creek_threeways.waterwayName,
    dischargeId: condor_creek_threeways.dischargeId,
    levelId: condor_creek_threeways.levelId,
    timezone: condor_creek_threeways.timezone,
    subDateRange: { days: 7 },
  });

  return (
    <>
      <WaterStationContainer
        stationWaterData={waterData}
        levelQualitySteps={condor_creek_threeways.qualitySteps.level}
        dischargeQualitySteps={condor_creek_threeways.qualitySteps.discharge}
        levelChartYScale={condor_creek_threeways.chartYScale.level}
        dischargeChartYScale={condor_creek_threeways.chartYScale.discharge}
      />
    </>
  );
};

export default Page;
