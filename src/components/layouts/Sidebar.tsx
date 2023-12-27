'use client';

import { Button } from '@mantine/core';

import Link from 'next/link';

import { cn } from '~/lib/utils';

type Props = {
  className?: string;
};

const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'hidden max-h-[calc(100svh-32px)] w-[250px] rounded-m-lg bg-m-night-7 md:block',
        className,
      )}
    >
      <div className="flex flex-col">
        <Button component={Link} href="/" variant="subtle" color="gray">
          Weather
        </Button>
        <Button component={Link} href="/river" variant="subtle" color="gray">
          River
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
