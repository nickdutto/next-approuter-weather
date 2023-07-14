'use client';

import { cn } from '~/lib/utils';

interface Props {
  className?: string;
}

const Footer = ({ className }: Props) => {
  return (
    <footer className={cn('relative w-full bg-black p-4', className)}>
      <a href="https://www.tomorrow.io/weather-api" target="_blank">
        <img
          src="./tio/logo/tomorrowio-logo.svg"
          alt="Tomorrow.io Logo"
          className="absolute bottom-1 right-2 w-[200px]"
        />
      </a>
    </footer>
  );
};

export default Footer;
