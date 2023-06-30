import { Droplets, Gauge, Thermometer } from 'lucide-react';

import { WeatherData } from '~/app/page';
import Icon from '~/components/Icon';
import { Card, CardContent, CardDescription, CardHeader } from '~/components/ui/card';

type Props = {
  data: WeatherData;
};

const WeatherCard = ({ data }: Props) => {
  return (
    <Card className="border-none shadow-[0px_0px_160px_10px] shadow-blue-900/70">
      <CardHeader className="p-0">
        <div className="flex justify-center">
          <img
            src={`./weather-icons/${data.weather[0].icon}.svg`}
            className="h-32"
            alt={data.weather[0].description}
          />
        </div>
        <CardDescription className="flex flex-col items-center px-6 pb-6">
          <span className="text-2xl font-bold text-gray-300">{data.weather[0].main}</span>
          <span className="text-xs font-medium text-gray-500">
            {data.name}, {data.sys.country}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <p className="flex flex-col items-center justify-center gap-1 font-medium text-gray-400">
          <Icon icon={Thermometer} size={20} className="text-blue-500" />
          {data.main.temp.toFixed(1)}°C
        </p>
        <div className="rounded-md border-2 border-gray-900" />
        <p className="flex flex-col items-center justify-center gap-1 font-medium text-gray-400">
          <Icon icon={Droplets} size={20} className="text-blue-500" />
          {data.main.humidity}%
        </p>
        <div className="rounded-md border-2 border-gray-900" />
        <p className="flex flex-col items-center justify-center gap-1 font-medium text-gray-400">
          <Icon icon={Gauge} size={20} className="text-blue-500" />
          {data.main.pressure}hPa
        </p>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
