import { Button, Title } from '@mantine/core';

import Link from 'next/link';

import NavbarRiverMenu from '~/components/layouts/NavbarRiverMenu';

const Navbar = () => {
  return (
    <div className="fixed top-0 z-50 w-full pr-8 pt-4">
      <nav className="flex w-full items-center justify-between rounded-m-lg bg-m-night-5 px-4 py-2 shadow-md shadow-m-night-10">
        <div className="flex items-center gap-2">
          <Title order={1} c="blue.7" className="text-m-sm sm:text-m-lg">
            <Link href="/">NextWeather</Link>
          </Title>
          <div className="flex">
            <NavbarRiverMenu />
            <Button
              component={Link}
              href="/map"
              fw={600}
              variant="transparent"
              color="gray.5"
              classNames={{
                root: 'text-m-xs sm:text-m-sm active:!bg-m-night-7',
              }}
            >
              Map
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
