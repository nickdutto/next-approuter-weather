import WeatherCard from '~/components/WeatherCard';

export type WeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

const Page = async () => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=-35.2835&lon=149.1281&units=metric&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`,
  );

  const weatherData: WeatherData = await res.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <WeatherCard data={weatherData} />
    </main>
  );
};

export default Page;
