'use client';

import { Button, Menu } from '@mantine/core';

import Link from 'next/link';
import { forwardRef } from 'react';
import { LuChevronRight } from 'react-icons/lu';

const CotterRiverMenu = forwardRef<HTMLButtonElement, { close: () => void }>(({ close }, ref) => {
  return (
    <Menu
      trigger="click-hover"
      loop={false}
      withinPortal={false}
      trapFocus={false}
      menuItemTabIndex={0}
      openDelay={100}
      closeDelay={100}
      offset={4}
      position="right-start"
      classNames={{
        dropdown: '!bg-m-night-5 !border-m-night-0 focus-visible:[&>div]:first:!outline-none',
        item: 'hover:!bg-m-night-0 active:!bg-m-night-2',
      }}
    >
      <Menu.Target>
        <Button
          ref={ref}
          fw={500}
          size="xs"
          variant="subtle"
          color="gray.5"
          rightSection={<LuChevronRight className="h-3 w-3 text-m-gray-6 sm:h-4 sm:w-4" />}
          classNames={{
            root: 'text-m-xs sm:text-m-sm w-full ',
            inner: '!gap-1 justify-between',
            label: 'text-m-xs sm:text-m-sm',
            section: '!ml-0 h-full',
          }}
        >
          Cotter River
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Cotter River</Menu.Label>
        <Menu.Divider className="border-t-m-dark-4" />
        <Menu.Item
          component={Link}
          onClick={close}
          href="/river/cotter-river/gingera"
          className="text-m-xs sm:text-m-sm"
        >
          Gingera
        </Menu.Item>
        <Menu.Item
          component={Link}
          onClick={close}
          href="/river/cotter-river/corin-dam"
          className="text-m-xs sm:text-m-sm"
        >
          Corin Dam
        </Menu.Item>
        <Menu.Item
          component={Link}
          onClick={close}
          href="/river/cotter-river/bendora-dam"
          className="text-m-xs sm:text-m-sm"
        >
          Bendora Dam
        </Menu.Item>
        <Menu.Item
          component={Link}
          onClick={close}
          href="/river/cotter-river/vanitys-crossing"
          className="text-m-xs sm:text-m-sm"
        >
          Vanity&apos;s Crossing
        </Menu.Item>
        <Menu.Item
          component={Link}
          onClick={close}
          href="/river/cotter-river/cotter-kiosk"
          className="text-m-xs sm:text-m-sm"
        >
          Cotter Kiosk
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
});
CotterRiverMenu.displayName = 'CotterRiverMenu';

export default CotterRiverMenu;
