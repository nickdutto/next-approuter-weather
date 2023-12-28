'use client';

import { Button, Menu } from '@mantine/core';

import Link from 'next/link';
import { forwardRef } from 'react';
import { LuChevronRight } from 'react-icons/lu';

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
            color="gray.5"
            rightSection={<LuChevronRight className="h-3 w-3 text-m-gray-6 sm:h-4 sm:w-4" />}
            classNames={{
              root: 'text-m-xs sm:text-m-sm w-full ',
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
          <Menu.Item
            component={Link}
            onClick={close}
            href="/river/murrumbidgee-river/tantangara-reservoir"
            className="text-m-xs sm:text-m-sm"
          >
            Tantangara Reservoir
          </Menu.Item>
          <Menu.Item
            component={Link}
            onClick={close}
            href="/river/murrumbidgee-river/yaouk-no2"
            className="text-m-xs sm:text-m-sm"
          >
            Yaouk No.2
          </Menu.Item>
          <Menu.Item
            component={Link}
            onClick={close}
            href="/river/murrumbidgee-river/mittagang-crossing"
            className="text-m-xs sm:text-m-sm"
          >
            Mittagang Crossing
          </Menu.Item>
          <Menu.Item
            component={Link}
            onClick={close}
            href="/river/murrumbidgee-river/billilingra"
            className="text-m-xs sm:text-m-sm"
          >
            Billilingra
          </Menu.Item>
          <Menu.Item
            component={Link}
            onClick={close}
            href="/river/murrumbidgee-river/michelago-creek"
            className="text-m-xs sm:text-m-sm"
          >
            Michelago Creek
          </Menu.Item>
          <Menu.Item
            component={Link}
            onClick={close}
            href="/river/murrumbidgee-river/angle-crossing"
            className="text-m-xs sm:text-m-sm"
          >
            Angle Crossing
          </Menu.Item>
          <Menu.Item
            component={Link}
            onClick={close}
            href="/river/murrumbidgee-river/lobbs-hole-creek"
            className="text-m-xs sm:text-m-sm"
          >
            Lobbs Hole Creek
          </Menu.Item>
          <Menu.Item
            component={Link}
            onClick={close}
            href="/river/murrumbidgee-river/mt-macdonald"
            className="text-m-xs sm:text-m-sm"
          >
            Mt. MacDonald
          </Menu.Item>
          <Menu.Item
            component={Link}
            onClick={close}
            href="/river/murrumbidgee-river/halls-crossing"
            className="text-m-xs sm:text-m-sm"
          >
            Hall&apos;s Crossing
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  },
);
MurrumbidgeeRiverMenu.displayName = 'MurrumbidgeeRiverMenu';

export default MurrumbidgeeRiverMenu;
