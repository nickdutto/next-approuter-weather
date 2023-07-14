'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsBarChartFill, BsClockFill, BsTable, BsWater } from 'react-icons/bs';

import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

interface Props {
  className?: string;
}

const Sidebar = ({ className }: Props) => {
  const path = usePathname();

  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="fixed w-[250px] px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Weather</h2>
          <div className="flex flex-col gap-2">
            <Link href="/">
              <Button
                className={cn(
                  'w-full justify-start dark:bg-black dark:text-white dark:hover:bg-zinc-800',
                  path === '/' && 'dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:bg-blue-500',
                )}
              >
                <BsClockFill size={24} className="mr-2 h-4 w-4" />
                Current
              </Button>
            </Link>
            <Link href="/river">
              <Button
                className={cn(
                  'w-full justify-start dark:bg-black dark:text-white dark:hover:bg-zinc-800',
                  path === '/river' &&
                    'dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:bg-blue-500',
                )}
              >
                <BsWater size={24} className="mr-2 h-4 w-4" />
                River
              </Button>
            </Link>
            <Link href="/charts">
              <Button
                className={cn(
                  'w-full justify-start dark:bg-black dark:text-white dark:hover:bg-zinc-800',
                  path === '/charts' &&
                    'dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:bg-blue-500',
                )}
              >
                <BsBarChartFill size={24} className="mr-2 h-4 w-4" />
                Charts
              </Button>
            </Link>
            <Link href="/hourly">
              <Button
                className={cn(
                  'w-full justify-start dark:bg-black dark:text-white dark:hover:bg-zinc-800',
                  path === '/hourly' &&
                    'dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:bg-blue-500',
                )}
              >
                <BsTable size={24} className="mr-2 h-4 w-4" />
                Hourly
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
