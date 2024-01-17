'use client';

import { createColumnHelper } from '@tanstack/react-table';

import { formatInTimeZone } from 'date-fns-tz';
import { useMemo } from 'react';

import Table from '~/components/table/Table';
import { type TomorrowIOTimeline } from '~/lib/validators/TomorrowIOValidator';
import { getWeatherIcon } from '~/lib/weather';

type WeatherFields = Pick<
  TomorrowIOTimeline['values'],
  | 'temperature'
  | 'humidity'
  | 'pressureSeaLevel'
  | 'dewPoint'
  | 'windSpeed'
  | 'windGust'
  | 'windDirection'
>;
type WeatherIntervalTableData = Record<keyof WeatherFields, string | undefined> & {
  time: string;
  condition?: string;
};

type Props = {
  data: TomorrowIOTimeline[];
  sunrise: string;
  sunset: string;
};

const WeatherIntervalTable = ({ data, sunrise, sunset }: Props) => {
  const tableData = useMemo((): WeatherIntervalTableData[] => {
    return data.map((interval) => {
      return {
        time: formatInTimeZone(interval.startTime, 'Australia/Canberra', 'h:mm a'),
        condition: getWeatherIcon(
          interval.startTime,
          sunrise,
          sunset,
          interval.values.weatherCode ?? undefined,
        ),
        temperature: interval.values.temperature?.toFixed(1),
        humidity: interval.values.humidity?.toFixed(0),
        pressureSeaLevel: interval.values.pressureSeaLevel?.toFixed(1),
        dewPoint: interval.values.dewPoint?.toFixed(1),
        windSpeed: interval.values.windSpeed?.toFixed(1),
        windGust: interval.values.windGust?.toFixed(1),
        windDirection: interval.values.windDirection?.toFixed(0),
      };
    });
  }, [data, sunrise, sunset]);

  const columns = useMemo(() => {
    const helper = createColumnHelper<WeatherIntervalTableData>();
    return [
      helper.accessor('time', {
        header: 'Time',
        cell: (row) => row.getValue(),
      }),
      helper.accessor('condition', {
        header: 'Condition',
        cell: (row) => {
          const value = row.getValue();
          return (
            <>
              {value && (
                <img src={`/tio/${row.getValue()}`} alt="" className="w-[32px] brightness-90" />
              )}
            </>
          );
        },
      }),
      helper.accessor('temperature', {
        header: 'Temperature',
        cell: (row) => `${row.getValue()}°C`,
      }),
      helper.accessor('humidity', {
        header: 'Humidity',
        cell: (row) => `${row.getValue()}%`,
      }),
      helper.accessor('pressureSeaLevel', {
        header: 'Pressure',
        cell: (row) => `${row.getValue()}hPa`,
      }),
      helper.accessor('dewPoint', {
        header: 'Dew Point',
        cell: (row) => `${row.getValue()}°C`,
      }),
      helper.accessor('windSpeed', {
        header: 'Wind Speed',
        cell: (row) => `${row.getValue()}kmh/h`,
      }),
      helper.accessor('windGust', {
        header: 'Wind Gust',
        cell: (row) => `${row.getValue()}kmh/h`,
      }),
      helper.accessor('windDirection', {
        header: 'Wind Direction',
        cell: (row) => `${row.getValue()}°`,
      }),
    ];
  }, []);

  return (
    <Table<WeatherIntervalTableData>
      data={tableData}
      columns={columns}
      tableProps={{ className: 'min-w-[780px] w-full' }}
      theadProps={{ className: 'shadow shadow-black' }}
      tbodyProps={{ className: '[&>*:nth-child(even)]:bg-m-night-5' }}
      thProps={{ className: 'text-m-xs font-bold' }}
      tdProps={{ className: 'text-m-xs border-0' }}
    />
  );
};

export default WeatherIntervalTable;
