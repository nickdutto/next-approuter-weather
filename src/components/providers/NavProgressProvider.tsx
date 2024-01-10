'use client';

import { Next13ProgressBar } from 'next13-progressbar';

const NavProgressProvider = () => {
  return (
    <Next13ProgressBar
      height="4px"
      color="#1c7ed6"
      options={{ showSpinner: false }}
      showOnShallow
    />
  );
};

export default NavProgressProvider;
