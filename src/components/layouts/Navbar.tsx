'use client';

import { Button, Menu, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Link from 'next/link';
import { LuChevronDown } from 'react-icons/lu';

const Navbar = () => {
  const [opened, handlers] = useDisclosure(false);

  return (
    <nav className="flex items-center justify-between rounded-m-lg bg-m-night-7 px-4 py-2">
      <div className="flex items-center gap-2">
        <Title order={1} size="h3" c="blue.7">
          NextWeather
        </Title>
        <Menu
          opened={opened}
          onOpen={handlers.open}
          onClose={handlers.close}
          trigger="click-hover"
          openDelay={100}
          closeDelay={400}
          offset={0}
          classNames={{
            dropdown: '!bg-m-night-5 !border-m-night-0 focus-visible:[&>div]:first:!outline-none',
            item: 'hover:!bg-m-night-0 active:!bg-m-night-2',
          }}
        >
          <Menu.Target>
            <Button
              fw={600}
              variant="subtle"
              color="gray.5"
              rightSection={
                <span
                  className={`flex h-full items-center justify-center transition-transform duration-200 ${
                    opened ? '-rotate-180' : ''
                  }`}
                >
                  <LuChevronDown size={16} className="text-m-gray-6" />
                </span>
              }
              classNames={{
                inner: '!gap-1',
                section: '!ml-0 h-full',
              }}
            >
              River
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Murrumbidgee River</Menu.Label>
            <Menu.Item component={Link} href="/river/mt-macdonald">
              Mt. MacDonald
            </Menu.Item>
            <Menu.Item component={Link} href="/river/angle-crossing">
              Angle Crossing
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
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
