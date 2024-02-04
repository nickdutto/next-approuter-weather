import { Alert, Text } from '@mantine/core';

import { TbAlertCircle } from 'react-icons/tb';

import WaterDataChartsContainer from '~/components/water/WaterDataChartsContainer';
import WaterDataTablesContainer from '~/components/water/WaterDataTablesContainer';
import WaterStationInfoCard from '~/components/water/WaterStationInfoCard';
import { type DefaultChartYScale, type WaterQualitySteps } from '~/data/waterdata-stations';
import { type StationWaterData } from '~/server/water';

type Props = {
  stationWaterData: StationWaterData;
  dischargeQualitySteps: WaterQualitySteps;
  levelQualitySteps: WaterQualitySteps;
  dischargeChartYScale: DefaultChartYScale;
  levelChartYScale: DefaultChartYScale;
};

const WaterStationContainer = ({
  stationWaterData,
  dischargeQualitySteps,
  levelQualitySteps,
  dischargeChartYScale,
  levelChartYScale,
}: Props) => {
  return (
    <main className="flex flex-col gap-4 py-4">
      {!stationWaterData.waterData ? (
        <>
          <Alert
            title={`${stationWaterData.station.waterwayName} - ${stationWaterData.station.name}`}
            icon={<TbAlertCircle size={20} />}
            radius="lg"
            variant="outline"
            color="red.6"
            bg="night.7"
            classNames={{
              title: 'text-base',
              wrapper: 'h-full',
            }}
          >
            <Text size="sm" c="gray.3">
              We couldn&apos;t fetch any data for this station currently, please try again later.
            </Text>
          </Alert>
        </>
      ) : (
        <>
          <WaterStationInfoCard
            station={stationWaterData.station}
            dischargeQualitySteps={dischargeQualitySteps}
            levelQualitySteps={levelQualitySteps}
            latest={stationWaterData.waterData.latest}
          />
          <WaterDataChartsContainer
            discharge={stationWaterData.waterData.discharge}
            level={stationWaterData.waterData.level}
            dischargeChartOptions={{ low: 0, high: 2000, color: '#3b82f6' }}
            levelChartOptions={{ low: 0, high: 2000, color: '#3b82f6' }}
            dischargeChartYScale={dischargeChartYScale}
            levelChartYScale={levelChartYScale}
          />
          <WaterDataTablesContainer
            dischargeData={stationWaterData.waterData.discharge}
            levelData={stationWaterData.waterData.level}
          />
        </>
      )}
    </main>
  );
};

export default WaterStationContainer;
