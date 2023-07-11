import {
  WiBarometer,
  WiHumidity,
  WiRaindrop,
  WiStrongWind,
  WiWindDeg,
  WiWindy,
} from 'react-icons/wi';

import Icon from '~/components/Icon';
import { Card, CardContent, CardDescription, CardHeader } from '~/components/ui/card';
import { WeatherInterval } from '~/types/types';
import { getWeatherIcon } from '~/utils/weather-utils';

type Props = {
  data: WeatherInterval;
  sunrise: string;
  sunset: string;
};

const WeatherCard = ({ data, sunrise, sunset }: Props) => {
  return (
    <Card className="border-none shadow-[0px_0px_160px_10px] shadow-blue-900/70">
      <CardHeader className="p-0">
        <div className="flex justify-center">
          <img
            src={`./tio/large/${getWeatherIcon(
              data.startTime,
              sunrise,
              sunset,
              data.values.weatherCode,
            )}`}
            className="h-24 p-2"
            alt=""
          />
        </div>
        <CardDescription className="flex flex-col items-center px-6 pb-6">
          <span className="text-3xl font-bold text-gray-300">
            {data.values.temperature.toFixed(1)}°C
          </span>
          <span className="font-medium text-gray-500">Cloud: {data.values.cloudCover}%</span>
        </CardDescription>
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
