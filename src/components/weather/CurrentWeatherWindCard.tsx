import { Paper, Text } from '@mantine/core';

import { WiStrongWind, WiWindDeg, WiWindy } from 'react-icons/wi';

import { type WeatherInterval } from '~/types/types';

type Props = {
  data: WeatherInterval;
};

const CurrentWeatherWindCard = ({ data }: Props) => {
  return (
    <Paper
      radius="lg"
      classNames={{
        root: 'bg-transparent h-full flex justify-evenly gap-2',
      }}
    >
      <Paper
        radius="lg"
        classNames={{
          root: 'w-1/3 bg-m-night-7 p-2 flex justify-center flex-col items-center gap-2',
        }}
      >
        <Text size="xs" c="gray.3" className="flex items-center gap-1 font-medium">
          <WiWindy size={16} />
          Wind Speed
        </Text>
        <span className="flex items-baseline">
          <Text size="xs" c="gray.5" className="font-medium">
            {data.values.windSpeed.toFixed(1)}
          </Text>
          <Text size="xs" c="gray.6" className="font-medium">
            km/h
          </Text>
        </span>
      </Paper>
      <Paper
        radius="lg"
        classNames={{
          root: 'w-1/3 bg-m-night-7 p-2 flex justify-center flex-col items-center gap-2',
        }}
      >
        <Text size="xs" c="gray.3" className="flex items-center gap-1 font-medium">
          <WiStrongWind size={16} />
          Wind Gust
        </Text>
        <span className="flex items-baseline">
          <Text size="xs" c="gray.5" className="font-medium">
            {data.values.windGust.toFixed(1)}
          </Text>
          <Text size="xs" c="gray.6" className="font-medium">
            km/h
          </Text>
        </span>
      </Paper>
      <Paper
        radius="lg"
        classNames={{
          root: 'w-1/3 bg-m-night-7 p-2 flex justify-center flex-col items-center gap-2',
        }}
      >
        <Text size="xs" c="gray.3" className="flex items-center gap-1 font-medium">
          <WiWindDeg size={16} style={{ transform: `rotate(${data.values.windDirection}deg)` }} />
          Wind Direction
        </Text>
        <span className="flex items-start">
          <Text size="xs" c="gray.5" className="font-medium">
            {data.values.windDirection}
          </Text>
          <Text size="xs" c="gray.6" className="font-medium">
            °
          </Text>
        </span>
      </Paper>
    </Paper>
  );
};

export default CurrentWeatherWindCard;
