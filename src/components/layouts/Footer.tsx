'use client';

import { cn } from '~/lib/utils';

interface Props {
  className?: string;
}

const Footer = ({ className }: Props) => {
  return (
    <footer
      className={cn('flex w-full items-center justify-end bg-black px-4 py-[12px]', className)}
    >
      <a href="https://www.tomorrow.io/weather-api" target="_blank">
        <img src="./tio/logo/tomorrowio-logo.svg" alt="Tomorrow.io Logo" className="w-[200px]" />
      </a>
    </footer>
  );
};

export default Footer;
