'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu';
import { cn } from '~/lib/utils';

interface Props {
  className?: string;
}

const Navbar = ({ className }: Props) => {
  const path = usePathname();

  return (
    <div className={cn('relative flex items-center justify-center p-2', className)}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  path === '/' && 'dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:bg-blue-500',
                )}
              >
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/river" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  path === '/river' &&
                    'dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:bg-blue-500',
                )}
              >
                River
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/charts" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  path === '/charts' &&
                    'dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:bg-blue-500',
                )}
              >
                Charts
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/hourly" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  path === '/hourly' &&
                    'dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:bg-blue-500',
                )}
              >
                Hourly
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
