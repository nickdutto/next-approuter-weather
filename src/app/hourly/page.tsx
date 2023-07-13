import WeatherTable from '~/components/WeatherTable';
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

const HourlyPage = async () => {
  const sunriseSunset = await getSunriseSunset();
  const weather = await getWeather();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <WeatherTable weather={weather} sunriseSunset={sunriseSunset} />
    </main>
  );
};

export default HourlyPage;
