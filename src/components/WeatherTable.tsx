import { parseISO } from 'date-fns';

import {
  Table,
  TableBody,
  TableCaption,
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
      <TableCaption>Weather</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Temperature</TableHead>
          <TableHead>Humidity</TableHead>
          <TableHead>Pressure</TableHead>
          <TableHead>Wind Speed</TableHead>
          <TableHead>Wind Gust</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {weather.data.timelines[0].intervals.map((interval) => (
          <TableRow key={interval.startTime} className="p-2">
            <TableCell>{parseISO(interval.startTime).toLocaleDateString()}</TableCell>
            <TableCell>{parseISO(interval.startTime).toLocaleTimeString()}</TableCell>
            <TableCell>
              <img
                src={`./tio/${getWeatherIcon(
                  interval.startTime,
                  sunriseSunset.results.sunrise,
                  sunriseSunset.results.sunset,
                  interval.values.weatherCode,
                )}`}
                alt=""
              />
            </TableCell>
            <TableCell>{interval.values.temperature}</TableCell>
            <TableCell>{interval.values.humidity}</TableCell>
            <TableCell>{interval.values.pressureSeaLevel}</TableCell>
            <TableCell>{interval.values.windSpeed}</TableCell>
            <TableCell>{interval.values.windGust}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WeatherTable;
