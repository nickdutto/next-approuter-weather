import { Paper, Text } from '@mantine/core';

import { WiBarometer, WiHumidity, WiRaindrop } from 'react-icons/wi';

import { type WeatherInterval } from '~/types/types';

type Props = {
  data: WeatherInterval;
};

const CurrentWeatherDetailCard = ({ data }: Props) => {
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
          root: 'w-1/3 bg-m-night-7 p-2 flex flex-col justify-center items-center gap-2',
        }}
      >
        <Text size="sm" c="gray.3" className="flex items-center gap-1 font-medium">
          <WiHumidity size={16} />
          Humidity
        </Text>
        <Text size="sm" className="font-medium">
          {data.values.humidity.toFixed(0)}%
        </Text>
      </Paper>
      <Paper
        radius="lg"
        classNames={{
          root: 'w-1/3 bg-m-night-7 p-2 flex flex-col justify-center items-center gap-2',
        }}
      >
        <Text size="sm" c="gray.3" className="flex items-center gap-1 font-medium">
          <WiBarometer size={16} />
          Pressure
        </Text>
        <span className="flex items-baseline">
          <Text size="sm" c="gray.5" className="font-medium">
            {data.values.pressureSeaLevel}
          </Text>
          <Text size="xs" c="gray.6" className="font-medium">
            hPa
          </Text>
        </span>
      </Paper>
      <Paper
        radius="lg"
        classNames={{
          root: 'w-1/3 bg-m-night-7 p-2 flex flex-col justify-center items-center gap-2',
        }}
      >
        <Text size="sm" c="gray.3" className="flex items-center gap-1 font-medium">
          <WiRaindrop size={16} />
          Dew Point
        </Text>
        <span className="flex items-start">
          <Text size="sm" c="gray.5" className="font-medium">
            {data.values.dewPoint.toFixed(1)}
          </Text>
          <Text size="xs" c="gray.6" className="font-medium">
            °C
          </Text>
        </span>
      </Paper>
    </Paper>
  );
};

export default CurrentWeatherDetailCard;
