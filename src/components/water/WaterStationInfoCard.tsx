import { formatInTimeZone } from 'date-fns-tz';
import { WiFlood, WiSandstorm } from 'react-icons/wi';

import { type WaterQualitySteps } from '~/data/waterdata-stations';
import { cn } from '~/lib/utils';
import { waterQualityCn } from '~/lib/water';
import { type LatestWaterData } from '~/server/water';

export type StationInfo = {
  id?: number;
  name: string;
  waterwayName: string;
  owner: string;
  latitude?: number;
  longitude?: number;
  fromDate: string;
  toDate: string;
  timezone: string;
};

type Props = {
  station: StationInfo;
  dischargeQualitySteps: WaterQualitySteps;
  levelQualitySteps: WaterQualitySteps;
  latest: LatestWaterData;
};

const WaterStationInfoCard = ({
  station,
  dischargeQualitySteps,
  levelQualitySteps,
  latest,
}: Props) => {
  const dischargeQuality = waterQualityCn(latest.discharge.value, dischargeQualitySteps);
  const levelQuality = waterQualityCn(latest.level.value, levelQualitySteps);

  return (
    <div>
      <div className="flex justify-between rounded-m-lg bg-m-night-7 p-4">
        <div className="flex w-full flex-col gap-1">
          <h2 className="flex flex-col text-center">
            <span className="text-base font-bold sm:text-start sm:text-2xl">
              {station.waterwayName}
            </span>
            <span className="text-base font-semibold sm:text-start sm:text-xl">{station.name}</span>
          </h2>
          <div className="flex flex-row justify-center gap-2 sm:flex-col sm:justify-start">
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <p className="inline-flex items-center gap-1">
                <WiFlood size={24} />{' '}
                <span>
                  Quality<span className="hidden sm:inline">:</span>
                </span>
              </p>
              <div className="relative flex h-4 w-4">
                <div className={cn(levelQuality, 'relative inline-flex h-4 w-4 rounded-full')} />
                <div
                  className={cn(
                    levelQuality,
                    'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <p className="inline-flex items-center gap-1">
                <WiSandstorm size={24} />{' '}
                <span>
                  Quality<span className="hidden sm:inline">:</span>
                </span>
              </p>
              <div className="relative flex h-4 w-4">
                <div
                  className={cn(dischargeQuality, 'relative inline-flex h-4 w-4 rounded-full')}
                />
                <div
                  className={cn(
                    dischargeQuality,
                    'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <p>
            <span className="font-semibold">Station:</span> {station.id}
          </p>
          <p>
            <span className="font-semibold">Latitude:</span> {station.latitude}
          </p>
          <p>
            <span className="font-semibold">Longitude:</span> {station.longitude}
          </p>
          <p>
            <span className="font-semibold">Owner:</span> {station.owner}
          </p>
          <p>
            <span className="font-semibold">Range:</span>{' '}
            {formatInTimeZone(station.fromDate, station.timezone, 'dd/MM/yy')} -{' '}
            {formatInTimeZone(station.toDate, station.timezone, 'dd/MM/yy')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaterStationInfoCard;
