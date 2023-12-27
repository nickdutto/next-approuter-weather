import { Divider, Paper, Text } from '@mantine/core';

import { formatInTimeZone } from 'date-fns-tz';
import { TbCalendarEvent, TbMapPin } from 'react-icons/tb';

import { type WeatherInterval } from '~/types/types';
import { getWeatherIcon } from '~/utils/weather-utils';

type Props = {
  data: WeatherInterval;
  sunrise: string;
  sunset: string;
};

const CurrentWeatherCard = ({ data, sunrise, sunset }: Props) => {
  return (
    <Paper
      radius="lg"
      classNames={{
        root: 'bg-m-night-7 p-4 flex flex-col gap-2',
      }}
    >
      <div className="">
        <img
          src={`./tio/large/${getWeatherIcon(
            data.startTime,
            sunrise,
            sunset,
            data.values.weatherCode,
          )}`}
          className="h-20 w-20 p-2"
          alt=""
        />
        <span className="flex">
          <Text c="gray.3" className="text-5xl">
            {data.values.temperature.toFixed(0)}
          </Text>
          <Text c="gray.3" className="text-3xl">
            °C
          </Text>
        </span>
      </div>
      <Divider color="night.1" />
      <div className="flex flex-col gap-1">
        <Text size="sm" c="gray.5" className="flex items-center gap-1">
          <TbMapPin size={16} />
          Canberra, Australia
        </Text>
        <Text size="sm" c="gray.5" className="flex items-center gap-1">
          <TbCalendarEvent size={16} />
          {formatInTimeZone(data.startTime, 'Australia/Canberra', 'dd LLLL yyyy, h:mm a')}
        </Text>
      </div>
    </Paper>
  );
};

export default CurrentWeatherCard;
