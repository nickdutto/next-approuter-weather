'use client';

import { type Serie } from '@nivo/line';

import { useEffect, useMemo, useState } from 'react';

import LineChart from '~/components/chart/LineChart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { type Weather } from '~/types/types';
import { createChartData, getMinMaxValues } from '~/utils/weather-utils';

type Props = {
  weather: Weather;
};

const ChartContainer = ({ weather }: Props) => {
  const [selectValue, setSelectValue] = useState('pressureSeaLevel');
  const [chartData, setChartData] = useState<Serie[] | null>(null);
  const [minMaxY, setMinMaxY] = useState({ min: 0, max: 0 });

  const fieldUnit = useMemo(() => {
    switch (selectValue) {
      case 'temperature':
      case 'temperatureApparent':
      case 'dewPoint':
        return '°C';
      case 'humidity':
        return '%';
      case 'pressureSeaLevel':
        return 'hPa';
      case 'windSpeed':
      case 'windGust':
        return 'km/h';
      default:
        return '';
    }
  }, [selectValue]);

  useEffect(() => {
    setMinMaxY(getMinMaxValues(weather, selectValue));
  }, [selectValue, weather]);

  useEffect(() => {
    setChartData([createChartData(weather, selectValue)]);
  }, [selectValue, weather]);

  return (
    <div className="relative w-full">
      <div className="flex justify-end pr-5">
        <Select onValueChange={setSelectValue} defaultValue={selectValue}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Weather Field" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="temperature">Temperature</SelectItem>
            <SelectItem value="temperatureApparent">Temperature Apparent</SelectItem>
            <SelectItem value="humidity">Humidity</SelectItem>
            <SelectItem value="pressureSeaLevel">Pressure Sea Level</SelectItem>
            <SelectItem value="dewPoint">Dew Point</SelectItem>
            <SelectItem value="windSpeed">Wind Speed</SelectItem>
            <SelectItem value="windGust">Wind Gust</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-[500px] bg-zinc-950">
        {chartData && (
          <LineChart
            data={chartData as Serie[]}
            min={minMaxY.min - 10}
            max={minMaxY.max + 10}
            fieldName={selectValue}
            fieldUnit={fieldUnit}
          />
        )}
      </div>
    </div>
  );
};

export default ChartContainer;
