import LineChart from '~/components/LineChart';
import { type Weather } from '~/types/types';
import { createChartData } from '~/utils/weather-utils';

const getWeather = async () => {
  const res = await fetch(
    `https://api.tomorrow.io/v4/timelines?location=-35.2801846,149.1310324&fields=temperature,temperatureApparent,humidity,pressureSeaLevel,dewPoint,windSpeed,windGust,windDirection,precipitationProbability,cloudCover,weatherCode&timezone=Australia/Canberra&timesteps=1h&units=metric&apikey=${process.env.TOMORROW_IO_API_KEY}`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  return res.json() as unknown as Weather;
};

const ChartsPage = async () => {
  const weather = await getWeather();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <div className="h-[600px] w-full bg-zinc-900">
        <LineChart data={[createChartData(weather, 'pressureSeaLevel')]} />
      </div>
    </main>
  );
};

export default ChartsPage;
