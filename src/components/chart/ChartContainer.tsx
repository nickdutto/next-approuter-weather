'use client';

import { useEffect, useMemo, useState } from 'react';

import LineChart from '~/components/chart/LineChart';
import { Label } from '~/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Slider } from '~/components/ui/slider';
import { type Weather } from '~/types/types';
import { createChartData, getMinMaxValues, type SerieWithColor } from '~/utils/weather-utils';

interface Props {
  weather: Weather;
}

const ChartContainer = ({ weather }: Props) => {
  const [sliderValue, setSliderValue] = useState([10]);
  const [timeRange, setTimeRange] = useState('120');
  const [selectValue, setSelectValue] = useState('pressureSeaLevel');
  const [chartData, setChartData] = useState<SerieWithColor[] | null>(null);
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

  const colorSteps = useMemo(() => {
    switch (selectValue) {
      case 'pressureSeaLevel':
        return [
          { low: 0, high: 1015, color: '#f97316' },
          { low: 1015, high: 1020, color: '#4daa31' },
          { low: 1020, high: 1031, color: '#3b82f6' },
          { low: 1030, high: 1040, color: '#8b5cf6' },
          { low: 1040, high: 1101, color: '#d946ef' },
        ];
      default:
        return [{ low: 0, high: 2000, color: '#3b82f6' }];
    }
  }, [selectValue]);

  const tickSteps = useMemo(() => {
    switch (timeRange) {
      case '120':
        return 24;
      case '96':
        return 18;
      case '72':
        return 12;
      case '48':
        return 8;
      case '24':
        return 4;
      default:
        return 24;
    }
  }, [timeRange]);

  useEffect(() => {
    setMinMaxY(getMinMaxValues(weather, selectValue));
  }, [selectValue, weather]);

  useEffect(() => {
    setChartData(createChartData(weather, selectValue, parseInt(timeRange), colorSteps));
  }, [selectValue, timeRange, colorSteps, weather]);

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
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="120">5 Days</SelectItem>
            <SelectItem value="96">4 Days</SelectItem>
            <SelectItem value="72">3 Days</SelectItem>
            <SelectItem value="48">2 Days</SelectItem>
            <SelectItem value="24">1 Days</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue={selectValue} onValueChange={setSelectValue}>
          <SelectTrigger className="w-[180px]">
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
      <div className="grid h-[500px] auto-cols-fr bg-zinc-950">
        {chartData && (
          <LineChart
            data={chartData}
            min={minMaxY.min - sliderValue[0]}
            max={minMaxY.max + sliderValue[0]}
            fieldName={selectValue}
            fieldUnit={fieldUnit}
            tickSteps={tickSteps}
          />
        )}
      </div>
    </div>
  );
};

export default ChartContainer;
