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
  const weather = await getWeather();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black p-24"></main>
  );
};

export default Page;
