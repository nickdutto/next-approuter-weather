import { Button, TextInput, Title } from '@mantine/core';

import Link from 'next/link';

import NavbarRiverMenu from '~/components/layouts/NavbarRiverMenu';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between rounded-m-lg bg-m-night-7 px-4 py-2">
      <div className="flex items-center gap-1 sm:gap-2">
        <Title order={1} c="blue.7" className="text-m-sm sm:text-m-lg">
          NextWeather
        </Title>
        <div className="flex">
          <NavbarRiverMenu />
          <Button
            component={Link}
            href="/map"
            fw={600}
            variant="subtle"
            color="gray.5"
            classNames={{
              root: 'text-m-xs sm:text-m-sm',
            }}
          >
            Map
          </Button>
          <Button
            component={Link}
            href="/"
            fw={600}
            variant="subtle"
            color="gray.5"
            classNames={{
              root: 'text-m-xs sm:text-m-sm',
            }}
          >
            Weather
          </Button>
        </div>
      </div>
      <TextInput
        placeholder="Search"
        variant="filled"
        radius="lg"
        classNames={{ root: 'hidden sm:block', input: '!bg-m-night-4' }}
      />
    </nav>
  );
};

export default Navbar;
