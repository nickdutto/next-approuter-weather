import { TextInput, Title } from '@mantine/core';

import NavbarRiverMenu from '~/components/layouts/NavbarRiverMenu';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between rounded-m-lg bg-m-night-7 px-4 py-2">
      <div className="flex items-center gap-2">
        <Title order={1} c="blue.7" className="text-m-md sm:text-m-xl">
          NextWeather
        </Title>
        <NavbarRiverMenu />
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
