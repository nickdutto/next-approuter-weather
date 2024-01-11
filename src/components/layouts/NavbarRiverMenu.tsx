'use client';

import { Button, Menu } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import { LuChevronDown } from 'react-icons/lu';

import CondorCreekMenu from '~/components/layouts/menus/CondorCreekMenu';
import CotterRiverMenu from '~/components/layouts/menus/CotterRiverMenu';
import GudgenbyRiverMenu from '~/components/layouts/menus/GudgenbyRiverMenu';
import MolongloRiverMenu from '~/components/layouts/menus/MolongloRiverMenu';
import MurrumbidgeeRiverMenu from '~/components/layouts/menus/MurrumbidgeeRiverMenu';
import OrroralRiverMenu from '~/components/layouts/menus/OrroralRiverMenu';

const NavbarRiverMenu = () => {
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
          color="gray.5"
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
            root: 'text-m-xs sm:text-m-sm',
            inner: '!gap-1',
            section: '!ml-0 h-full',
          }}
        >
          WaterData
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item renderRoot={() => <MurrumbidgeeRiverMenu close={handlers.close} />}></Menu.Item>
        <Menu.Item renderRoot={() => <MolongloRiverMenu close={handlers.close} />}></Menu.Item>
        <Menu.Item renderRoot={() => <CotterRiverMenu close={handlers.close} />}></Menu.Item>
        <Menu.Item renderRoot={() => <CondorCreekMenu close={handlers.close} />}></Menu.Item>
        <Menu.Item renderRoot={() => <GudgenbyRiverMenu close={handlers.close} />}></Menu.Item>
        <Menu.Item renderRoot={() => <OrroralRiverMenu close={handlers.close} />}></Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NavbarRiverMenu;
