import LineChart from '~/components/LineChart';
import { type Weather } from '~/types/types';
import { createChartData, getMinMaxValues } from '~/utils/weather-utils';

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

  const minMaxFieldValues = getMinMaxValues(weather, 'pressureSeaLevel');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <div className="h-[500px] w-full bg-zinc-950">
        <LineChart
          data={[createChartData(weather, 'pressureSeaLevel')]}
          min={minMaxFieldValues.min - 10}
          max={minMaxFieldValues.max + 10}
        />
      </div>
    </main>
  );
};

export default ChartsPage;
