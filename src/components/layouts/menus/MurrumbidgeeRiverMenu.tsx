'use client';

import { Button, Menu } from '@mantine/core';

import Link from 'next/link';
import { forwardRef } from 'react';
import { LuChevronRight } from 'react-icons/lu';

import { murrumbidgee_stations } from '~/data/waterdata-stations';

const MurrumbidgeeRiverMenu = forwardRef<HTMLButtonElement, { close: () => void }>(
  ({ close }, ref) => {
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
            c="gray.5"
            rightSection={<LuChevronRight className="h-3 w-3 text-m-gray-6 sm:h-4 sm:w-4" />}
            classNames={{
              root: 'text-m-xs sm:text-m-sm w-full hover:!bg-m-night-0 data-[expanded=true]:!bg-m-night-0 active:!transform-none',
              inner: '!gap-1 justify-between',
              label: 'text-m-xs sm:text-m-sm',
              section: '!ml-0 h-full',
            }}
          >
            Murrumbidgee River
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Murrumbidgee River</Menu.Label>
          <Menu.Divider className="border-t-m-dark-4" />
          {murrumbidgee_stations.map((station) => (
            <Menu.Item
              key={station.id}
              component={Link}
              href={station.href}
              onClick={close}
              className="text-m-xs sm:text-m-sm"
            >
              {station.name}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    );
  },
);
MurrumbidgeeRiverMenu.displayName = 'MurrumbidgeeRiverMenu';

export default MurrumbidgeeRiverMenu;
