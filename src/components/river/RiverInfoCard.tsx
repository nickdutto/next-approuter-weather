import { formatInTimeZone } from 'date-fns-tz';

import { riverQualityCn, type RiverQualitySteps } from '~/lib/river';
import { cn } from '~/lib/utils';

type Props = {
  station: {
    id: string;
    name: string;
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
      <div className="flex items-center justify-between rounded-m-lg bg-m-night-7 p-4">
        <div>
          <h2 className="text-2xl font-bold">{station.name}</h2>
          <p>
            Latest Discharge:{' '}
            {latest.discharge.timestamp &&
              formatInTimeZone(latest.discharge.timestamp, station.timeZone, 'dd/MM/yy - HH:mm')}
          </p>
          <p>
            Latest Level:{' '}
            {latest.level.timestamp &&
              formatInTimeZone(latest.level.timestamp, station.timeZone, 'dd/MM/yy - HH:mm')}
          </p>
          <div className="flex items-center gap-2">
            <p>Discharge Quality:</p>
            <div className="relative flex h-4 w-4">
              <div className={cn(dischargeQuality, 'relative inline-flex h-4 w-4 rounded-full')} />
              <div
                className={cn(
                  dischargeQuality,
                  'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                )}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p>Level Quality:</p>
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
        </div>
        <div>
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
