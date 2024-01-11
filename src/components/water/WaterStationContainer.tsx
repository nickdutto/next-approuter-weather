import LineChart from '~/components/chart/LineChart';
import RiverInfoCard, { type StationInfo } from '~/components/river/RiverInfoCard';
import RiverTablesContainer from '~/components/river/RiverTablesContainer';
import { type WaterData } from '~/lib/validators/WaterDataValidator';
import { createWaterChartData, getWaterMinMaxValues, type WaterQualitySteps } from '~/lib/water';
import { type LatestWaterData } from '~/server/water';

type ChartYScale = {
  defaultMin: number;
  defaultMax: number;
};

type Props = {
  station: StationInfo;
  dischargeData: WaterData;
  levelData: WaterData;
  latest: LatestWaterData;
  dischargeQualitySteps: WaterQualitySteps;
  levelQualitySteps: WaterQualitySteps;
  dischargeChartYScale: ChartYScale;
  levelChartYScale: ChartYScale;
};

const WaterStationContainer = ({
  station,
  dischargeData,
  levelData,
  latest,
  dischargeQualitySteps,
  levelQualitySteps,
  dischargeChartYScale,
  levelChartYScale,
}: Props) => {
  const dischargeChartData = createWaterChartData(dischargeData, 'WatercourseDischarge', 7, [
    { low: 0, high: 2000, color: '#3b82f6' },
  ]);

  const dischargeYScaleMinMax = getWaterMinMaxValues(
    dischargeData,
    'discharge',
    dischargeChartYScale,
  );

  const levelChartData = createWaterChartData(levelData, 'WatercourseDischarge', 7, [
    { low: 0, high: 2000, color: '#3b82f6' },
  ]);

  const levelYScaleMinMax = getWaterMinMaxValues(levelData, 'level', levelChartYScale);

  return (
    <main className="flex flex-col gap-4 py-4">
      <RiverInfoCard
        station={station}
        dischargeQualitySteps={dischargeQualitySteps}
        levelQualitySteps={levelQualitySteps}
        latest={latest}
      />
      <div className="flex w-full gap-2">
        <div className="h-[400px] w-full rounded-m-lg bg-m-night-7">
          {levelChartData && (
            <LineChart
              data={levelChartData}
              fieldName="Watercourse Discharge"
              fieldUnit="cumec"
              min={0}
              max={levelYScaleMinMax.max}
              tickSteps={8}
            />
          )}
        </div>
        <div className="h-[400px] w-full rounded-m-lg bg-m-night-7">
          {dischargeChartData && (
            <LineChart
              data={dischargeChartData}
              fieldName="Watercourse Discharge"
              fieldUnit="cumec"
              min={0}
              max={dischargeYScaleMinMax.max}
              tickSteps={8}
            />
          )}
        </div>
      </div>
      <RiverTablesContainer dischargeData={dischargeData} levelData={levelData} />
    </main>
  );
};

export default WaterStationContainer;
