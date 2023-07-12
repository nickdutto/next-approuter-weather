import { add, getHours, isAfter, isBefore, isEqual, setHours } from 'date-fns';
import { formatInTimeZone, utcToZonedTime } from 'date-fns-tz';

import { Weather } from '~/types/types';

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

export const createChartData = (data: Weather, field: string) => {
  const mappedData = data.data.timelines[0].intervals.map((interval) => {
    return {
      x: formatInTimeZone(interval.startTime, 'Australia/Canberra', 'dd/MM/yy-HH:mm'),
      y: interval.values[field as keyof typeof interval.values],
    };
  });

  return {
    id: field,
    data: mappedData,
  };
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
