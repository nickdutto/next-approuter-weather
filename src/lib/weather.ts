import { type Serie } from '@nivo/line';

import { add, getHours, isAfter, isBefore, isEqual, setHours } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import { type Weather } from '~/types/types';

export interface SerieWithColor extends Serie {
  color: string;
}

export interface ColorStep {
  low: number;
  high: number;
  color: string;
}

export const getWeatherIcon = (
  time: string,
  sunriseStr: string,
  sunsetStr: string,
  code: number,
) => {
  const today = utcToZonedTime(time, 'Australia/Canberra');
  const tomorrow = add(today, { days: 1 });

  const sunrise = utcToZonedTime(sunriseStr, 'Australia/Canberra');
  const sunriseHours = getHours(sunrise);
  const sunset = utcToZonedTime(sunsetStr, 'Australia/Canberra');
  const sunsetHours = getHours(sunset);

  const sunriseToday = setHours(today, sunriseHours);
  const sunsetToday = setHours(today, sunsetHours);
  const sunriseTomorrow = setHours(tomorrow, sunriseHours);

  const isAfterSunrise = isAfter(today, sunriseToday);
  const isBeforeSunset = isBefore(today, sunsetToday);
  const isAfterSunset = isAfter(today, sunset);
  const isBeforeTomorrowSunrise = isBefore(today, sunriseTomorrow);

  if (
    (isAfterSunrise && isBeforeSunset) ||
    isEqual(today, sunriseToday) ||
    isEqual(today, sunsetToday)
  ) {
    return `${code}0.png`;
  } else if (isAfterSunset && isBeforeTomorrowSunrise) {
    return `${code}1.png`;
  }
};

export const createChartData = (
  data: Weather,
  field: string,
  range: number,
  colorSteps: ColorStep[],
): SerieWithColor[] => {
  const slicedData = data.data.timelines[0].intervals.slice(0, range);

  const mappedValues = colorSteps.map((step) => {
    const mappedData = slicedData.map((interval) => {
      const value = interval.values[field as keyof typeof interval.values];
      if (Math.round(value) >= step.low && Math.round(value) <= step.high) {
        return {
          x: new Date(interval.startTime),
          y: interval.values[field as keyof typeof interval.values],
        };
      } else {
        return {
          x: new Date(interval.startTime),
          y: null,
        };
      }
    });

    if (mappedData.length === 0) {
      return null;
    } else {
      return { id: `${step.low}-${step.high}`, color: step.color, data: mappedData };
    }
  });

  return mappedValues.filter((value) => value !== null) as SerieWithColor[];
};

export const getMinMaxValues = (data: Weather, field: string) => {
  const values = data.data.timelines[0].intervals.map((interval) => {
    return interval.values[field as keyof typeof interval.values];
  });

  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
};
