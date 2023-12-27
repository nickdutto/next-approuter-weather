import { type ClassValue, clsx } from 'clsx';
import { set, sub } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTzISO = (date: Date, timeZone: string) => {
  return formatInTimeZone(date, timeZone, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx").replace(/\+/g, '%2B');
};

export const getToFromDates = (timeZone: string, subOptions: Parameters<typeof sub>[1]) => {
  const date = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  const toDate = formatTzISO(date, timeZone);
  const fromDate = formatTzISO(sub(date, subOptions), timeZone);

  return { toDate, fromDate };
};
