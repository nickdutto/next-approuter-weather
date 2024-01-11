import { type ClassValue, clsx } from 'clsx';
import { sub } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTzISO = (date: Date, timezone: string) => {
  return formatInTimeZone(date, timezone, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx").replace(/\+/g, '%2B');
};

export const getToFromDates = (timezone: string, subOptions: Parameters<typeof sub>[1]) => {
  const date = new Date();
  const toDate = formatTzISO(date, timezone);
  const fromDate = formatTzISO(sub(date, subOptions), timezone);

  return { toDate, fromDate };
};
