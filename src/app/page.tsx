import { Paper } from '@mantine/core';

import CurrentWeatherCard from '~/components/weather/CurrentWeatherCard';
import WeatherChart from '~/components/weather/WeatherChart';
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
    <main className="flex flex-col gap-2 py-4">
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="h-full w-full">
          <CurrentWeatherCard
            data={weather.data.timelines[0].intervals[0]}
            sunrise={sunriseSunset.results.sunrise}
            sunset={sunriseSunset.results.sunset}
          />
        </div>
        <WeatherChart weather={weather} />
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
