'use client';

const Footer = () => {
  return (
    <footer className="relative w-full bg-black p-4">
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
