import { Paper } from '@mantine/core';

import CurrentWeatherCard from '~/components/weather/CurrentWeatherCard';
import CurrentWeatherDetailCard from '~/components/weather/CurrentWeatherDetailCard';
import CurrentWeatherWindCard from '~/components/weather/CurrentWeatherWindCard';
import WeatherIntervalTableCard from '~/components/weather/WeatherIntervalTableCard';
import { type SunriseSunset, type Weather } from '~/types/types';

const getSunriseSunset = async () => {
  const params = new URLSearchParams({
    lat: '-35.2801846',
    lng: '149.1310324',
    formatted: '0',
  });

  const url = `https://api.sunrise-sunset.org/json?${params.toString()}`;
  const res = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });

  return res.json() as unknown as SunriseSunset;
};

const getWeather = async () => {
  const params = new URLSearchParams({
    location: '-35.2801846,149.1310324',
    fields:
      'temperature,temperatureApparent,humidity,pressureSeaLevel,dewPoint,windSpeed,windGust,windDirection,precipitationProbability,cloudCover,weatherCode',
    timezone: 'Australia/Canberra',
    timesteps: '1h',
    units: 'metric',
    apikey: `${process.env.TOMORROW_IO_API_KEY}`,
  });

  const url = `https://api.tomorrow.io/v4/timelines?${params.toString()}`;
  const res = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });

  return res.json() as unknown as Weather;
};

const Page = async () => {
  const sunriseSunset = await getSunriseSunset();
  const weather = await getWeather();

  return (
    <main className="flex flex-col gap-2 overflow-x-scroll pt-4">
      <div className="flex gap-2">
        <div className="w-[320px]">
          <CurrentWeatherCard
            data={weather.data.timelines[0].intervals[0]}
            sunrise={sunriseSunset.results.sunrise}
            sunset={sunriseSunset.results.sunset}
          />
        </div>
        <Paper radius="lg" classNames={{ root: 'flex w-full flex-col gap-2 bg-transparent' }}>
          <CurrentWeatherDetailCard data={weather.data.timelines[0].intervals[0]} />
          <CurrentWeatherWindCard data={weather.data.timelines[0].intervals[0]} />
        </Paper>
      </div>
      <Paper radius="lg" classNames={{ root: 'flex w-full h-[600px] gap-2 p-4 bg-m-night-7' }}>
        <WeatherIntervalTableCard
          data={weather.data.timelines[0].intervals}
          sunrise={sunriseSunset.results.sunrise}
          sunset={sunriseSunset.results.sunset}
        />
      </Paper>
    </main>
  );
};

export default Page;
