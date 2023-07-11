import { format, parseISO } from 'date-fns';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { type SunriseSunset, type Weather } from '~/types/types';
import { getWeatherIcon } from '~/utils/weather-utils';

type Props = {
  weather: Weather;
  sunriseSunset: SunriseSunset;
};

const WeatherTable = ({ weather, sunriseSunset }: Props) => {
  return (
    <Table className="rounded-md bg-zinc-900">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Time</TableHead>
          <TableHead className="text-center">Type</TableHead>
          <TableHead className="text-center">Temperature (°C)</TableHead>
          <TableHead className="text-center">Humidity (%)</TableHead>
          <TableHead className="text-center">Pressure (hPa)</TableHead>
          <TableHead className="text-center">Wind Speed (km/h)</TableHead>
          <TableHead className="text-center">Wind Gust (km/h)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {weather.data.timelines[0].intervals.map((interval) => (
          <TableRow key={interval.startTime} className="p-2">
            <TableCell className="text-center">
              {format(parseISO(interval.startTime), 'E - dd/MM/yy')}
            </TableCell>
            <TableCell className="text-center">
              {format(parseISO(interval.startTime), 'HH:mm')}
            </TableCell>
            <TableCell className="flex justify-center">
              <img
                src={`./tio/${getWeatherIcon(
                  interval.startTime,
                  sunriseSunset.results.sunrise,
                  sunriseSunset.results.sunset,
                  interval.values.weatherCode,
                )}`}
                alt=""
                className="w-[32px]"
              />
            </TableCell>
            <TableCell className="text-center">{interval.values.temperature.toFixed(1)}</TableCell>
            <TableCell className="text-center">{interval.values.humidity.toFixed(1)}</TableCell>
            <TableCell className="text-center">
              {interval.values.pressureSeaLevel.toFixed(1)}
            </TableCell>
            <TableCell className="text-center">{interval.values.windSpeed.toFixed(1)}</TableCell>
            <TableCell className="text-center">{interval.values.windGust.toFixed(1)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WeatherTable;
