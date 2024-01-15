'use client';

import { Select, Slider } from '@mantine/core';

import { useEffect, useMemo, useState } from 'react';

import LineChart from '~/components/chart/LineChart';
import { createChartData, getMinMaxValues, type SerieWithColor } from '~/lib/weather';
import { type Weather } from '~/types/types';

interface Props {
  weather: Weather;
}

const WeatherChart = ({ weather }: Props) => {
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

  const timeRangeData = useMemo(() => {
    return [
      { value: '120', label: '5 Days' },
      { value: '96', label: '4 Days' },
      { value: '72', label: '3 Days' },
      { value: '48', label: '2 Days' },
      { value: '24', label: '1 Days' },
    ];
  }, []);

  const weatherFieldData = useMemo(() => {
    return [
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
    ];
  }, []);

  const colorSteps = useMemo(() => {
    // switch (weatherValue) {
    //   case 'pressureSeaLevel':
    //     return [
    //       { low: 0, high: 1015, color: '#f97316' },
    //       { low: 1015, high: 1020, color: '#4daa31' },
    //       { low: 1020, high: 1031, color: '#3b82f6' },
    //       { low: 1030, high: 1040, color: '#8b5cf6' },
    //       { low: 1040, high: 1101, color: '#d946ef' },
    //     ];
    //   default:
    //     return [{ low: 0, high: 2000, color: '#3b82f6' }];
    // }
    return [{ low: 0, high: 2000, color: '#3b82f6' }];
  }, []);

  useEffect(() => {
    if (!weatherValue) return;

    setMinMaxY(getMinMaxValues(weather, weatherValue));
  }, [weatherValue, weather]);

  useEffect(() => {
    if (!timeRange || !weatherValue) return;

    setChartData(createChartData(weather, weatherValue, parseInt(timeRange), colorSteps));
  }, [weatherValue, timeRange, colorSteps, weather]);

  return (
    <div className="relative h-[416px] w-full overflow-hidden rounded-m-lg bg-m-night-7 p-2 md:h-[536px]">
      <div className="flex h-[80px] items-center gap-2 px-4">
        <Select
          data={timeRangeData}
          value={timeRange}
          onChange={setTimeRange}
          label="Time Range"
          radius="md"
          classNames={{
            input: '!bg-m-night-4 !border-none',
            dropdown: '!bg-m-night-5 !border-m-night-0',
            option:
              'hover:!bg-m-night-0 active:!bg-m-night-2 data-[checked=true]:!bg-m-night-0 !my-1 first:!mt-0 last:!mb-0',
          }}
        />
        <Select
          data={weatherFieldData}
          defaultValue={weatherValue}
          onChange={setWeatherValue}
          label="Weather Field"
          radius="md"
          classNames={{
            input: '!bg-m-night-4 !border-none',
            dropdown: '!bg-m-night-5 !border-m-night-0',
            option:
              'hover:!bg-m-night-0 active:!bg-m-night-2 data-[checked=true]:!bg-m-night-0 !my-1 first:!mt-0 last:!mb-0',
          }}
        />
      </div>
      <div className="grid h-[280px] auto-cols-fr bg-m-night-7 md:h-[400px]">
        {chartData && (
          <LineChart
            data={chartData}
            margin={{ bottom: 20 }}
            min={minMaxY.min - sliderValue}
            max={minMaxY.max + sliderValue}
            fieldName={weatherValue ?? ''}
            fieldUnit={fieldUnit}
          />
        )}
      </div>
      <div className="flex h-[40px] w-full items-center px-4">
        <Slider
          id="minmax"
          label={`yScale: +${sliderValue}`}
          min={0}
          max={100}
          step={2}
          value={sliderValue}
          onChange={setSliderValue}
          classNames={{
            root: 'w-full',
            track: 'before:!bg-m-night-4',
            label: 'bg-m-night-2 text-m-dark-0',
          }}
        />
      </div>
    </div>
  );
};

export default WeatherChart;
