'use client';

import { Table } from '@mantine/core';

import { formatInTimeZone } from 'date-fns-tz';
import { useMemo } from 'react';

import { type WeatherInterval } from '~/types/types';
import { getWeatherIcon } from '~/utils/weather-utils';

type Props = {
  data: WeatherInterval[];
  sunrise: string;
  sunset: string;
};

const WeatherIntervalTableCard = ({ data, sunrise, sunset }: Props) => {
  const rows = useMemo(() => {
    return data.map((interval) => {
      return (
        <Table.Tr key={interval.startTime} className="">
          <Table.Td className="!overflow-hidden !rounded-m-lg">
            {formatInTimeZone(interval.startTime, 'Australia/Canberra', 'h:mm a')}
          </Table.Td>
          <Table.Td>
            <img
              src={`/tio/${getWeatherIcon(
                interval.startTime,
                sunrise,
                sunset,
                interval.values.weatherCode,
              )}`}
              alt=""
              className="w-[32px] brightness-90"
            />
          </Table.Td>
          <Table.Td>{interval.values.temperature.toFixed(1)}°C</Table.Td>
          <Table.Td>{interval.values.humidity.toFixed(0)}%</Table.Td>
          <Table.Td>{interval.values.pressureSeaLevel.toFixed(1)}hPa</Table.Td>
          <Table.Td>{interval.values.dewPoint.toFixed(1)}°C</Table.Td>
          <Table.Td>{interval.values.windSpeed.toFixed(0)}km/h</Table.Td>
          <Table.Td>{interval.values.windGust.toFixed(0)}km/h</Table.Td>
          <Table.Td>{interval.values.windDirection.toFixed(0)}°</Table.Td>
        </Table.Tr>
      );
    });
  }, [data, sunrise, sunset]);

  return (
    <Table.ScrollContainer minWidth={100} classNames={{ scrollContainer: '!w-full' }}>
      <Table
        stickyHeader
        withRowBorders={false}
        striped
        stripedColor="night.5"
        classNames={{
          table: '!text-m-xs !w-full !overflow-hidden',
          thead: 'bg-m-night-7',
        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Time</Table.Th>
            <Table.Th>Condition</Table.Th>
            <Table.Th>Temperature</Table.Th>
            <Table.Th>Humidity</Table.Th>
            <Table.Th>Pressure</Table.Th>
            <Table.Th>Dew Point</Table.Th>
            <Table.Th>Wind Speed</Table.Th>
            <Table.Th>Wind Gust</Table.Th>
            <Table.Th>Wind Direction</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default WeatherIntervalTableCard;
