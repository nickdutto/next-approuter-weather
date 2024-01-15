'use client';

import { Button, Menu } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import Link from 'next/link';
import { LuChevronDown } from 'react-icons/lu';

const NavbarMapMenu = () => {
  const [opened, handlers] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Menu
      opened={opened}
      onOpen={handlers.open}
      onClose={handlers.close}
      trigger="click-hover"
      loop={false}
      withinPortal={false}
      trapFocus={false}
      menuItemTabIndex={0}
      openDelay={100}
      closeDelay={400}
      offset={0}
      position={isMobile ? 'bottom-end' : 'bottom'}
      classNames={{
        dropdown:
          '!bg-m-night-5 !border-m-night-0 focus-visible:[&>div]:first:!outline-none max-w-[170px] sm:max-w-[200px]',
        item: 'hover:!bg-m-night-0 active:!bg-m-night-2',
      }}
    >
      <Menu.Target>
        <Button
          fw={600}
          variant="subtle"
          c="gray.5"
          rightSection={
            <span
              className={`flex h-full items-center justify-center transition-transform duration-200 ${
                opened ? '-rotate-180' : ''
              }`}
            >
              <LuChevronDown className="h-3 w-3 text-m-gray-6 sm:h-4 sm:w-4" />
            </span>
          }
          classNames={{
            root: 'text-m-xs sm:text-m-sm  hover:!bg-m-night-7 data-[expanded=true]:!bg-m-night-7',
            inner: '!gap-1',
            section: '!ml-0 h-full',
          }}
        >
          Maps
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={Link} href="/map" className="text-m-xs sm:text-m-sm">
          WaterData Map
        </Menu.Item>
        <Menu.Item component={Link} href="/windy" className="text-m-xs sm:text-m-sm">
          Windy Map
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NavbarMapMenu;
