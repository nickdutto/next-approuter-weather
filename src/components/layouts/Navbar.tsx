import { TextInput, Title } from '@mantine/core';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between rounded-m-lg bg-m-night-7 px-4 py-2">
      <Title order={1} size="h4">
        Weather
      </Title>
      <TextInput
        placeholder="Search"
        variant="filled"
        radius="lg"
        classNames={{ input: '!bg-m-night-4' }}
      />
    </nav>
  );
};

export default Navbar;
