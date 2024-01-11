'use client';

import { InputLabel, Select, Slider } from '@mantine/core';

import { useEffect, useMemo, useState } from 'react';

import LineChart from '~/components/chart/LineChart';
import { createChartData, getMinMaxValues, type SerieWithColor } from '~/lib/weather';
import { type Weather } from '~/types/types';

interface Props {
  weather: Weather;
}

const ChartContainer = ({ weather }: Props) => {
  const [sliderValue, setSliderValue] = useState(10);
  const [timeRange, setTimeRange] = useState<string | null>('120');
  const [weatherValue, setWeatherValue] = useState<string | null>('pressureSeaLevel');
  const [chartData, setChartData] = useState<SerieWithColor[] | null>(null);
  const [minMaxY, setMinMaxY] = useState({ min: 0, max: 0 });

  const fieldUnit = useMemo(() => {
    switch (weatherValue) {
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
  }, [weatherValue]);

  const colorSteps = useMemo(() => {
    switch (weatherValue) {
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
  }, [weatherValue]);

  useEffect(() => {
    if (!weatherValue) return;

    setMinMaxY(getMinMaxValues(weather, weatherValue));
  }, [weatherValue, weather]);

  useEffect(() => {
    if (!timeRange || !weatherValue) return;

    setChartData(createChartData(weather, weatherValue, parseInt(timeRange), colorSteps));
  }, [weatherValue, timeRange, colorSteps, weather]);

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-end gap-2 bg-zinc-950 pr-5 pt-3">
        <div className="flex w-full p-2">
          <InputLabel htmlFor="minmax" className="min-w-fit px-2">
            yScale: {sliderValue}
          </InputLabel>
          <Slider id="minmax" value={sliderValue} onChange={setSliderValue} max={100} step={5} />
        </div>
        <Select
          label="Time Range"
          value={timeRange}
          onChange={setTimeRange}
          data={[
            { value: '120', label: '5 Days' },
            { value: '96', label: '4 Days' },
            { value: '72', label: '3 Days' },
            { value: '48', label: '2 Days' },
            { value: '24', label: '1 Days' },
          ]}
        />
        <Select
          label="Weather Field"
          defaultValue={weatherValue}
          onChange={setWeatherValue}
          data={[
            {
              value: 'temperature',
              label: 'Temperature',
            },
            {
              value: 'humidity',
              label: 'Humidity',
            },
            {
              value: 'pressureSeaLevel',
              label: 'Pressure',
            },
            {
              value: 'dewPoint',
              label: 'Dew Point',
            },
            {
              value: 'windSpeed',
              label: 'Wind Speed',
            },
            {
              value: 'windGust',
              label: 'Wind Gust',
            },
          ]}
        />
      </div>
      <div className="grid h-[500px] auto-cols-fr bg-zinc-950">
        {chartData && (
          <LineChart
            data={chartData}
            min={minMaxY.min - sliderValue}
            max={minMaxY.max + sliderValue}
            fieldName={weatherValue ?? ''}
            fieldUnit={fieldUnit}
          />
        )}
      </div>
    </div>
  );
};

export default ChartContainer;
