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
