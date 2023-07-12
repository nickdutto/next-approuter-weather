'use client';

import { type Serie } from '@nivo/line';
import { Slider } from '~/components/ui/slider';

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
import { Label } from '~/components/ui/label';

type Props = {
  weather: Weather;
};

const ChartContainer = ({ weather }: Props) => {
  const [sliderValue, setSliderValue] = useState([10]);
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
      <div className="flex items-center justify-end gap-2 bg-zinc-950 pr-5 pt-3">
        <div className="flex w-full p-2">
          <Label htmlFor="minmax" className="min-w-fit px-2">
            yScale: {sliderValue[0]}
          </Label>
          <Slider
            id="minmax"
            defaultValue={sliderValue}
            onValueChange={setSliderValue}
            max={100}
            step={5}
          />
        </div>
        <Select defaultValue={selectValue} onValueChange={setSelectValue}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Weather Field" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="temperature">Temperature</SelectItem>
            <SelectItem value="humidity">Humidity</SelectItem>
            <SelectItem value="pressureSeaLevel">Pressure</SelectItem>
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
            min={minMaxY.min - sliderValue[0]}
            max={minMaxY.max + sliderValue[0]}
            fieldName={selectValue}
            fieldUnit={fieldUnit}
          />
        )}
      </div>
    </div>
  );
};

export default ChartContainer;
