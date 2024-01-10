import { type SVGProps } from 'react';

export interface SunriseSunset {
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
}

export interface Weather {
  data: WeatherData;
}

export interface WeatherData {
  timelines: WeatherTimeline[];
}

export interface WeatherTimeline {
  timestep: string;
  endTime: string;
  startTime: string;
  intervals: WeatherInterval[];
}

export interface WeatherInterval {
  startTime: string;
  values: WeatherIntervalValues;
}

export interface WeatherIntervalValues {
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
}

export interface RiverData {
  station_longname: string;
  station_no: string;
  station_latitude: string;
  station_longitude: string;
  parametertype_name: string;
  ts_name: string;
  ts_unitname: string;
  DATA_OWNER_NAME: string;
  rows: string;
  columns: string;
  data: [string, number | undefined][];
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
