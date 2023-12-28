import { formatInTimeZone } from 'date-fns-tz';
import { WiFlood, WiSandstorm } from 'react-icons/wi';

import { riverQualityCn, type RiverQualitySteps } from '~/lib/river';
import { cn } from '~/lib/utils';

type Props = {
  station: {
    id: string;
    name: string;
    riverName: string;
    owner: string;
    latitude: string;
    longitude: string;
    fromDate: string;
    toDate: string;
    timeZone: string;
  };
  dischargeQualitySteps: RiverQualitySteps;
  levelQualitySteps: RiverQualitySteps;
  latest: {
    discharge: {
      timestamp: string | undefined;
      value: number;
    };
    level: {
      timestamp: string | undefined;
      value: number;
    };
  };
};

const RiverInfoCard = ({ station, dischargeQualitySteps, levelQualitySteps, latest }: Props) => {
  const dischargeQuality = riverQualityCn(latest.discharge.value, dischargeQualitySteps);
  const levelQuality = riverQualityCn(latest.level.value, levelQualitySteps);

  return (
    <div className="pt-4">
      <div className="flex justify-between rounded-m-lg bg-m-night-7 p-4">
        <div className="flex w-full flex-col gap-1">
          <h2 className="flex flex-col text-center">
            <span className="text-base font-bold sm:text-start sm:text-2xl">
              {station.riverName}
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
            {formatInTimeZone(station.fromDate, station.timeZone, 'dd/MM/yy')} -{' '}
            {formatInTimeZone(station.toDate, station.timeZone, 'dd/MM/yy')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiverInfoCard;
