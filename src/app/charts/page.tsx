import ChartContainer from '~/components/chart/ChartContainer';
import { type Weather } from '~/types/types';

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

const ChartsPage = async () => {
  const weather = await getWeather();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <ChartContainer weather={weather} />
    </main>
  );
};

export default ChartsPage;
