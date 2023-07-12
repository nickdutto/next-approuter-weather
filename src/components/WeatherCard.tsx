'use client';

import { formatInTimeZone } from 'date-fns-tz';
import {
  WiBarometer,
  WiHumidity,
  WiRaindrop,
  WiStrongWind,
  WiWindDeg,
  WiWindy,
} from 'react-icons/wi';

import Icon from '~/components/Icon';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { WeatherInterval } from '~/types/types';
import { getWeatherIcon } from '~/utils/weather-utils';

type Props = {
  data: WeatherInterval;
  sunrise: string;
  sunset: string;
};

const WeatherCard = ({ data, sunrise, sunset }: Props) => {
  return (
    <Card className="border-none shadow-[0px_0px_200px_20px] shadow-blue-900/70 dark:bg-zinc-950">
      <CardHeader className="">
        <div className="flex items-center justify-center">
          <img
            src={`./tio/large/${getWeatherIcon(
              data.startTime,
              sunrise,
              sunset,
              data.values.weatherCode,
            )}`}
            className="h-16 p-2"
            alt=""
          />
          <div className="flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-gray-300">
              {data.values.temperature.toFixed(1)}°C
            </span>
            <span className="text-sm font-medium text-gray-500">
              {formatInTimeZone(data.startTime, 'Australia/Canberra', 'E - HH:mm')}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-3 grid-rows-2 gap-y-4">
        <p className="flex flex-col items-center justify-center gap-1 text-lg font-medium text-gray-400">
          <Icon icon={WiHumidity} size={20} className="text-blue-500" />
          <span>
            {data.values.humidity}
            <span className="text-xs text-gray-500">%</span>
          </span>
        </p>
        <p className="flex flex-col items-center justify-center gap-1 text-lg font-medium text-gray-400">
          <Icon icon={WiBarometer} size={20} className="text-blue-500" />
          <span>
            {data.values.pressureSeaLevel}
            <span className="text-xs text-gray-500">hPa</span>
          </span>
        </p>
        <p className="flex flex-col items-center justify-center gap-1 text-lg font-medium text-gray-400">
          <Icon icon={WiRaindrop} size={20} className="text-blue-500" />
          <span>
            {data.values.dewPoint.toFixed(1)}
            <span className="align-text-top text-xs text-gray-500">°C</span>
          </span>
        </p>
        <p className="flex flex-col items-center justify-center gap-1 text-lg font-medium text-gray-400">
          <Icon icon={WiWindy} size={20} className="text-blue-500" />
          <span>
            {data.values.windSpeed.toFixed(1)}
            <span className="text-xs text-gray-500">km/h</span>
          </span>
        </p>
        <p className="flex flex-col items-center justify-center gap-1 text-lg font-medium text-gray-400">
          <Icon icon={WiStrongWind} size={20} className="text-blue-500" />
          <span>
            {data.values.windGust.toFixed(1)}
            <span className="text-xs text-gray-500">km/h</span>
          </span>
        </p>
        <p className="flex flex-col items-center justify-center gap-1 text-lg font-medium text-gray-400">
          <Icon
            icon={WiWindDeg}
            size={20}
            style={{ transform: `rotate(${data.values.windDirection}deg)` }}
            className="text-blue-500"
          />
          <span>
            {data.values.windDirection}
            <span className="align-text-top text-xs text-gray-500">°</span>
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
