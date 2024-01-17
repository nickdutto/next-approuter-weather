import { Divider, Paper, Text } from '@mantine/core';

import { formatInTimeZone } from 'date-fns-tz';
import { TbCalendarEvent, TbMapPin } from 'react-icons/tb';
import {
  WiBarometer,
  WiHumidity,
  WiRaindrop,
  WiStrongWind,
  WiWindDeg,
  WiWindy,
} from 'react-icons/wi';

import { type TomorrowIOTimeline } from '~/lib/validators/TomorrowIOValidator';
import { getWeatherIcon } from '~/lib/weather';

type Props = {
  data: TomorrowIOTimeline;
  sunrise: string;
  sunset: string;
};

const CurrentWeatherCard = ({ data, sunrise, sunset }: Props) => {
  return (
    <Paper
      radius="lg"
      classNames={{
        root: 'bg-m-night-7 p-4 flex flex-col gap-2 md:!h-[536px]',
      }}
    >
      <div className="">
        <img
          src={`/tio/large/${getWeatherIcon(
            data.startTime,
            sunrise,
            sunset,
            data.values.weatherCode ?? undefined,
          )}`}
          className="h-20 w-20 p-2"
          alt=""
        />
        <span className="flex">
          <Text c="gray.3" className="text-5xl">
            {data.values.temperature?.toFixed(0)}
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
      <Divider color="night.1" />
      <div className="flex flex-col">
        <div className="inline-flex items-center gap-1">
          <Text size="sm" c="gray.4" className="flex items-center gap-0.5">
            <WiHumidity size={16} />
            Humidity:
          </Text>
          <span className="flex items-baseline">
            <Text size="sm" c="gray.4">
              {data.values.humidity?.toFixed(0)}
            </Text>
            <Text size="sm" c="gray.5">
              %
            </Text>
          </span>
        </div>
        <div className="inline-flex items-center gap-1">
          <Text size="sm" c="gray.4" className="flex items-center gap-0.5">
            <WiBarometer size={16} />
            Pressure:
          </Text>
          <span className="flex items-baseline">
            <Text size="sm" c="gray.4">
              {data.values.pressureSeaLevel}
            </Text>
            <Text size="xs" c="gray.5">
              hPa
            </Text>
          </span>
        </div>
        <div className="inline-flex items-center gap-1">
          <Text size="sm" c="gray.4" className="flex items-center gap-0.5">
            <WiRaindrop size={16} />
            Dew Point:
          </Text>
          <span className="flex items-start">
            <Text size="sm" c="gray.4">
              {data.values.dewPoint}
            </Text>
            <Text size="xs" c="gray.5">
              °C
            </Text>
          </span>
        </div>
      </div>
      <Divider color="night.1" />
      <div className="flex flex-col">
        <div className="inline-flex items-center gap-1">
          <Text size="sm" c="gray.4" className="flex items-center gap-0.5">
            <WiWindy size={16} />
            Wind Speed:
          </Text>
          <span className="flex items-baseline">
            <Text size="sm" c="gray.4">
              {data.values.windSpeed?.toFixed(1)}
            </Text>
            <Text size="xs" c="gray.5">
              km/h
            </Text>
          </span>
        </div>
        <div className="inline-flex items-center gap-1">
          <Text size="sm" c="gray.4" className="flex items-center gap-0.5">
            <WiStrongWind size={16} />
            Wind Gust:
          </Text>
          <span className="flex items-baseline">
            <Text size="sm" c="gray.4">
              {data.values.windGust?.toFixed(1)}
            </Text>
            <Text size="xs" c="gray.5">
              km/h
            </Text>
          </span>
        </div>
        <div className="inline-flex items-center gap-1">
          <Text size="sm" c="gray.4" className="flex items-center gap-0.5">
            <WiWindDeg size={16} style={{ transform: `rotate(${data.values.windDirection}deg)` }} />
            Wind Direction:
          </Text>
          <span className="flex items-start">
            <Text size="sm" c="gray.4">
              {data.values.windDirection}
            </Text>
            <Text size="xs" c="gray.5">
              °
            </Text>
          </span>
        </div>
      </div>
    </Paper>
  );
};

export default CurrentWeatherCard;
