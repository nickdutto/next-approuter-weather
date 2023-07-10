import WeatherTable from '~/components/WeatherTable';

export type SunriseSunset = {
  results: {
    sunrise: string;
    sunset: string;
    solar_noon: string;
    day_length: string;
    civil_twilight_begin: string;
    civil_twilight_end: string;
    nautical_twilight_begin: string;
    nautical_twilight_end: string;
    astronomical_twilight_begin: string;
    astronomical_twilight_end: string;
  };
  status: string;
};

export type Weather = {
  data: {
    timelines: Array<{
      timestep: string;
      endTime: string;
      startTime: string;
      intervals: Array<{
        startTime: string;
        values: {
          cloudCover: number;
          dewPoint: number;
          humidity: number;
          precipitationProbability: number;
          pressureSeaLevel: number;
          temperature: number;
          temperatureApparent: number;
          weatherCode: number;
          windDirection: number;
          windGust: number;
          windSpeed: number;
        };
      }>;
    }>;
  };
};

const getSunriseSunset = async () => {
  const res = await fetch(
    'https://api.sunrise-sunset.org/json?lat=-35.2835&lng=149.1281&formatted=0',
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  return res.json() as unknown as SunriseSunset;
};

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

const Page = async () => {
  const sunriseSunset = await getSunriseSunset();
  const weather = await getWeather();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black p-24">
      <WeatherTable weather={weather} sunriseSunset={sunriseSunset} />
    </main>
  );
};

export default Page;
