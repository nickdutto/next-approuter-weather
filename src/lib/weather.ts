import { type Serie } from '@nivo/line';

import { add, getHours, isAfter, isBefore, isEqual, setHours } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import { type TomorrowIOTimelines } from '~/lib/validators/TomorrowIOValidator';

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
  code?: number,
) => {
  if (!code) return undefined;

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
  data: TomorrowIOTimelines,
  field: string,
  range: number,
  colorSteps: ColorStep[],
): SerieWithColor[] => {
  const slicedData = data.data.timelines[0].intervals.slice(0, range);

  const mappedValues = colorSteps.map((step) => {
    const mappedData = slicedData.map((interval) => {
      const value = interval.values[field as keyof typeof interval.values];
      if (value && Math.round(value) >= step.low && Math.round(value) <= step.high) {
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

export const getFieldMinMaxValues = (data: TomorrowIOTimelines, field: string) => {
  const values = data.data.timelines[0].intervals
    .map((interval) => {
      return interval.values[field as keyof typeof interval.values];
    })
    .filter((value): value is number => value !== null && value !== undefined);

  return {
    fieldMin: Math.min(...values),
    fieldMax: Math.max(...values),
  };
};

export const getMinMaxValues = (data: TomorrowIOTimelines, field: string, valuePadding: number) => {
  let min = 0;
  let max = 0;

  if (field === 'humidity') {
    max = 100;
  } else if (field === 'precipitationIntensity') {
    const { fieldMax } = getFieldMinMaxValues(data, field);

    max = fieldMax + valuePadding;
  } else if (field === 'windGust' || field === 'windSpeed') {
    const { fieldMax } = getFieldMinMaxValues(data, field);

    max = fieldMax + valuePadding;
  } else {
    const { fieldMin, fieldMax } = getFieldMinMaxValues(data, field);

    min = fieldMin - valuePadding;
    max = fieldMax + valuePadding;
  }

  return {
    min: min,
    max: max,
  };
};
